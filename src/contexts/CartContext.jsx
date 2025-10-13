import React, { createContext, useState, useEffect, useContext } from 'react';
import { postCart } from '../api/api';
import { useAuth } from './AuthContext';

export const CartContext = createContext();

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart debe ser usado dentro de CartProvider');
  }
  return context;
};

export function CartProvider({ children }) {
  const { user, isAuthenticated } = useAuth();
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem('cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  // Guardar carrito en localStorage cada vez que cambie
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  // Agregar producto al carrito
  const addItem = (product, quantity = 1) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.product.id === product.id);
      
      if (existingItem) {
        // Si ya existe, aumentar cantidad
        return prevCart.map(item =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        // Si no existe, agregarlo
        return [...prevCart, { product, quantity }];
      }
    });
  };

  // Remover producto del carrito
  const removeItem = (productId) => {
    setCart(prevCart => prevCart.filter(item => item.product.id !== productId));
  };

  // Actualizar cantidad de un producto
  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity <= 0) {
      removeItem(productId);
      return;
    }
    
    setCart(prevCart =>
      prevCart.map(item =>
        item.product.id === productId
          ? { ...item, quantity: newQuantity }
          : item
      )
    );
  };

  // Limpiar carrito
  const clearCart = () => {
    setCart([]);
    localStorage.removeItem('cart');
  };

  // Obtener cantidad total de items
  const getTotalItems = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  // Obtener precio total
  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + (item.product.price * item.quantity), 0);
  };

  // Sincronizar carrito con la API al hacer checkout
  const syncCartWithAPI = async () => {
    if (!isAuthenticated || cart.length === 0) {
      return { success: false, error: 'Usuario no autenticado o carrito vacío' };
    }

    try {
      // Formatear carrito para la API
      const cartPayload = {
        userId: user.id,
        date: new Date().toISOString(),
        products: cart.map(item => ({
          productId: item.product.id,
          quantity: item.quantity
        }))
      };

      const response = await postCart(cartPayload);
      
      return { success: true, data: response };
    } catch (error) {
      console.error('Error al sincronizar carrito:', error);
      return { success: false, error: error.message };
    }
  };

  const value = {
    cart,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
    getTotalItems,
    getTotalPrice,
    syncCartWithAPI
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
}