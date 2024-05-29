import './MainSection.css';
import foodImage from '../assets/Header-food.png';
import contactImage from '../assets/contact.png'
import { useEffect } from 'react';

const MainSection = () => {
  
  useEffect(() => {
    window.addEventListener('hashchange', function() {
      if (window.location.hash === '#contact') {
        const contactSection = document.getElementById('contact');
        if (contactSection) {
          contactSection.scrollIntoView({ behavior: 'smooth' });
        }
      }
    });
  }, []);

  return (
    <main className="main-section">
      <img src={foodImage} alt="Delicious food" />
      <div className="welcome">
        
        <h1>Welcome to our food haven!</h1>
        <p>
          Here,  discover a treasure trove of delicious recipes, cooking tips, and culinary inspiration.
          Whether yre a seasoned chef or a kitchen newbie, we have something to tantalize your taste buds.
          Feel free to explore, try new dishes, and even share your own favorite recipes with our community.
          Dive in and let your culinary journey begin! Bon appétit!
        </p>
        
      </div>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
      <path fill="#B4C0D3" fillOpacity="1" d="M0,192L48,165.3C96,139,192,85,288,64C384,43,480,53,576,69.3C672,85,768,107,864,122.7C960,139,1056,149,1152,133.3C1248,117,1344,75,1392,53.3L1440,32L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"></path>
      </svg>
      <div className="contact-us" id="contact">
        <div className='contact-info'>
        <h1>KONTAKT US</h1>
        <p>Email: contact@ourfoodrecipesite.com</p>
        <p>Phone: (123) 456-7890</p>
        <p>Address: 123 Culinary Street, Foodie Town, FL 12345</p>
        </div>
        <div className="contact-image">
          <img src={contactImage} alt="contactImage" />
        </div>
      </div>
    </main>
  );
};

export default MainSection;
