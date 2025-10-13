import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useCart } from '../contexts/CartContext';
import logo from "../assets/logo.png";

function Navbar() {
  const { isAuthenticated, logout } = useAuth();
  const { getTotalItems } = useCart();

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow-sm sticky-top">
      <div className="container">
        {/* 🔹 Logo y nombre */}
        <Link className="navbar-brand d-flex align-items-center" to="/">
          <img
            src={logo}
            alt="Logo"
            width="40"
            height="40"
            className="me-2 rounded-circle border border-light"
          />
          <span className="fw-bold text-white">Super Catálogo</span>
        </Link>

        {/* Botón móvil */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* 🔹 Enlaces */}
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/catalog">
                Catálogo
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="/cart">
                🛒 Carrito ({getTotalItems()})
              </Link>
            </li>

            {isAuthenticated ? (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/profile">
                    Perfil
                  </Link>
                </li>
                <li className="nav-item">
                  <button
                    className="btn btn-sm btn-outline-light ms-2"
                    onClick={logout}
                  >
                    Cerrar sesión
                  </button>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/login">
                    Iniciar sesión
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/register">
                    Registro
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;