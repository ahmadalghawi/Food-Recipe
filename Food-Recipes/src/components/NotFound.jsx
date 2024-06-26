
import { Link } from 'react-router-dom';
import "../App.css";
const NotFound = () => {
  return (
    <div className="not-found">
      <h2>404 - Page Not Found</h2>
      <p>The page you are looking for does not exist.</p>
      <Link to="/"><button>Go to Home</button></Link>
    </div>
  );
};

export default NotFound;
