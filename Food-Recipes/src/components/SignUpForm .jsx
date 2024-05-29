import  { useState } from 'react';
import './SignUpForm .css';
import { Link } from 'react-router-dom';
import axios from 'axios';
const SignUpForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [newsletter, setNewsletter] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newsletter) {
      setErrorMessage('Please agree to join the newsletter.');
      return;
    }
    if (password !== confirmPassword) {
      setErrorMessage('Passwords do not match.');
      return;
    }
    
    try {
        const response = await axios.post('http://localhost:3001/api/signup', { email, password });
        console.log(response.data);
        if (response.data) {
            setErrorMessage('User registered successfully');
        }
      } catch (error) {
        setErrorMessage('Error registering user');
        console.error('There was an error registering the user!', error);
      }
    // For now, just logging the form data
    console.log('Form submitted:', { email, password, confirmPassword, newsletter });
    // Reset form fields and error message
    setEmail('');
    setPassword('');
    setConfirmPassword('');
    setNewsletter(false);
    setErrorMessage('');
  };

  return (
    <div className="signup-form">
    <form className="form" onSubmit={handleSubmit}>
      <span className="signup">Sign Up</span>
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
        required
      />
      <input
        type="password"
        placeholder="Confirm password"
        className="form--input"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        required
      />
      <div className="form--marketing">
        <input
          id="okayToEmail"
          type="checkbox"
          checked={newsletter}
          onChange={(e) => setNewsletter(e.target.checked)}
          
        />
        <label htmlFor="okayToEmail" className="checkbox">
          I want to join the newsletter
        </label>
      </div>
      <button type="submit" className="form--submit">
        Sign up
      </button>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      <p className='form-text'>Already have an account?  <Link to="/login"> Log in</Link></p>
    </form>
  </div>
  );
};

export default SignUpForm;
