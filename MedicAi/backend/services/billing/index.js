import express from "express"
import dotenv from "dotenv"
import connectDb from "./config/db.js"
import router from "./routes/billing.route.js"

dotenv.config()

const port = process.env.PORT

console.log("=== Billing service startup ===")
console.log("PORT:", port)
console.log("MONGODB_URI:", process.env.MONGODB_URI ? "set" : "MISSING")
console.log("RAZORPAY_KEY_ID:", process.env.RAZORPAY_KEY_ID?.trim() ? `set (${process.env.RAZORPAY_KEY_ID.trim().slice(0, 12)}...)` : "MISSING")
console.log("RAZORPAY_KEY_SECRET:", process.env.RAZORPAY_KEY_SECRET?.trim() ? "set" : "MISSING")
console.log("AUTH_SERVICE:", process.env.AUTH_SERVICE || "MISSING")
console.log("==============================")

const app = express()
app.use(express.json())
app.use("/", router)
app.get("/", (req, res) => {
    res.json({ message: "hello from billing" })
})

app.listen(port, () => {
    console.log(`billing started at ${port}`)
    connectDb()
})
