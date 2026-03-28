import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function AppLayout({ children }) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate('/login');
  }

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <div>
          <p className="sidebar-badge">Full Stack CRUD</p>
          <h1>Teacher Portal</h1>
          <p className="sidebar-copy">
            Manage authentication and teacher records with a modular React and CodeIgniter stack.
          </p>
        </div>

        <nav className="nav-links">
          <NavLink to="/dashboard">Dashboard</NavLink>
          <NavLink to="/teachers">Teachers List</NavLink>
          <NavLink to="/teachers/new">Add Teacher</NavLink>
        </nav>

        <div className="sidebar-footer">
          <p>{user ? `${user.first_name} ${user.last_name}` : 'Authenticated user'}</p>
          <span>{user?.email}</span>
          <button className="ghost-button" onClick={handleLogout} type="button">
            Logout
          </button>
        </div>
      </aside>

      <main className="content-panel">{children}</main>
    </div>
  );
}

export default AppLayout;
