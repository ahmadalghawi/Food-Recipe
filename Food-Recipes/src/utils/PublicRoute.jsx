// PublicRoute.js

import { Navigate } from 'react-router-dom';


const PublicRoute = ({ element }) => {

    const isAuthenticated = localStorage?.getItem('isAuthenticated');

  return !isAuthenticated ? element : <Navigate to="/" />;
};

export default PublicRoute;
