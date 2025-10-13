import React from "react";

function Profile() {
  return (
    <div className="container my-5">
      <h2 className="fw-bold text-center mb-4">Mi Perfil</h2>
      <p className="text-center text-muted">
        Aquí podrás ver tu información personal y tu historial de compras.
      </p>
      <div className="text-center mt-4">
        <p>👤 Usuario: demo_user</p>
        <p>📧 Email: demo@example.com</p>
      </div>
    </div>
  );
}

export default Profile;
