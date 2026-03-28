import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function DashboardPage() {
  const { user } = useAuth();

  return (
    <section className="page-stack">
      <div className="hero-card card">
        <p className="section-tag">Dashboard</p>
        <h2>Authenticated teacher management workspace</h2>
        <p className="lead-text">
          Signed in as {user?.first_name} {user?.last_name}. Use the quick actions below
          to manage teacher records through the protected API.
        </p>
      </div>

      <div className="stats-grid">
        <div className="card stat-card">
          <span>JWT Authentication</span>
          <strong>Active</strong>
        </div>
        <div className="card stat-card">
          <span>Protected CRUD</span>
          <strong>Ready</strong>
        </div>
      </div>

      <div className="card action-card">
        <h3>Quick actions</h3>
        <div className="quick-actions">
          <Link className="primary-button" to="/teachers">
            View Teachers
          </Link>
          <Link className="secondary-button" to="/teachers/new">
            Add Teacher
          </Link>
        </div>
      </div>
    </section>
  );
}

export default DashboardPage;
