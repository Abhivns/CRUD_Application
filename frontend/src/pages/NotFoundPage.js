import { Link } from 'react-router-dom';

function NotFoundPage() {
  return (
    <div className="auth-shell">
      <div className="auth-panel">
        <div className="card form-card">
          <p className="section-tag">404</p>
          <h2>Page not found</h2>
          <p className="lead-text">The page you requested does not exist.</p>
          <Link className="primary-button" to="/dashboard">
            Go to dashboard
          </Link>
        </div>
      </div>
    </div>
  );
}

export default NotFoundPage;
