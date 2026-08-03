import api from "../../utils/axios"
//RU3DGBXX3K33MV3YRD3THYA8
export const createOrder = async (plan) => {
    try {
        const { data } = await api.post("/api/billing/create", { plan })
        console.log("Create order response:", data)
        return data
    } catch (error) {
        const status = error.response?.status
        const data = error.response?.data
        console.log("Create order failed. Status:", status, "Data:", JSON.stringify(data || error.message))
        throw error
    }
}
