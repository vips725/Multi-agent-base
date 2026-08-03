import axios from "axios"
import { PLANS } from "../config/Plans.js"
import razorpay from "../config/razorpay.js"
import Payment from "../models/payment.model.js"
import crypto from "crypto"

export const createOrder = async (req, res) => {
    try {
        const { plan } = req.body
        const userId = req.headers["x-user-id"]
        console.log("createOrder called. plan:", plan, "userId:", userId)

        if (!plan) {
            return res.status(400).json({ message: "plan is required" })
        }
        if (!userId) {
            return res.status(400).json({ message: "x-user-id header is required" })
        }

        const selectedPlan = PLANS[plan]
        if (!selectedPlan) {
            return res.status(404).json({ message: "plan not found" })
        }

        console.log("Calling Razorpay orders.create with amount:", selectedPlan.amount * 100)
        let order
        try {
            order = await razorpay.orders.create({
                amount: selectedPlan.amount * 100,
                currency: "INR",
                receipt: `receipt-${Date.now()}`
            })
        } catch (rzpErr) {
            console.error("Razorpay orders.create failed:", rzpErr)
            return res.status(500).json({
                message: "razorpay order creation failed",
                error: rzpErr?.error?.description || rzpErr?.message || String(rzpErr),
                code: rzpErr?.error?.code || rzpErr?.statusCode
            })
        }
        console.log("Razorpay order created:", order.id)

        try {
            await Payment.create({
                userId,
                orderId: order.id,
                amount: selectedPlan.amount,
                credits: selectedPlan.credits,
                plan: selectedPlan.id,
                currency: order.currency,
                status: "created"
            })
        } catch (dbErr) {
            console.error("Payment.create failed:", dbErr)
            return res.status(500).json({
                message: "payment record failed",
                error: dbErr?.message || String(dbErr)
            })
        }

        return res.status(200).json({ order, plan: selectedPlan })

    } catch (error) {
        console.error("Create order unexpected error:", error)
        return res.status(500).json({
            message: "create order error",
            error: error?.message || String(error),
            code: error?.code
        })
    }
}


export const verifyPayment = async (req, res) => {
    try {
        const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body

        const keySecret = process.env.RAZORPAY_KEY_SECRET?.trim()
        const generateSignature = crypto
            .createHmac("sha256", keySecret)
            .update(`${razorpay_order_id}|${razorpay_payment_id}`)
            .digest("hex")

        if (generateSignature !== razorpay_signature) {
            return res.status(400).json({ message: "Payment Verification Failed" })
        }

        const payment = await Payment.findOne({ orderId: razorpay_order_id })

        if (!payment) {
            return res.status(404).json({ message: "Payment Not Found" })
        }

        payment.status = "paid"
        payment.paymentId = razorpay_payment_id
        await payment.save()

        const { data } = await axios.post(`${process.env.AUTH_SERVICE}/update-plan`, {
            userId: payment.userId,
            plan: payment.plan,
            credits: payment.credits
        })
        console.log("Auth service update response:", data)

        return res.status(200).json({ message: "Payment Verified" })

    } catch (error) {
        console.error("Verify payment error:", error)
        return res.status(500).json({
            message: "verify payment error",
            error: error?.message || String(error),
            code: error?.code
        })
    }
}
