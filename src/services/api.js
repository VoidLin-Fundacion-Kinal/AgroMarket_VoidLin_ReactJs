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
        const response = await apiClient.get('/product/listProducts')
        return response.data
    } catch (error){
        console.error("Error fetching products:", error);
        throw error;
    }
}

export const getPostsRequest = async () => {
  try {
    const response = await apiClient.get('/post/listPost');
    console.log("Respuesta completa desde Axios:", response);
    console.log("Data:", response.data);

    return response.data; // Esto debería ser el objeto con { success, message, post }
  } catch (error) {
    console.error("Error fetching posts:", error);
    throw error;
  }
}

export const updateUser = async (formData) => {
  const token = localStorage.getItem("token");
  const response = await apiClient.put('/user/updateUser', formData, {
    headers: {
      Authorization: token, // ✅ sin 'Bearer'
    }
  });
  return response.data;
};


export const updatePassword = async (formData) => {
  const token = localStorage.getItem("token");
  const response = await apiClient.put('/user/updatePassword', formData, {
    headers: {
      Authorization: token, // ✅ sin 'Bearer'
    }
  });
  return response.data;
};



export const getUserRequest = async () => {
  try {
    const response = await apiClient.get("/user/listUserById");
    console.log("Respuesta completa desde Axios:", response);
    console.log("Data:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching user data:", error);
    throw error;
  }
};

export const updateUserLogo = async (formData) => {
  const token = localStorage.getItem("token");
  const response = await apiClient.put("user/updateProfilePhone", formData, {
    headers: {
      Authorization: token,
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};




export const fetchUserPosts = async () => {
  
  const response = await apiClient.get('/Post/listPostsUser/');
  return response.data.posts;
};

export const getUserCart = async () => {
   const response = await apiClient.get('/cart/listCartUserById');
  return response.data;
};

export const getBillsByUser = async () => {
  const response = await apiClient.get('/bill/getBillsByUserId');
  return response.data;
};


export const createPost = async (formData) => {
  const response = await apiClient.post('/post/addPost', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};

