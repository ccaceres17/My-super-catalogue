import React from 'react';

function Loader({ message = 'Cargando...' }) {
  return (
    <div className="loader-container">
      <div className="text-center">
        <div className="spinner-custom mb-3"></div>
        <p className="text-muted">{message}</p>
      </div>
    </div>
  );
}

export default Loader;