import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getProducts, getCategories } from '../api/api';
import ProductList from '../components/ProductList';
import Loader from '../components/Loader';

function Home() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Obtener productos destacados (limitados a 8)
      const productsData = await getProducts(8);
      setProducts(productsData);
      
      // Obtener categorías
      const categoriesData = await getCategories();
      setCategories(categoriesData);
      
      setLoading(false);
    } catch (err) {
      setError('Error al cargar los datos. Por favor, intenta nuevamente.');
      setLoading(false);
      console.error('Error:', err);
    }
  };

  return (
    <>
      {/* Hero Section */}
      <section className="hero-section">
        <div className="container text-center">
          <h1 className="hero-title mb-4">
            Bienvenido a SuperCatálogo
          </h1>
          <p className="lead mb-4">
            Descubre los mejores productos al mejor precio
          </p>
          <Link to="/catalog" className="btn btn-yellow-custom btn-lg px-5">
            Ver Catálogo Completo
          </Link>
        </div>
      </section>

      {/* Categorías destacadas */}
      <section className="container my-5">
        <h2 className="text-center mb-4">Categorías</h2>
        <div className="row g-3">
          {categories.map((category, index) => (
            <div key={index} className="col-6 col-md-3">
              <Link 
                to={`/catalog?category=${category}`}
                className="text-decoration-none"
              >
                <div className="card text-center p-4 h-100 shadow-sm" style={{
                  transition: 'all 0.3s ease',
                  cursor: 'pointer',
                  border: '2px solid transparent'
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.borderColor = '#0066CC';
                  e.currentTarget.style.transform = 'translateY(-5px)';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.borderColor = 'transparent';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}>
                  <h5 className="text-capitalize text-dark mb-0">
                    {category}
                  </h5>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* Productos destacados */}
      <section className="container my-5">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2>Productos Destacados</h2>
          <Link to="/catalog" className="btn btn-outline-primary">
            Ver Todos →
          </Link>
        </div>
        
        <ProductList 
          products={products}
          loading={loading}
          error={error}
        />
      </section>

      {/* CTA Section */}
      <section className="bg-light py-5 mt-5">
        <div className="container text-center">
          <h3 className="mb-3">¿Listo para comenzar?</h3>
          <p className="text-muted mb-4">
            Crea tu cuenta y disfruta de ofertas exclusivas
          </p>
          <Link to="/register" className="btn btn-primary-custom btn-lg me-3">
            Registrarse
          </Link>
          <Link to="/catalog" className="btn btn-outline-primary btn-lg">
            Explorar Productos
          </Link>
        </div>
      </section>
    </>
  );
}

export default Home;