import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

function Register() {
  const { register, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: '',
    username: '',
    password: '',
    confirmPassword: '',
    firstname: '',
    lastname: '',
    phone: ''
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Redirigir si ya está autenticado
  if (isAuthenticated) {
    navigate('/profile');
    return null;
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Validaciones
    if (formData.password !== formData.confirmPassword) {
      setError('Las contraseñas no coinciden');
      return;
    }

    if (formData.password.length < 6) {
      setError('La contraseña debe tener al menos 6 caracteres');
      return;
    }

    setLoading(true);

    try {
      // Preparar datos para la API
      const userData = {
        email: formData.email,
        username: formData.username,
        password: formData.password,
        name: {
          firstname: formData.firstname,
          lastname: formData.lastname
        },
        address: {
          city: 'Barranquilla',
          street: 'Calle principal',
          number: 123,
          zipcode: '080001',
          geolocation: {
            lat: '-37.3159',
            long: '81.1496'
          }
        },
        phone: formData.phone
      };

      const result = await register(userData);

      if (result.success) {
        navigate('/profile');
      } else {
        setError(result.error || 'Error al registrar usuario');
      }
    } catch (err) {
      setError('Error al registrar. Intenta nuevamente.');
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container my-5">
      <div className="row justify-content-center">
        <div className="col-md-6 col-lg-5">
          <div className="card shadow-lg">
            <div className="card-body p-5">
              <div className="text-center mb-4">
                <h2 className="fw-bold text-primary">Crear Cuenta</h2>
                <p className="text-muted">Únete a SuperCatálogo</p>
              </div>

              {error && (
                <div className="alert alert-danger" role="alert">
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit}>
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label className="form-label">Nombre *</label>
                    <input
                      type="text"
                      className="form-control"
                      name="firstname"
                      value={formData.firstname}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="col-md-6 mb-3">
                    <label className="form-label">Apellido *</label>
                    <input
                      type="text"
                      className="form-control"
                      name="lastname"
                      value={formData.lastname}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                <div className="mb-3">
                  <label className="form-label">Email *</label>
                  <input
                    type="email"
                    className="form-control"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="ejemplo@email.com"
                    required
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Nombre de Usuario *</label>
                  <input
                    type="text"
                    className="form-control"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    placeholder="usuario123"
                    required
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Teléfono *</label>
                  <input
                    type="tel"
                    className="form-control"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+57 300 123 4567"
                    required
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Contraseña *</label>
                  <input
                    type="password"
                    className="form-control"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Mínimo 6 caracteres"
                    required
                  />
                </div>

                <div className="mb-4">
                  <label className="form-label">Confirmar Contraseña *</label>
                  <input
                    type="password"
                    className="form-control"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    placeholder="Repite tu contraseña"
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="btn btn-primary-custom w-100 btn-lg mb-3"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <span className="spinner-border spinner-border-sm me-2"></span>
                      Registrando...
                    </>
                  ) : (
                    'Crear Cuenta'
                  )}
                </button>

                <div className="text-center">
                  <p className="text-muted mb-0">
                    ¿Ya tienes cuenta?{' '}
                    <Link to="/login" className="text-primary fw-bold text-decoration-none">
                      Inicia Sesión
                    </Link>
                  </p>
                </div>
              </form>

              <hr className="my-4" />

              <div className="text-center">
                <small className="text-muted">
                  Al registrarte, aceptas nuestros Términos y Condiciones
                </small>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;