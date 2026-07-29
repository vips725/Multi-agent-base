
import api from "../../utils/axios"

const getCurrentUser=async () => {

    try {
        const {data}=await api.get("/api/me")
        return data
    } catch (error) {
        if (error?.response?.status >= 500) {
            console.log(error)
        }
        return null
    }
}

export default getCurrentUser