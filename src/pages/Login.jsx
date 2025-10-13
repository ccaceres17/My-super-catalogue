import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

function Login() {
  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showDemoCredentials, setShowDemoCredentials] = useState(false);

  // ✅ Redirigir si el usuario ya está autenticado
  useEffect(() => {
    if (isAuthenticated) navigate('/profile');
  }, [isAuthenticated, navigate]);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const result = await login(formData.username, formData.password);
      if (result.success) {
        navigate('/profile');
      } else {
        setError(result.error || 'Credenciales inválidas. Verifica tu usuario o contraseña.');
      }
    } catch (err) {
      console.error('Error en login:', err);
      setError('No se pudo conectar al servidor. Intenta nuevamente más tarde.');
    } finally {
      setLoading(false);
    }
  };

  const handleDemoLogin = () => {
    setFormData({
      username: 'mor_2314',
      password: '83r5^_'
    });
    setShowDemoCredentials(false);
  };

  return (
    <div className="container my-5">
      <div className="row justify-content-center">
        <div className="col-md-6 col-lg-5">
          <div className="card shadow-lg border-0">
            <div className="card-body p-5">
              <div className="text-center mb-4">
                <h2 className="fw-bold text-primary">Iniciar Sesión</h2>
                <p className="text-muted">Bienvenido de vuelta 👋</p>
              </div>

              {error && (
                <div className="alert alert-danger" role="alert">
                  {error}
                </div>
              )}

              {/* 💡 Credenciales de demostración */}
              <div className="alert alert-info small" role="alert">
                <strong>Modo Demo:</strong> Esta app usa Fake Store API.<br />
                Puedes usar credenciales de prueba:
                <button
                  type="button"
                  className="btn btn-sm btn-outline-primary w-100 mt-2"
                  onClick={() => setShowDemoCredentials(!showDemoCredentials)}
                >
                  {showDemoCredentials ? 'Ocultar' : 'Ver'} credenciales demo
                </button>

                {showDemoCredentials && (
                  <div className="mt-2 bg-white p-2 rounded border">
                    <small>
                      <strong>Usuario:</strong> mor_2314<br />
                      <strong>Contraseña:</strong> 83r5^_
                    </small>
                    <button
                      className="btn btn-sm btn-primary w-100 mt-2"
                      onClick={handleDemoLogin}
                    >
                      Usar estas credenciales
                    </button>
                  </div>
                )}
              </div>

              <form onSubmit={handleSubmit} noValidate>
                <div className="mb-3">
                  <label htmlFor="username" className="form-label">Nombre de Usuario</label>
                  <input
                    id="username"
                    type="text"
                    className="form-control form-control-lg"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    placeholder="Ingresa tu usuario"
                    autoComplete="username"
                    required
                  />
                </div>

                <div className="mb-4">
                  <label htmlFor="password" className="form-label">Contraseña</label>
                  <input
                    id="password"
                    type="password"
                    className="form-control form-control-lg"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Ingresa tu contraseña"
                    autoComplete="current-password"
                    required
                  />
                </div>

                <div className="d-flex justify-content-between align-items-center mb-4">
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="rememberMe"
                    />
                    <label className="form-check-label" htmlFor="rememberMe">
                      Recordarme
                    </label>
                  </div>
                  <Link to="/register" className="text-decoration-none small text-primary">
                    Crear cuenta
                  </Link>
                </div>

                <button
                  type="submit"
                  className="btn btn-primary w-100 py-2"
                  disabled={loading}
                >
                  {loading ? 'Iniciando sesión...' : 'Ingresar'}
                </button>
              </form>
            </div>
          </div>

          <div className="text-center mt-4">
            <p className="small text-muted">
              ¿No tienes cuenta? <Link to="/register">Regístrate aquí</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
