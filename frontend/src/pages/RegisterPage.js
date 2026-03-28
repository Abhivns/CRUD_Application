import { Link, useNavigate } from 'react-router-dom';
import Alert from '../components/Alert';
import AuthForm from '../components/AuthForm';
import { useAuth } from '../context/AuthContext';
import useAuthForm from '../utils/useAuthForm';
import { formatApiError } from '../utils/apiError';

function RegisterPage() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const {
    values,
    errors,
    notice,
    setNotice,
    loading,
    setLoading,
    handleChange,
    validate,
  } = useAuthForm('register');

  async function handleSubmit(event) {
    event.preventDefault();

    if (!validate()) {
      return;
    }

    setLoading(true);
    setNotice({ type: '', message: '' });

    try {
      await register(values);
      navigate('/dashboard', { replace: true });
    } catch (error) {
      setNotice({ type: 'error', message: formatApiError(error, 'Registration failed.') });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="auth-shell">
      <div className="auth-intro">
        <p className="sidebar-badge">New Account</p>
        <h1>Create a user account before accessing teacher management</h1>
        <p>
          Registration creates the `auth_user` record and returns a JWT so protected
          pages can be accessed immediately.
        </p>
      </div>

      <div className="auth-panel">
        <Alert message={notice.message} type={notice.type} />
        <AuthForm
          errors={errors}
          loading={loading}
          mode="register"
          onChange={handleChange}
          onSubmit={handleSubmit}
          values={values}
        />
        <p className="switch-text">
          Already registered? <Link to="/login">Go to login</Link>
        </p>
      </div>
    </div>
  );
}

export default RegisterPage;
