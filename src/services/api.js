import axios from "axios";

const apiClient = axios.create(
    {
        baseURL: 'http://localhost:2003/v1',
        timeout: 2000
    }
)

export const loginRequest = async(userData) =>{
    try {
        const response = await apiClient.post('/auth/login', userData);
        return response.data;
    } catch (error) {
        console.error("Error during login request:", error);
        throw error;
    }
}

export const registerRequest = async (user) => {
    try {
        return await apiClient.post('/auth/register', user)
    } catch (error) {
        console.error("Error during registration request:", error);
        throw error;
    }
}

export const getProductsRequest = async () => {
    try {
        const response = await apiClient.get('/product/listProducts')
        return response.data
    } catch (error){
        console.error("Error fetching products:", error);
        throw error;
    }
}

export const getPostsRequest = async () => {
    try {
        const response = await apiClient.get('/post/listPost')
        console.log(response.data);
        
        return response.data
    } catch (error) {
        console.error("Error fetching posts:", error);
        throw error;
    }
}
