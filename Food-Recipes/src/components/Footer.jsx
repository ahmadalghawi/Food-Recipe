import './Footer.css';
import logo from '../assets/food.png';
import { Link as ScrollLink } from 'react-scroll';

const Footer = () => {
  return (
    <footer className="footer">
      
      <div className="footer-logo">
        <ScrollLink to="header" smooth={true} duration={500}><img src={logo} alt="Logo" /></ScrollLink>
        <p>Copyright 2024. All Rights Reserved</p>
      </div>
    </footer>
  );
};

export default Footer;
