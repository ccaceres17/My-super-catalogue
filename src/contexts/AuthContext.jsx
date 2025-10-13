import React, { createContext, useState, useEffect, useContext } from 'react';
import { login as apiLogin, getUser, registerUser } from '../api/api';

export const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth debe ser usado dentro de AuthProvider');
  }
  return context;
};

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  // Cargar datos de autenticación desde localStorage al iniciar
  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    const storedUser = localStorage.getItem('user');
    
    if (storedToken && storedUser) {
      setToken(storedToken);
      setUser(JSON.parse(storedUser));
      setIsAuthenticated(true);
    }
    setLoading(false);
  }, []);

  const login = async (username, password) => {
    try {
      // La API de fakestoreapi usa estos usuarios de prueba:
      // username: "mor_2314", password: "83r5^_"
      const response = await apiLogin({ username, password });
      
      setToken(response.token);
      setIsAuthenticated(true);
      
      // Guardar en localStorage
      localStorage.setItem('token', response.token);
      
      // Simular obtener datos del usuario (la API fake no devuelve datos completos)
      // En una app real, harías GET /users/me con el token
      const userData = {
        id: 1, // ID simulado
        username: username,
        email: `${username}@example.com`,
        name: { firstname: 'Usuario', lastname: 'Demo' }
      };
      
      setUser(userData);
      localStorage.setItem('user', JSON.stringify(userData));
      
      return { success: true, user: userData };
    } catch (error) {
      console.error('Error en login:', error);
      return { success: false, error: error.message };
    }
  };

  const register = async (userData) => {
    try {
      // POST /users en la API fake devuelve el ID del usuario creado
      const response = await registerUser(userData);
      
      // Después del registro, hacer login automático
      const loginResult = await login(userData.username, userData.password);
      
      return loginResult;
    } catch (error) {
      console.error('Error en registro:', error);
      return { success: false, error: error.message };
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    setIsAuthenticated(false);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    // Opcional: también limpiar el carrito
    // localStorage.removeItem('cart');
  };

  const value = {
    user,
    token,
    isAuthenticated,
    loading,
    login,
    register,
    logout
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}