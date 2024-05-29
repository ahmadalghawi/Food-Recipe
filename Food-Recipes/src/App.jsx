import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './utils/AuthContext';
import Header from './components/Header'
import SignUpForm from './components/SignUpForm ';
import LoginForm from './components/LoginForm ';
import MyProfile from './components/MyProfile';
import MainSection from './components/MainSection'
import Recipes from './components/Recipes'
import RecipeDetail from './components/RecipeDetail'
import Footer from './components/Footer'
import './App.css'
import AddRecipe from './components/AddRecipe';
import ProtectedRoute from './utils/ProtectedRoute';
import PublicRoute from './utils/PublicRoute';
import NotFound from './components/NotFound';

function App() {
 

  return (
    <>
    <AuthProvider>
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<MainSection />} />
        <Route path="/signup" element={<PublicRoute element={<SignUpForm />} />} />
        <Route path="/login" element={<PublicRoute element={<LoginForm />} />} />
        <Route path="/my-profile" element={<ProtectedRoute element={<MyProfile />} />} />
        <Route path="/recipes" element={<Recipes />} />
        <Route path="/add-recipe" element={<ProtectedRoute element={<AddRecipe />} />} />
        <Route path="/recipes/:recipeId" element={<RecipeDetail />} >
        <Route path="*" element={<NotFound />} /> {/* Catch-all route */}
        </Route>
        </Routes>
      <Footer />
    </Router>
    </AuthProvider>
    </>
  )
}

export default App
