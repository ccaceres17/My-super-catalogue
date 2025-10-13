import React from 'react';
import ProductCard from './ProductCard';
import Loader from './Loader';

function ProductList({ products, loading, error }) {
  if (loading) {
    return <Loader message="Cargando productos..." />;
  }

  if (error) {
    return (
      <div className="alert alert-danger text-center" role="alert">
        <h4 className="alert-heading">❌ Error</h4>
        <p>{error}</p>
        <button 
          className="btn btn-primary-custom" 
          onClick={() => window.location.reload()}
        >
          Reintentar
        </button>
      </div>
    );
  }

  if (!products || products.length === 0) {
    return (
      <div className="alert alert-info text-center" role="alert">
        <h4 className="alert-heading">🔍 No hay productos</h4>
        <p>No se encontraron productos con los filtros seleccionados.</p>
      </div>
    );
  }

  return (
    <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 row-cols-xl-4 g-4">
      {products.map(product => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}

export default ProductList;