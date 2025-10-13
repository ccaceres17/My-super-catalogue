import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import { useAuth } from '../contexts/AuthContext';
import CartItem from '../components/CartItem';

function Cart() {
  const { cart, getTotalItems, getTotalPrice, clearCart } = useCart();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleClearCart = () => {
    if (window.confirm('¿Estás seguro de que deseas vaciar el carrito?')) {
      clearCart();
    }
  };

  const handleCheckout = () => {
    if (!isAuthenticated) {
      if (window.confirm('Necesitas iniciar sesión para continuar. ¿Deseas ir al login?')) {
        navigate('/login');
      }
    } else {
      navigate('/checkout');
    }
  };

  // 🛍️ Carrito vacío
  if (cart.length === 0) {
    return (
      <div className="container my-5">
        <div className="text-center py-5">
          <div className="mb-4" style={{ fontSize: '5rem' }}>
            🛒
          </div>
          <h2 className="mb-3 fw-bold">Tu carrito está vacío</h2>
          <p className="text-muted mb-4">
            ¡Empieza a agregar productos y descubre las mejores ofertas!
          </p>
          <Link to="/catalog" className="btn btn-primary btn-lg">
            Explorar Productos
          </Link>
        </div>
      </div>
    );
  }

  // 🧾 Carrito con productos
  return (
    <div className="container my-5">
      <h2 className="fw-bold mb-4 text-center">Tu Carrito de Compras</h2>
      <div className="row">
        {/* 🧺 Lista de productos */}
        <div className="col-lg-8">
          <div className="card shadow-sm mb-4">
            <div className="card-body">
              {cart.map((item) => (
                <CartItem key={item.productId} item={item} />
              ))}
            </div>
          </div>
          <div className="d-flex justify-content-between">
            <button
              className="btn btn-outline-danger"
              onClick={handleClearCart}
            >
              Vaciar Carrito
            </button>
            <Link to="/catalog" className="btn btn-outline-secondary">
              Seguir Comprando
            </Link>
          </div>
        </div>

        {/* 💳 Resumen del pedido */}
        <div className="col-lg-4 mt-4 mt-lg-0">
          <div className="card shadow-sm border-0">
            <div className="card-body">
              <h5 className="card-title mb-3 fw-bold text-center">Resumen</h5>
              <ul className="list-group list-group-flush mb-3">
                <li className="list-group-item d-flex justify-content-between align-items-center">
                  Productos
                  <span className="badge bg-primary rounded-pill">
                    {getTotalItems()}
                  </span>
                </li>
                <li className="list-group-item d-flex justify-content-between">
                  <span>Total:</span>
                  <strong>${getTotalPrice().toFixed(2)}</strong>
                </li>
              </ul>
              <button
                onClick={handleCheckout}
                className="btn btn-success w-100 py-2"
              >
                Finalizar Compra
              </button>
              <div className="text-center mt-3">
                <small className="text-muted">
                  Los precios incluyen IVA y pueden variar sin previo aviso.
                </small>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cart;
