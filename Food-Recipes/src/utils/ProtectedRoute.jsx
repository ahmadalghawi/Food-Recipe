// ProtectedRoute.js
import { Navigate } from 'react-router-dom';


const ProtectedRoute = ({ element }) => {
//   const { isAuthenticated } = useContext(AuthContext);
const isAuthenticated = localStorage?.getItem('isAuthenticated');

  return isAuthenticated ? element : <Navigate to="/login" />;
};

export default ProtectedRoute;
