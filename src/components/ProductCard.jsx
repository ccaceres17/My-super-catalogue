import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';

function ProductCard({ product }) {
  const { addItem } = useCart();

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(product, 1);
    
    // Mostrar notificación simple
    showToast('✅ Producto agregado al carrito');
  };

  const showToast = (message) => {
    const toastDiv = document.createElement('div');
    toastDiv.className = 'position-fixed top-0 end-0 p-3';
    toastDiv.style.zIndex = '9999';
    toastDiv.innerHTML = `
      <div class="toast show bg-success text-white" role="alert">
        <div class="toast-body">
          ${message}
        </div>
      </div>
    `;
    document.body.appendChild(toastDiv);
    setTimeout(() => toastDiv.remove(), 2000);
  };

  return (
    <div className="col">
      <Link to={`/product/${product.id}`} className="text-decoration-none">
        <div className="card product-card h-100 shadow-sm">
          <img 
            src={product.image} 
            className="card-img-top product-image" 
            alt={product.title}
            loading="lazy"
          />
          <div className="card-body d-flex flex-column">
            <span className="badge bg-primary mb-2 align-self-start">
              {product.category}
            </span>
            <h5 className="card-title text-dark" style={{
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              minHeight: '3rem'
            }}>
              {product.title}
            </h5>
            <div className="mt-auto">
              <div className="d-flex justify-content-between align-items-center mb-3">
                <span className="h4 text-primary mb-0">
                  ${product.price.toFixed(2)}
                </span>
                <span className="text-muted">
                  ⭐ {product.rating?.rate || 'N/A'} ({product.rating?.count || 0})
                </span>
              </div>
              <button 
                className="btn btn-primary-custom w-100"
                onClick={handleAddToCart}
              >
                🛒 Agregar al Carrito
              </button>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}

export default ProductCard;