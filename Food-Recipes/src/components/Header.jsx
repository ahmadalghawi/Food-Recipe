import  { useEffect, useState, useContext } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { AuthContext } from '../utils/AuthContext';
import { animateScroll as scroll } from 'react-scroll';
import './Header.css';
import logo from '../assets/food.png'; 

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [navigateToContact, setNavigateToContact] = useState(false);
  const { isAuthenticated, logout } = useContext(AuthContext);

  useEffect(() => {
    if (navigateToContact) {
      scroll.scrollTo(document.getElementById('contact').offsetTop, {
        duration: 500,
        smooth: true,
      });
      setNavigateToContact(false);
    }
  }, [navigateToContact]);

  const handleContactClick = () => {
    if (location.pathname !== '/') {
      navigate('/');
      setNavigateToContact(true);
    } else {
      scroll.scrollTo(document.getElementById('contact').offsetTop, {
        duration: 500,
        smooth: true,
      });
    }
  };

  return (
    <header className="header" id='header'>
      <div className="header-content">
        <div className='left-nav'>
          <div className="logo">
            <Link to="/"> <img src={logo} alt="Logo" /> </Link>
          </div>
          <nav>
            <ul>
              <li><Link to="/recipes">FOOD RECIPES</Link></li>
              <li><span onClick={handleContactClick}>CONTACT US</span></li>
              { isAuthenticated && <li><Link to="/my-profile">MY PROFILE</Link></li>}
            </ul>
          </nav>
        </div>
        { isAuthenticated ? (
          <div className="auth-buttons">
            <Link to="/my-profile">{localStorage.getItem('email')}</Link>
            <button onClick={logout}>Logout</button>
          </div> 
          ):( 
          <div className="auth-buttons">
          <Link to="/login">Login</Link>
          <Link to="/signup"><button>Signup</button></Link>
        </div>)}
      </div>
    </header>
  );
};

export default Header;
