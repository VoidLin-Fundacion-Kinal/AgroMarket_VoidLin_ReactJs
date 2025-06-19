import axios from "axios";
import Swal from "sweetalert2";

const apiClient = axios.create(
  {
    baseURL: 'http://localhost:2003/v1',
    timeout: 2000
  }
)

apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = token;
  }
  return config;
});


export const loginRequest = async (userData) => {
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
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
}

export const getPostsRequest = async () => {
  try {
    const response = await apiClient.get('/post/listPostActive');
    console.log("Respuesta completa desde Axios:", response);
    console.log("Data:", response.data);

    return response.data;
  } catch (error) {
    console.error("Error fetching posts:", error);
    throw error;
  }
}


export const postCartProductRequest = async (productId, quantity) => {
  try {
    const token = localStorage.getItem('token');

    if (!token) {
      await Swal.fire({
        title: "Sesión requerida",
        text: "Por favor, inicia sesión para agregar productos al carrito.",
        icon: "warning",
        cancelButtonText: "Iniciar sesión"
      });
      throw new Error("No autenticado: token no encontrado");
    }

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


export const getListCart = async () => {
  try {
    const response = await apiClient.get('/cart/listCartUserById');
    console.log('Carts:', response);

    return response.data.cart;
  } catch (error) {
    console.error('Error al obtener el carrito:', error);
    throw error;
  }
};

export const deleteProductFromCart = async (productId) => {
  try {
    const response = await apiClient.post(`/cart/deleteProductCart`, { productId }, {
      withCredentials: true,
    })
    return response.data
  } catch (error) {
    throw error.response?.data || { message: "Error inesperado al eliminar producto" }
  }
}


export const getBill = async () => {
  try {
    const response = await apiClient.get('/bill/addBill');
    console.log('Bill:', response);

    return response.data.bill;
  } catch (error) {
    console.error('Error al obtener el carrito:', error);
    throw error;
  }
};

export const getProductsAll = async () => {
  try {
    const response = await apiClient.get('/product/listProduct')
    console.log('Products:', response);

    return response.data.products
  } catch (error) {
    console.error('Error al obtener productos:', error)
    throw error;

  }
}

export const getProvidersAll = async () => {
  try {
    const response = await apiClient.get('/provider/listProvider')
    console.log('Providers:', response);

    return response.data.Provider

  } catch (error) {
    console.error('Error al obtener proveedores:', error);
    throw error
  }
}

export const getCategoryAll = async () => {
  try {
    const response = await apiClient.get('/category/listAllCategory')
    console.log('Categorys:', response);

    return response.data.category

  } catch (error) {
    console.error('Error al obtener Categorias:', error);
    throw error
  }
}

export const getUsersAll = async () => {
  try {
    const response = await apiClient.get('/user/getAllUser')
    console.log('Users:', response)

    return response.data.users
  } catch (error) {
    console.error('Error al obtener usuarios', error)
    throw error

  }
}

export const getInventoryAll = async () => {
  try {
    const response = await apiClient.get('/inventory/listInventoryMovement')
    console.log('Inventory:', response)

    return response.data.inventory
  } catch (error) {
    console.error('Error al obtener Inventarios', error)
    throw error
  }
}

export const getInvoicesAll = async () => {
  try {
    const response = await apiClient.get('/bill/getAllBills/')
    console.log('Invoices: ', response);

    return response.data.bills

  } catch (error) {
    console.error('Error al obtener facturas', error)
    throw error

  }
}

export const getCartAll = async () => {
  try {
    const response = await apiClient.get('/cart/listCart')
    console.log('Carts: ', response);

    return response.data.carts

  } catch (error) {
    console.error('Error al obtener Carritos', error)
    throw error

  }
}

export const getPostAll = async () => {
  try {
    const response = await apiClient.get('/post/listPost')
    console.log('Posts: ', response);

    return response.data.post

  } catch (error) {
    console.error('Error al obtener Posts', error)
    throw error

  }
}



export const softDeleteProduct = async (id) => {
  try {
    const response = await apiClient.put(`/product/softDeleteProduct/${id}`)

    
    return response.data
  } catch (error) {
    console.error('Error al eliminar producto:', error)
    throw error
  }
}

export const softDeleteProvider = async (id) => {
   try {
    const response = await apiClient.put(`/provider/softDeleteProvider/${id}`)

    return response.data
  } catch (error) {
    console.error('Error al eliminar proveedor:', error)
    throw error
  }
}

export const softDeleteCategory = async (id) => {
  try {
    const response = await apiClient.put(`/category/softDeleteCategory/${id}`)

    return response.data
  } catch (error) {
    console.error('Error al eliminar categoria:', error)
    throw error
  }
}

export const softDeleteUser = async (id) => {
  try {
    const response = await apiClient.put(`/user/softDeleteUserByAdmin/${id}`)

    return response.data
  } catch (error) {
    console.error('Error al eliminar Usuario:', error)
    throw error
  }
}
  

export const softDeletePost = async (id) => {
  try{
    const response = await apiClient.put(`/post/softDeletePost/${id}`)

    return response.data
  }catch(error){
    console.error('Error al eliminar un Post:', error);
    throw error
    
  }
}

export const createProduct = async (formData) => {
  try {
    const response = await apiClient.post("/product/addProduct", formData, {
      headers: {
        "Content-Type": "multipart/form-data"
      }
    })
    return response.data
  } catch (error) {
    console.error("Error al crear producto:", error)
    throw error
  }
}

export const createProvider = async (formData) => {
  try {
    const response = await apiClient.post("/provider/addProvider", formData, {
      headers: {
        "Content-Type": "multipart/form-data"
      }
    })
    return response.data
  } catch (error) {
    console.error("Error al crear proveedor:", error)
    throw error
  }
}

export const createCategory = async (formData) => {
  try {
    const response = await apiClient.post("/category/addCategory", formData)
    return response.data
  } catch (error) {
    console.error("Error al crear proveedor:", error)
    throw error
  }
}





