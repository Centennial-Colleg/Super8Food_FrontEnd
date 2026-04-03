import { Link } from 'react-router-dom';
import logo from '../assets/Super8FoodLogo.jpeg'; 

function Navbar() {
  const isLoggedIn = true; 

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
      
      {!isLoggedIn ? (
        <Link to="/login">Login</Link>
      ) : (
        <button className="logout-btn" onClick={() => alert('Logging out...')}>
          Logout
        </button>
      )}
      
      {!isLoggedIn && <Link to="/register">Register</Link>}
    </nav>
  );
}

export default Navbar;