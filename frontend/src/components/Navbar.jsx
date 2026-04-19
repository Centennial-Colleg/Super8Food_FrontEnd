/**
 * Top navigation bar with links to all major pages. Conditionally
 * renders links and labels based on authentication state and admin role.
 *
 * Developers:
 *  - Mohd Javed Khan      - 301523744
 *  - Brian Nubila         - 301514904
 *  - Osamahiemen Idemudia - 301476106
 *  - Andrelle Thompson    - 301519338
 *  - Adib Md. Mahin       - 301424034
 */

import logo from '../assets/Super8FoodLogo.jpeg'; 
import { clearJWT, getUsername, isAuthenticated, isAdmin } from './auth/auth-helper';
import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const isLoggedIn = isAuthenticated(); 
  const navigate = useNavigate();

  return (
    <nav className="navbar">
      <div className="nav-left">
        <Link to="/" className="nav-logo-link">
          <img src={logo} alt="Super 8 Food Logo" className="nav-logo" />
        </Link>
        <span className="nav-title">Super 8 Food</span>
      </div>

      <div className="nav-right">
        <Link to="/">Home</Link>
        {isLoggedIn && <Link to="/dashboard">Dashboard</Link>}
        <Link to="/meals">Meals</Link>
        {isLoggedIn && <Link to="/orders">{isAdmin() ? 'All Orders' : 'My Orders'}</Link>}
        {isLoggedIn && <Link to="/history">My History</Link>}
        {isLoggedIn && !isAdmin() && <Link to="/profile">My Profile</Link>}

        {isLoggedIn && (
          <span className="welcome-msg">
            Welcome, {getUsername()} {isAdmin() && <span>(Admin)</span>}!
          </span>
        )}

        {!isLoggedIn ? (
          <Link to="/login">Login</Link>
        ) : (
          <button
            className="logout-btn"
            onClick={() => { clearJWT(); navigate("/") }}
          >
            Logout
          </button>
        )}

        {!isLoggedIn && <Link to="/register">Register</Link>}
      </div>
    </nav>
  );
}

export default Navbar;