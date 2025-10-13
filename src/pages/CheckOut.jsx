import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import { useAuth } from '../contexts/AuthContext';

function Checkout() {
  const { cart, getTotalPrice, syncCartWithAPI, clearCart } = useCart();
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: user?.name ? `${user.name.firstname} ${user.name.lastname}` : '',
    email: user?.email || '',
    phone: '',
    address: '',
    city: '',
    postalCode: '',
    cardNumber: '',
    cardExpiry: '',
    cardCVV: ''
  });

  const [loading, setLoading] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);
  const [orderId, setOrderId] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!isAuthenticated) {
      alert('Debes iniciar sesión para completar la compra');
      navigate('/login');
      return;
    }

    setLoading(true);

    try {
      // Simular delay de procesamiento
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Sincronizar con API
      const result = await syncCartWithAPI();
      
      if (result.success) {
        setOrderId(result.data.id || Math.floor(Math.random() * 10000));
        setOrderComplete(true);
        clearCart();
      } else {
        alert('Error al procesar el pedido: ' + result.error);
      }
    } catch (error) {
      alert('Error al procesar el pago');
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  // Redirigir si no está autenticado
  if (!isAuthenticated) {
    return (
      <div className="container my-5">
        <div className="alert alert-warning text-center">
          <h4>⚠️ Acceso Restringido</h4>
          <p>Debes iniciar sesión para acceder al checkout</p>
          <button className="btn btn-primary-custom" onClick={() => navigate('/login')}>
            Iniciar Sesión
          </button>
        </div>
      </div>
    );
  }

  // Redirigir si el carrito está vacío
  if (cart.length === 0 && !orderComplete) {
    return (
      <div className="container my-5">
        <div className="alert alert-info text-center">
          <h4>🛒 Carrito Vacío</h4>
          <p>No tienes productos en tu carrito</p>
          <button className="btn btn-primary-custom" onClick={() => navigate('/catalog')}>
            Ir al Catálogo
          </button>
        </div>
      </div>
    );
  }

  // Mostrar confirmación de pedido
  if (orderComplete) {
    return (
      <div className="container my-5">
        <div className="text-center py-5">
          <div className="mb-4">
            <span style={{ fontSize: '5rem' }}>✅</span>
          </div>
          <h1 className="text-success mb-3">¡Pedido Confirmado!</h1>
          <p className="text-muted mb-4">
            Tu pedido #{orderId} ha sido procesado exitosamente
          </p>
          <div className="alert alert-success mx-auto" style={{ maxWidth: '500px' }}>
            <h5>📧 Confirmación enviada</h5>
            <p className="mb-0">Hemos enviado los detalles a {formData.email}</p>
          </div>
          <div className="mt-4">
            <button 
              className="btn btn-primary-custom btn-lg me-3"
              onClick={() => navigate('/profile')}
            >
              Ver Mis Pedidos
            </button>
            <button 
              className="btn btn-outline-primary btn-lg"
              onClick={() => navigate('/catalog')}
            >
              Seguir Comprando
            </button>
          </div>
        </div>
      </div>
    );
  }

  const subtotal = getTotalPrice();
  const shipping = subtotal > 50 ? 0 : 5.99;
  const total = subtotal + shipping;

  return (
    <div className="container my-5">
      <h1 className="mb-4">💳 Finalizar Compra</h1>

      <div className="row">
        {/* Formulario */}
        <div className="col-lg-8">
          <form onSubmit={handleSubmit}>
            {/* Información de contacto */}
            <div className="card shadow-sm mb-4">
              <div className="card-body">
                <h5 className="card-title mb-4">📧 Información de Contacto</h5>
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label className="form-label">Nombre Completo *</label>
                    <input
                      type="text"
                      className="form-control"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="col-md-6 mb-3">
                    <label className="form-label">Email *</label>
                    <input
                      type="email"
                      className="form-control"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="col-12 mb-3">
                    <label className="form-label">Teléfono *</label>
                    <input
                      type="tel"
                      className="form-control"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+57 300 123 4567"
                      required
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Dirección de envío */}
            <div className="card shadow-sm mb-4">
              <div className="card-body">
                <h5 className="card-title mb-4">📦 Dirección de Envío</h5>
                <div className="mb-3">
                  <label className="form-label">Dirección *</label>
                  <input
                    type="text"
                    className="form-control"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    placeholder="Calle, número, apartamento"
                    required
                  />
                </div>
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label className="form-label">Ciudad *</label>
                    <input
                      type="text"
                      className="form-control"
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="col-md-6 mb-3">
                    <label className="form-label">Código Postal *</label>
                    <input
                      type="text"
                      className="form-control"
                      name="postalCode"
                      value={formData.postalCode}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Información de pago */}
            <div className="card shadow-sm mb-4">
              <div className="card-body">
                <h5 className="card-title mb-4">💳 Información de Pago</h5>
                <div className="mb-3">
                  <label className="form-label">Número de Tarjeta *</label>
                  <input
                    type="text"
                    className="form-control"
                    name="cardNumber"
                    value={formData.cardNumber}
                    onChange={handleChange}
                    placeholder="1234 5678 9012 3456"
                    maxLength="19"
                    required
                  />
                </div>
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label className="form-label">Fecha de Vencimiento *</label>
                    <input
                      type="text"
                      className="form-control"
                      name="cardExpiry"
                      value={formData.cardExpiry}
                      onChange={handleChange}
                      placeholder="MM/AA"
                      maxLength="5"
                      required
                    />
                  </div>
                  <div className="col-md-6 mb-3">
                    <label className="form-label">CVV *</label>
                    <input
                      type="text"
                      className="form-control"
                      name="cardCVV"
                      value={formData.cardCVV}
                      onChange={handleChange}
                      placeholder="123"
                      maxLength="4"
                      required
                    />
                  </div>
                </div>
              </div>
            </div>

            <button 
              type="submit" 
              className="btn btn-yellow-custom btn-lg w-100"
              disabled={loading}
            >
              {loading ? (
                <>
                  <span className="spinner-border spinner-border-sm me-2"></span>
                  Procesando...
                </>
              ) : (
                `💳 Pagar $${total.toFixed(2)}`
              )}
            </button>
          </form>
        </div>

        {/* Resumen del pedido */}
        <div className="col-lg-4">
          <div className="card shadow-sm sticky-top" style={{ top: '100px' }}>
            <div className="card-body">
              <h5 className="card-title mb-4">Resumen del Pedido</h5>
              
              {/* Productos */}
              <div className="mb-3">
                {cart.map((item) => (
                  <div key={item.product.id} className="d-flex justify-content-between mb-2">
                    <span className="text-muted small">
                      {item.product.title.substring(0, 30)}... x{item.quantity}
                    </span>
                    <span className="small">${(item.product.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
              </div>

              <hr />

              <div className="d-flex justify-content-between mb-2">
                <span>Subtotal:</span>
                <strong>${subtotal.toFixed(2)}</strong>
              </div>
              
              <div className="d-flex justify-content-between mb-2">
                <span>Envío:</span>
                <strong className={shipping === 0 ? 'text-success' : ''}>
                  {shipping === 0 ? 'GRATIS' : `$${shipping.toFixed(2)}`}
                </strong>
              </div>

              <hr />
              
              <div className="d-flex justify-content-between mb-3">
                <h5 className="mb-0">Total:</h5>
                <h4 className="text-primary mb-0">${total.toFixed(2)}</h4>
              </div>

              <div className="alert alert-info small">
                🔒 Pago seguro y encriptado
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Checkout;