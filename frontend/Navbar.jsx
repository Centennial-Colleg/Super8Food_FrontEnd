import { Link } from 'react-router-dom';

function Navbar({ isLoggedIn, handleLogout }) {
  return (
    <nav style={{ padding: '10px', background: '#f8f8f8', display: 'flex', gap: '15px' }}>
      <Link to="/">Home</Link>
      
      {!isLoggedIn ? (
        <>
          <Link to="/login">Login</Link>
          <Link to="/register">Register</Link>
        </>
      ) : (
        <>
          <Link to="/meals">Meal Plans</Link>
          <button onClick={handleLogout}>Logout</button>
        </>
      )}
    </nav>
  );
}