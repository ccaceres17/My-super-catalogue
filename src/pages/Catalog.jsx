import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { getProducts, getCategories, getByCategory } from '../api/api';
import ProductList from '../components/ProductList';

function Catalog() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category') || 'all');
  const [sortBy, setSortBy] = useState('default');
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [selectedCategory]);

  const fetchCategories = async () => {
    try {
      const data = await getCategories();
      setCategories(['all', ...data]);
    } catch (err) {
      console.error('Error al obtener categorías:', err);
    }
  };

  const fetchProducts = async () => {
    try {
      setLoading(true);
      setError(null);
      
      let data;
      if (selectedCategory === 'all') {
        data = await getProducts();
      } else {
        data = await getByCategory(selectedCategory);
      }
      
      setProducts(data);
      setLoading(false);
    } catch (err) {
      setError('Error al cargar productos');
      setLoading(false);
      console.error('Error:', err);
    }
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    if (category === 'all') {
      setSearchParams({});
    } else {
      setSearchParams({ category });
    }
  };

  const handleSortChange = (e) => {
    setSortBy(e.target.value);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value.toLowerCase());
  };

  // Filtrar y ordenar productos
  const getFilteredAndSortedProducts = () => {
    let filtered = [...products];

    // Filtrar por búsqueda
    if (searchTerm) {
      filtered = filtered.filter(product =>
        product.title.toLowerCase().includes(searchTerm) ||
        product.description.toLowerCase().includes(searchTerm)
      );
    }

    // Ordenar
    if (sortBy === 'price-asc') {
      filtered.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-desc') {
      filtered.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'name-asc') {
      filtered.sort((a, b) => a.title.localeCompare(b.title));
    } else if (sortBy === 'rating') {
      filtered.sort((a, b) => (b.rating?.rate || 0) - (a.rating?.rate || 0));
    }

    return filtered;
  };

  const filteredProducts = getFilteredAndSortedProducts();

  return (
    <div className="container my-5">
      {/* Header */}
      <div className="text-center mb-5">
        <h1 className="display-4 fw-bold text-primary">Catálogo de Productos</h1>
        <p className="text-muted">Explora nuestra colección completa</p>
      </div>

      {/* Filtros y búsqueda */}
      <div className="row mb-4">
        {/* Búsqueda */}
        <div className="col-md-6 mb-3">
          <input
            type="text"
            className="form-control form-control-lg"
            placeholder="🔍 Buscar productos..."
            value={searchTerm}
            onChange={handleSearchChange}
          />
        </div>

        {/* Ordenar */}
        <div className="col-md-6 mb-3">
          <select
            className="form-select form-select-lg"
            value={sortBy}
            onChange={handleSortChange}
          >
            <option value="default">Ordenar por: Relevancia</option>
            <option value="price-asc">Precio: Menor a Mayor</option>
            <option value="price-desc">Precio: Mayor a Menor</option>
            <option value="name-asc">Nombre: A-Z</option>
            <option value="rating">Mejor Calificación</option>
          </select>
        </div>
      </div>

      {/* Filtros de categoría */}
      <div className="mb-4 text-center">
        <h5 className="mb-3">Categorías:</h5>
        <div className="d-flex flex-wrap justify-content-center gap-2">
          {categories.map((category) => (
            <button
              key={category}
              className={`btn category-btn ${selectedCategory === category ? 'active' : ''}`}
              onClick={() => handleCategoryChange(category)}
            >
              {category === 'all' ? 'Todas' : category}
            </button>
          ))}
        </div>
      </div>

      {/* Contador de resultados */}
      {!loading && !error && (
        <div className="alert alert-info d-flex justify-content-between align-items-center">
          <span>
            📦 Mostrando <strong>{filteredProducts.length}</strong> producto(s)
            {selectedCategory !== 'all' && ` en "${selectedCategory}"`}
            {searchTerm && ` con "${searchTerm}"`}
          </span>
          {(selectedCategory !== 'all' || searchTerm) && (
            <button
              className="btn btn-sm btn-outline-primary"
              onClick={() => {
                setSelectedCategory('all');
                setSearchTerm('');
                setSearchParams({});
              }}
            >
              Limpiar Filtros
            </button>
          )}
        </div>
      )}

      {/* Lista de productos */}
      <ProductList
        products={filteredProducts}
        loading={loading}
        error={error}
      />
    </div>
  );
}

export default Catalog;