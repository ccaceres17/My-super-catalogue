import React from 'react';

function Footer() {
  return (
    <footer className="footer-custom text-center">
      <div className="container">
        <div className="row">
          <div className="col-md-4 mb-3 mb-md-0">
            <h5 className="text-warning">SuperCatálogo</h5>
            <p className="mb-0">Tu tienda online de confianza</p>
          </div>
          <div className="col-md-4 mb-3 mb-md-0">
            <h6 className="text-warning">Enlaces</h6>
            <ul className="list-unstyled">
              <li><a href="/" className="text-white text-decoration-none">Inicio</a></li>
              <li><a href="/catalog" className="text-white text-decoration-none">Catálogo</a></li>
              <li><a href="/cart" className="text-white text-decoration-none">Carrito</a></li>
            </ul>
          </div>
          <div className="col-md-4">
            <h6 className="text-warning">Contacto</h6>
            <p className="mb-1">📧 info@supercatalogo.com</p>
            <p className="mb-0">📱 +57 300 123 4567</p>
          </div>
        </div>
        <hr className="border-light mt-4 mb-3" />
        <p className="mb-0">
          &copy; {new Date().getFullYear()} SuperCatálogo. Todos los derechos reservados.
        </p>
      </div>
    </footer>
  );
}

export default Footer;