import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function Navbar() {
  const { user, logout } = useAuth();

  return (
    <nav className="navbar">
      <div className="nav-brand">
        <Link to="/">Event Manager</Link>
      </div>
      <div className="nav-links">
        <Link to="/">Events</Link>
        {user ? (
          <>
            <Link to="/my-events">My Events</Link>
            {user.role === 'admin' && <Link to="/create">Create Event</Link>}
            <a href="#" onClick={logout}>Logout</a>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;