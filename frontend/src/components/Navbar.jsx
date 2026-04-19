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
        <Link to="/meals">Meals</Link>
        {isLoggedIn && <Link to="/dashboard">Dashboard</Link>}
        {isLoggedIn && <Link to="/orders">My Orders</Link>}
        {isLoggedIn && <Link to="/history">My History</Link>}
        {isLoggedIn && <Link to="/profile">My Profile</Link>}

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