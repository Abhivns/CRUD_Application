import { Link, useLocation, useNavigate } from 'react-router-dom';
import Alert from '../components/Alert';
import AuthForm from '../components/AuthForm';
import { useAuth } from '../context/AuthContext';
import useAuthForm from '../utils/useAuthForm';
import { formatApiError } from '../utils/apiError';

function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const redirectTo = location.state?.from?.pathname || '/dashboard';
  const {
    values,
    errors,
    notice,
    setNotice,
    loading,
    setLoading,
    handleChange,
    validate,
  } = useAuthForm('login');

  async function handleSubmit(event) {
    event.preventDefault();

    if (!validate()) {
      return;
    }

    setLoading(true);
    setNotice({ type: '', message: '' });

    try {
      await login({
        email: values.email,
        password: values.password,
      });
      navigate(redirectTo, { replace: true });
    } catch (error) {
      setNotice({ type: 'error', message: formatApiError(error, 'Login failed.') });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="auth-shell">
      <div className="auth-intro">
        <p className="sidebar-badge">Secure Access</p>
        <h1>Token-based authentication for the teacher portal</h1>
        <p>
          Sign in to access protected CRUD operations, joined teacher data, and the
          dashboard.
        </p>
      </div>

      <div className="auth-panel">
        <Alert message={notice.message} type={notice.type} />
        <AuthForm
          errors={errors}
          loading={loading}
          mode="login"
          onChange={handleChange}
          onSubmit={handleSubmit}
          values={values}
        />
        <p className="switch-text">
          Don&apos;t have an account? <Link to="/register">Create one here</Link>
        </p>
      </div>
    </div>
  );
}

export default LoginPage;
