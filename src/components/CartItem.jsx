import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';

function CartItem({ item }) {
  const { updateQuantity, removeItem } = useCart();
  const { product, quantity } = item;

  const handleIncrement = () => {
    updateQuantity(product.id, quantity + 1);
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      updateQuantity(product.id, quantity - 1);
    }
  };

  const handleRemove = () => {
    if (window.confirm('¿Seguro que deseas eliminar este producto del carrito?')) {
      removeItem(product.id);
    }
  };

  const subtotal = (product.price * quantity).toFixed(2);

  return (
    <div className="cart-item">
      <div className="row align-items-center">
        {/* Imagen del producto */}
        <div className="col-md-2 col-3 mb-3 mb-md-0">
          <Link to={`/product/${product.id}`}>
            <img 
              src={product.image} 
              alt={product.title}
              className="img-fluid rounded"
              style={{ 
                maxHeight: '100px', 
                objectFit: 'contain',
                border: '1px solid #dee2e6',
                padding: '0.5rem'
              }}
            />
          </Link>
        </div>

        {/* Información del producto */}
        <div className="col-md-4 col-9 mb-3 mb-md-0">
          <Link 
            to={`/product/${product.id}`}
            className="text-decoration-none text-dark"
          >
            <h6 className="mb-1">{product.title}</h6>
          </Link>
          <small className="text-muted">{product.category}</small>
          <p className="mb-0 mt-1">
            <strong className="text-primary">${product.price.toFixed(2)}</strong>
          </p>
        </div>

        {/* Controles de cantidad */}
        <div className="col-md-3 col-6 mb-3 mb-md-0">
          <div className="input-group" style={{ maxWidth: '150px' }}>
            <button 
              className="btn btn-outline-primary"
              onClick={handleDecrement}
              disabled={quantity <= 1}
            >
              -
            </button>
            <input 
              type="text" 
              className="form-control text-center"
              value={quantity}
              readOnly
            />
            <button 
              className="btn btn-outline-primary"
              onClick={handleIncrement}
            >
              +
            </button>
          </div>
        </div>

        {/* Subtotal */}
        <div className="col-md-2 col-4 mb-3 mb-md-0 text-center">
          <strong className="text-primary fs-5">
            ${subtotal}
          </strong>
        </div>

        {/* Botón eliminar */}
        <div className="col-md-1 col-2 text-center">
          <button 
            className="btn btn-outline-danger btn-sm"
            onClick={handleRemove}
            title="Eliminar producto"
          >
            🗑️
          </button>
        </div>
      </div>
    </div>
  );
}

export default CartItem;