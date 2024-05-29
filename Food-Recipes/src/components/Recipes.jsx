import './Recipes.css';
import axios from 'axios';
import { useState, useEffect } from 'react';
// import recipes from '../utils/recipesData'; 
import { Link } from 'react-router-dom';
const Recipes = () => {
  
    const [recipes, setRecipes] = useState([]);
    const [titleFilter, setTitleFilter] = useState('');
    const [categoryFilter, setCategoryFilter] = useState('');
    const [tagsFilter, setTagsFilter] = useState([]);
    const [showFilters, setShowFilters] = useState(false);

    const tagOptions = ['hot', 'cold', 'chicken', 'fish', 'meat', 'vegetable', 'drink', 'sweet'];
    const categoryOptions = ['Breakfast', 'Lunch', 'Dinner', 'Snacks', 'Desserts'];
    

    useEffect(() => {
      const fetchRecipes = async () => {
        try {
          const response = await axios.get('http://localhost:3001/api/recipes');
          setRecipes(response.data);
        } catch (error) {
          console.error('Error fetching recipes:', error);
        }
      };
  
      fetchRecipes();
    }, []);


    const handleShowFilters = () => {
        setShowFilters(!showFilters);

      };

    const handleTitleFilterChange = (e) => {
        setTitleFilter(e.target.value);
      };
    
      const handleCategoryFilterChange = (e) => {
        setCategoryFilter(e.target.value);
      };
    
      const handleTagFilterChange = (e) => {
        const { value, checked } = e.target;
        setTagsFilter((prevTags) =>
          checked ? [...prevTags, value] : prevTags.filter((tag) => tag !== value)
        );
      };

      const handleClearFilters = () => {
        setTitleFilter('');
        setCategoryFilter('');
        setTagsFilter([]);
      };

      const filteredRecipes = recipes.filter((recipe) => {
        return (
          recipe.title.toLowerCase().includes(titleFilter.toLowerCase()) &&
          (categoryFilter === '' || recipe.category === categoryFilter) &&
          (tagsFilter.length === 0 || (recipe.tags && tagsFilter.every((tag) => recipe.tags.includes(tag))))
        );
      });

  return (
    <div className="recipes">
      <div className="recipes-header">
        <div className='recipe-filters'>
        <h3>Recipes Name Search:</h3>
        <input
            type="text"
            placeholder="Filter by title"
            value={titleFilter}
            onChange={handleTitleFilterChange}
          />
          </div>
        <div className='recipe-filters-category'> 
        <button className="cta" onClick={handleShowFilters}>
            <span className="hover-underline-animation">{!showFilters? 'Show Filter':'Hide Filter' }</span>
            <svg
                id="arrow-horizontal"
                xmlns="http://www.w3.org/2000/svg"
                width="30"
                height="10"
                viewBox="0 0 46 16"
            >
                <path
                id="Path_10"
                data-name="Path 10"
                d="M8,0,6.545,1.455l5.506,5.506H-30V9.039H12.052L6.545,14.545,8,16l8-8Z"
                transform="translate(30)"
                ></path>
            </svg>
          </button>
          {showFilters && <>
        <div className='recipe-filters'>
        <select value={categoryFilter} onChange={handleCategoryFilterChange}>
            <option value="">All Categories</option>
            {categoryOptions.map((category) => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
        </div>
        <div className="tags-container-filters">
            {tagOptions.map((tag) => (
              <div key={tag}>
                <input
                  type="checkbox"
                  id={tag}
                  value={tag}
                  checked={tagsFilter.includes(tag)}
                  onChange={handleTagFilterChange}
                />
                <label htmlFor={tag}>{tag}</label>
              </div>
            ))}
          </div>
          </>
          }
        </div>
      </div>
      <div className="recipes-list">
        {filteredRecipes.length === 0 && <p>No recipes found.</p>}
        {filteredRecipes.map((recipe) => (
          <div key={recipe.id} className="recipe-item">
            {/* <img src={recipe.image} alt={recipe.title} /> */}
            <img src={`http://localhost:3001${recipe.image}`} alt={recipe.title} />
            <div className="recipe-details">
             <div className='recipe-title-category'> 
             <h3>{recipe.title}</h3> 
             <p>{recipe.category}</p>
             </div>
              <p>{recipe.instructions}</p>
              <p>Tags: {recipe.tags && <span style={{color:"crimson"}}> {recipe?.tags.join(', ')}</span>}</p>
              <Link to={`/recipes/${recipe.id}`} style={{color: '#7cafff'}}>See More</Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Recipes;
