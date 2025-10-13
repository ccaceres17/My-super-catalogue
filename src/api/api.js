import axios from 'axios';

const api = axios.create({
  baseURL: 'https://fakestoreapi.com',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Interceptor para manejar errores globalmente
api.interceptors.response.use(
  response => response,
  error => {
    console.error('API Error:', error);
    return Promise.reject(error);
  }
);

// ===== PRODUCTOS =====
export const getProducts = async (limit = null) => {
  try {
    const url = limit ? `/products?limit=${limit}` : '/products';
    const response = await api.get(url);
    return response.data;
  } catch (error) {
    throw new Error('Error al obtener productos');
  }
};

export const getProduct = async (id) => {
  try {
    const response = await api.get(`/products/${id}`);
    return response.data;
  } catch (error) {
    throw new Error('Error al obtener el producto');
  }
};

export const getCategories = async () => {
  try {
    const response = await api.get('/products/categories');
    return response.data;
  } catch (error) {
    throw new Error('Error al obtener categorías');
  }
};

export const getByCategory = async (category) => {
  try {
    const response = await api.get(`/products/category/${category}`);
    return response.data;
  } catch (error) {
    throw new Error('Error al filtrar por categoría');
  }
};

// ===== AUTENTICACIÓN =====
export const login = async (credentials) => {
  try {
    const response = await api.post('/auth/login', credentials);
    return response.data;
  } catch (error) {
    throw new Error('Credenciales inválidas');
  }
};

// ===== USUARIOS =====
export const getUser = async (userId) => {
  try {
    const response = await api.get(`/users/${userId}`);
    return response.data;
  } catch (error) {
    throw new Error('Error al obtener usuario');
  }
};

export const registerUser = async (userData) => {
  try {
    const response = await api.post('/users', userData);
    return response.data;
  } catch (error) {
    throw new Error('Error al registrar usuario');
  }
};

// ===== CARRITOS =====
export const getUserCarts = async (userId) => {
  try {
    const response = await api.get(`/carts/user/${userId}`);
    return response.data;
  } catch (error) {
    throw new Error('Error al obtener carritos del usuario');
  }
};

export const postCart = async (cartData) => {
  try {
    const response = await api.post('/carts', cartData);
    return response.data;
  } catch (error) {
    throw new Error('Error al crear carrito');
  }
};

export const updateCart = async (cartId, cartData) => {
  try {
    const response = await api.put(`/carts/${cartId}`, cartData);
    return response.data;
  } catch (error) {
    throw new Error('Error al actualizar carrito');
  }
};

export const getAllCarts = async () => {
  try {
    const response = await api.get('/carts');
    return response.data;
  } catch (error) {
    throw new Error('Error al obtener todos los carritos');
  }
};

export default api;