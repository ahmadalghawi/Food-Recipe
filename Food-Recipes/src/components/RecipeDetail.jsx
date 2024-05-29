// RecipeDetail.js
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from 'react';
import axios from 'axios';
// import recipes from "../utils/recipesData";
import "./RecipeDetail.css";

const RecipeDetail = () => {
  const { recipeId } = useParams();
  const navigate = useNavigate();
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/api/recipes/${recipeId}`);
        setRecipe(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchRecipe();
    }, [recipeId]);

    if (loading) {
        return <div className="recipe-detail">Loading...</div>;
    }

    if (error) {
        return <div className="recipe-detail">Error: {error}</div>;
    }

    if (!recipe) {
        return <div className="recipe-detail">Recipe not found!</div>;
    }

  return (
    <div className="recipe-detail">
      <button
        onClick={() => navigate("/recipes")}
        className="cssbuttons-io-button"
      >
        Back to Recipes
        <div className="icon">
          <svg
            height="24"
            width="24"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M0 0h24v24H0z" fill="none"></path>
            <path
              d="M16.172 11l-5.364-5.364 1.414-1.414L20 12l-7.778 7.778-1.414-1.414L16.172 13H4v-2z"
              fill="currentColor"
              transform="scale(-1, 1) translate(-24, 0)"
            ></path>
          </svg>
        </div>
      </button>
      <h2>{recipe.title}</h2>
      {/* <img src={recipe.image} alt={recipe.title} className="recipe-image" /> */}
      <img src={`http://localhost:3001${recipe.image}`} alt={recipe.title} className="recipe-image" />
      <h4> {recipe.category}</h4>
      <h3>Ingredients</h3>
      <p>{recipe.ingredients}</p>
      <h3>Instructions</h3>
      <p>{recipe.instructions}</p>
      <p>Tags: {recipe.tags && <span style={{color: '#7cafff'}}> {recipe?.tags.join(', ')}</span>}</p>

      <button
        onClick={() => navigate("/recipes")}
        className="cssbuttons-io-button"
      >
        Back to Recipes
        <div className="icon">
          <svg
            height="24"
            width="24"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M0 0h24v24H0z" fill="none"></path>
            <path
              d="M16.172 11l-5.364-5.364 1.414-1.414L20 12l-7.778 7.778-1.414-1.414L16.172 13H4v-2z"
              fill="currentColor"
              transform="scale(-1, 1) translate(-24, 0)"
            ></path>
          </svg>
        </div>
      </button>
    </div>
  );
};

export default RecipeDetail;
