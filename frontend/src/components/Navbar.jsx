
import logo from '../assets/Super8FoodLogo.jpeg'; 
import { clearJWT, getUsername, isAuthenticated } from './auth/auth-helper';
import { Link, useNavigate } from "react-router-dom";


function Navbar() {
  const isLoggedIn = isAuthenticated(); 
  const navigate = useNavigate();

  return (
    <nav>
      {/* Logo Link */}
      <Link to="/" className="nav-logo-link">
        <img 
          src={logo} 
          alt="Super 8 Food Logo" 
          className="nav-logo"
        />
      </Link>

      <Link to="/">Home</Link>
      <Link to="/meals">Menu</Link>

      {isLoggedIn && <a className="welcome-msg">Welcome, {getUsername()}!</a>}

      
      {!isLoggedIn ? (
        <Link to="/login">Login</Link>
      ) : (
        <button className="logout-btn" onClick={() => {clearJWT(); navigate("/")}}>
          Logout
        </button>
      )}

      
      {!isLoggedIn && <Link to="/register">Register</Link>}
    </nav>
  );
}

export default Navbar;