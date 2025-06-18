import axios from "axios";

const apiClient = axios.create(
    {
        baseURL: 'http://localhost:2003/v1',
        timeout: 2000
    }
)

apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("token"); // o donde guardes tu token
  if (token) {
    config.headers.Authorization = token; // así lo espera tu backend
  }
  return config;
});


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
        const response = await apiClient.get('/product/listProductActive')
        return response.data
    } catch (error){
        console.error("Error fetching products:", error);
        throw error;
    }
}

export const getPostsRequest = async () => {
  try {
    const response = await apiClient.get('/post/listPostActive');
    console.log("Respuesta completa desde Axios:", response);
    console.log("Data:", response.data);

    return response.data; // Esto debería ser el objeto con { success, message, post }
  } catch (error) {
    console.error("Error fetching posts:", error);
    throw error;
  }
}

export const postCartProductRequest = async (productId, quantity) => {
  try {
    const token = localStorage.getItem('token');

    const response = await apiClient.post(
      '/cart/addCart',
      { productId, quantity },
      {
        headers: {
          Authorization: `${token}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error('Error al agregar producto al carrito:', error.response?.data || error.message);
    throw error;
  }
};


export const getUserCart = async () => {
  const response = await API.get('/cart/listCartUserById'); // Ruta que mapea a listCartUserById
  return response.data.cart;
}