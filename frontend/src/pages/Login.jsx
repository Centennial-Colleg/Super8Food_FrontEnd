import { useState } from 'react';

function Login() {
  const [credentials, setCredentials] = useState({ username: '', password: '' });

  const handleLogin = (e) => {
    e.preventDefault();
    console.log("Logging in:", credentials);
    // For now, we will simulate a successful login
    alert("Logged in successfully!");
  };

  return (
    <div className="auth-container">
      <h2>Login to Super 8 Food</h2>
      <form onSubmit={handleLogin}>
        <input 
          type="text" 
          placeholder="Username" 
          onChange={(e) => setCredentials({...credentials, username: e.target.value})} 
          required 
        />
        <input 
          type="password" 
          placeholder="Password" 
          onChange={(e) => setCredentials({...credentials, password: e.target.value})} 
          required 
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default Login;