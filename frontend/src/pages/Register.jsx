import { useState } from 'react';

function Register() {
  const [formData, setFormData] = useState({ username: '', password: '', email: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Registering User:", formData);
    alert("Registration functional! Connection to backend coming soon.");
  };

  return (
    <div className="auth-container">
      <h2>Register for Super 8 Food</h2>
      <form onSubmit={handleSubmit}>
        <input 
          type="text" 
          placeholder="Username" 
          onChange={(e) => setFormData({...formData, username: e.target.value})} 
          required 
        />
        <input 
          type="email" 
          placeholder="Email Address" 
          onChange={(e) => setFormData({...formData, email: e.target.value})} 
          required 
        />
        <input 
          type="password" 
          placeholder="Password" 
          onChange={(e) => setFormData({...formData, password: e.target.value})} 
          required 
        />
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
}

export default Register;