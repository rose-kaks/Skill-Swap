import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './AuthPage.css'; // Reuse styles
import axios from 'axios';  // Make sure axios is installed
import { Link } from "react-router-dom";

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${process.env.REACT_APP_BACKEND_BASE_URL}/api/auth/login`, { email, password });
      // if (response.data.success) {
      //   // Store the JWT token in localStorage or sessionStorage
      //   localStorage.setItem('token', response.data.token);
      //   navigate('/MainPage');  // Redirect to profile page
      // const response = await axios.post('http://localhost:5000/api/auth/login', { // Corrected endpoint
      //   email,
      //   password
      // });
      if (response.data.success) {
        // Store the JWT token in localStorage or sessionStorage
        localStorage.setItem('token', response.data.token);
        localStorage.setItem("userId", response.data.user._id);
        navigate('/mainPage');  
      } else {
        alert('Invalid credentials!');
      }
    } catch (error) {
      console.error('Login error:', error);
      alert('An error occurred. Please try again.');
    }
  };

  return (
    <div className="auth-container">
      <div className="left-content">
        <h2>Login to SkillSwap</h2>
        <h4>Hey! Welcome Back!!</h4>
        <p>Let's continue Learning and Teaching</p>
      </div>

      <div className="right-content">
        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit">Login</button>
        </form>
        <p>
          Don't have an account? <Link to="/signup"><a>Sign up</a></Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
