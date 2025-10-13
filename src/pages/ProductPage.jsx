import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { getProduct } from '../api/api';
import { useCart } from '../contexts/CartContext';
import Loader from '../components/Loader';

function ProductPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addItem } = useCart();
  
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    fetchProduct();
  }, [id]);

  const fetchProduct = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getProduct(id);
      setProduct(data);
      setLoading(false);
    } catch (err) {
      setError('Producto no encontrado');
      setLoading(false);
      console.error('Error:', err);
    }
  };

  const handleQuantityChange = (value) => {
    const newQty = Math.max(1, quantity + value);
    setQuantity(newQty);
  };

  const handleAddToCart = () => {
    addItem(product, quantity);
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  const handleBuyNow = () => {
    addItem(product, quantity);
    navigate('/cart');
  };

  if (loading) {
    return <Loader message="Cargando producto..." />;
  }

  if (error || !product) {
    return (
      <div className="container my-5">
        <div className="alert alert-danger text-center">
          <h4>❌ {error || 'Producto no encontrado'}</h4>
          <button className="btn btn-primary-custom mt-3" onClick={() => navigate('/catalog')}>
            Volver al Catálogo
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container my-5">
      {/* Breadcrumb */}
      <nav aria-label="breadcrumb" className="mb-4">
        <ol className="breadcrumb">
          <li className="breadcrumb-item"><Link to="/">Inicio</Link></li>
          <li className="breadcrumb-item"><Link to="/catalog">Catálogo</Link></li>
          <li className="breadcrumb-item active">{product.title}</li>
        </ol>
      </nav>

      {/* Toast de éxito */}
      {showSuccess && (
        <div className="alert alert-success alert-dismissible fade show position-fixed top-0 end-0 m-3" style={{ zIndex: 9999 }}>
          ✅ Producto agregado al carrito
          <button type="button" className="btn-close" onClick={() => setShowSuccess(false)}></button>
        </div>
      )}

      <div className="row">
        {/* Imagen del producto */}
        <div className="col-lg-6 mb-4">
          <div className="sticky-top" style={{ top: '100px' }}>
            <img
              src={product.image}
              alt={product.title}
              className="product-detail-image w-100"
            />
          </div>
        </div>

        {/* Información del producto */}
        <div className="col-lg-6">
          <div className="mb-3">
            <span className="badge bg-primary text-uppercase px-3 py-2">
              {product.category}
            </span>
          </div>

          <h1 className="display-5 fw-bold mb-3">{product.title}</h1>

          {/* Rating */}
          <div className="d-flex align-items-center mb-4">
            <div className="text-warning fs-5 me-2">
              {'⭐'.repeat(Math.round(product.rating?.rate || 0))}
            </div>
            <span className="text-muted">
              {product.rating?.rate || 'N/A'} ({product.rating?.count || 0} reseñas)
            </span>
          </div>

          {/* Precio */}
          <div className="mb-4">
            <h2 className="display-4 text-primary fw-bold">
              ${product.price.toFixed(2)}
            </h2>
            <p className="text-muted">Impuestos incluidos</p>
          </div>

          {/* Descripción */}
          <div className="mb-4">
            <h5 className="fw-bold">Descripción:</h5>
            <p className="text-muted">{product.description}</p>
          </div>

          {/* Controles de cantidad */}
          <div className="mb-4">
            <h5 className="fw-bold mb-3">Cantidad:</h5>
            <div className="input-group" style={{ maxWidth: '200px' }}>
              <button
                className="btn btn-outline-primary btn-lg"
                onClick={() => handleQuantityChange(-1)}
                disabled={quantity <= 1}
              >
                -
              </button>
              <input
                type="text"
                className="form-control form-control-lg text-center fw-bold"
                value={quantity}
                readOnly
              />
              <button
                className="btn btn-outline-primary btn-lg"
                onClick={() => handleQuantityChange(1)}
              >
                +
              </button>
            </div>
          </div>

          {/* Botones de acción */}
          <div className="d-grid gap-3">
            <button
              className="btn btn-yellow-custom btn-lg"
              onClick={handleBuyNow}
            >
              💳 Comprar Ahora
            </button>
            <button
              className="btn btn-primary-custom btn-lg"
              onClick={handleAddToCart}
            >
              🛒 Agregar al Carrito
            </button>
            <button
              className="btn btn-outline-secondary btn-lg"
              onClick={() => navigate('/catalog')}
            >
              ← Volver al Catálogo
            </button>
          </div>

          {/* Información adicional */}
          <div className="mt-4 p-4 bg-light rounded">
            <h6 className="fw-bold mb-3">Información de Envío:</h6>
            <ul className="list-unstyled">
              <li className="mb-2">✅ Envío gratis en compras mayores a $50</li>
              <li className="mb-2">📦 Entrega en 3-5 días hábiles</li>
              <li className="mb-2">🔄 Devoluciones gratuitas en 30 días</li>
              <li>💳 Pago seguro garantizado</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductPage;