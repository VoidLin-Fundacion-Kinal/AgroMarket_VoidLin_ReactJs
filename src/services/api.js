import axios from "axios";

const apiClient = axios.create(
    {
        baseURL: 'http://localhost:2003',
        timeout: 2000
    }
)

export const loginRequest = async(userData) =>{
    try {
        const response = await apiClient.post('/login', userData);
        return response.data;
    } catch (error) {
        console.error("Error during login request:", error);
        throw error;
    }
}