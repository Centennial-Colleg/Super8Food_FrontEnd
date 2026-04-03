import { Link } from 'react-router-dom';

function Navbar() {
  // We will automate this 'isLoggedIn' logic later
  const isLoggedIn = true; 

  return (
    <nav style={{ display: 'flex', gap: '20px', padding: '10px', borderBottom: '1px solid #ccc' }}>
      <Link to="/">Home</Link>
      <Link to="/meals">Menu</Link>
      
      {!isLoggedIn ? (
        <Link to="/login">Login</Link>
      ) : (
        <button onClick={() => alert('Logging out...')}>Logout</button>
      )}
      
      {!isLoggedIn && <Link to="/register">Register</Link>}
    </nav>
  );
}

export default Navbar;