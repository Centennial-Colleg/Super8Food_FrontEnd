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
        <span className="nav-title">Super Food 8</span>
      </div>

      <div className="nav-right">
        <Link to="/">Home</Link>
        {!isLoggedIn && <Link to="/meals_public">Menu</Link>}
        {isLoggedIn && <Link to="/meals">Meals</Link>}
        {isLoggedIn && <Link to="/orders">My Orders</Link>}

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