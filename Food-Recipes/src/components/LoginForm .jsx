import { useState, useContext } from 'react';
import './SignUpForm .css';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../utils/AuthContext';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Validation
    if (!email || !password) {
      setErrorMessage('Please fill in all fields.');
      return;
    }
    try {
        const response = await axios.post('http://localhost:3001/api/login', { email, password });
            console.log(response.data);
        if (response.data.message === 'Login successful') {
            setErrorMessage(response.data.message);
            localStorage.setItem('email', response.data.email);
            login(); 
            navigate('/my-profile'); 
        }else {
            setErrorMessage(response.data);
        }
        // Handle successful login (e.g., save token, redirect, etc.)
      } catch (error) {
        setErrorMessage('Error logging in');
        console.error('There was an error logging in!', error);
      }
  };

  return (
    <div className="signup-form">
    <form className="form">
      <span className="signup">Log In</span>
      <input
        type="email"
        placeholder="Email address"
        className="form--input"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <input
        type="password"
        placeholder="Password"
        className="form--input"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleSubmit} className="form--submit">
        Log in
      </button>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      <p className='form-text'>Don't have an account?  <Link to="/signup"> Sign up</Link></p>
    </form>
  </div>
  );
};

export default LoginForm;
