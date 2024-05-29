import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Modal from 'react-modal';
import axios from 'axios'
import './MyProfile.css'
Modal.setAppElement('#root');

const MyProfile = () => {

    const [recipes, setRecipes] = useState([]);
    const [editingRecipe, setEditingRecipe] = useState(null);
    const [newTitle, setNewTitle] = useState('');
    const [newImage, setNewImage] = useState('');
    const [newIngredients, setNewIngredients] = useState('');
    const [newInstructions, setNewInstructions] = useState('');
    const [newTags, setNewTags] = useState([]);
    const [newCategory, setNewCategory] = useState('');
    const [modalIsOpen, setIsOpen] = useState(false);
    const [modalIsOpenDelete, setIsOpenDelete] = useState(false);
    
    const email = localStorage.getItem('email');
    const tagOptions = ['hot', 'cold', 'chicken', 'fish', 'meat', 'vegetable', 'drink', 'sweet'];
    const categoryOptions = ['Breakfast', 'Lunch', 'Dinner', 'Snacks', 'Desserts'];
    

    useEffect(() => {
        const fetchUserRecipes = async () => {
          try {
            const response = await axios.get(`http://localhost:3001/api/user-recipes?email=${email}`);
            setRecipes(response.data);
          } catch (error) {
            console.error('Error fetching user recipes:', error);
          }
        };
    
        if (email) {
          fetchUserRecipes();
        }
      }, [email]);

      // Delete Recipe-------
      const handleDelete = async (id) => {
        try {
          await axios.delete(`http://localhost:3001/api/recipes/${id}`);
          console.log('Recipe deleted successfully!');
          setRecipes(recipes.filter(recipe => recipe.id !== id));
          setIsOpenDelete(false);
        } catch (error) {
          console.error('Error deleting recipe:', error);
        }
      };
    
// Update Recipe------
    const handleEdit = (recipe) => {
        setIsOpen(true);
        setEditingRecipe(recipe.id);
        setNewTitle(recipe.title);
        setNewImage(recipe.image);
        setNewIngredients(recipe.ingredients);
        setNewInstructions(recipe.instructions);
        setNewTags(recipe.tags || []);
        setNewCategory(recipe.category || '');
    };

    const handleTagChange = (e) => {
        const { value, checked } = e.target;
        setNewTags((prevTags) =>
          checked ? [...prevTags, value] : prevTags.filter((tag) => tag !== value)
        );
      };

      const handleCategoryChange = (e) => {
        setNewCategory(e.target.value);
      };

    const handleUpdate = async () => {
        try {
        const updatedRecipe = { title: newTitle, ingredients: newIngredients, instructions: newInstructions, tags: newTags, category: newCategory ,image: newImage, email };
        await axios.put(`http://localhost:3001/api/recipes/${editingRecipe}`, updatedRecipe);
        setRecipes(recipes.map(recipe => (recipe.id === editingRecipe ? updatedRecipe : recipe)));
        setEditingRecipe(null);
        setNewTitle('');
        setNewIngredients('');
        setNewInstructions('');
        setNewTags([]);
        setNewCategory('');
        setNewImage('');
        setIsOpen(false);
        } catch (error) {
        console.error('Error updating recipe:', error);
        }
    };


  return (
    <div className="myprofile">
      <div className="myprofile-header">
        <h2>My List</h2>
        <Link to="/add-recipe"><button className="add-recipe-btn">Add Recipe</button></Link>
      </div>
      <div className="recipes-list">
        {recipes.length === 0 && <p>No recipes found.</p>}
        {recipes.map((recipe) => (
          <div key={recipe.id} className="recipe-item">
            {/* <img src={recipe.image} alt={recipe.title} /> */}
            <img src={`http://localhost:3001${recipe.image}`} alt={recipe.title} />
            <div className="profile-recipe-details">
            <div className='recipe-title'> 
            <div className='recipe-title-category'>
              <h3>{recipe.title}</h3>
              <p>{recipe.category}</p>
              </div>
              <p>{recipe.instructions}</p>
              <p>Tags: {recipe.tags && <span style={{color:"crimson"}}> {recipe?.tags.join(', ')}</span>}</p>
              </div>
              <div className="recipe-actions">
                <button className="update-btn" onClick={() => handleEdit(recipe)}>Update</button>
                <button className="delete-btn" onClick={() => setIsOpenDelete(true)}>Delete</button>
                <Modal
                isOpen={modalIsOpenDelete}
                className={'modal-delete'}
                contentLabel="Delete Recipe"
                >
                <h2>Delete Recipe</h2>
                <p>Are you sure you want to delete this recipe?</p>
                <div className='btns-delete'>
                <button className='cancel-btn' onClick={() => setIsOpenDelete(false)}>Cancel</button>
                <button className='delete-btn' onClick={() => handleDelete(recipe.id)}>Delete</button>
                </div>
                </Modal>
                <Modal
                isOpen={modalIsOpen}
                className={'modal-update'}
                contentLabel="Update Recipe"
                >
                <h2>Update Recipe</h2>
                <div className='update-form'>
                <img src={`http://localhost:3001${newImage}`} alt={newTitle} />
                <div className='form-group-update'>
                  <label htmlFor="title">Recipe Title:</label>   
                  <input
                    type="text"
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    placeholder="New Title"
                  />
                  </div>
                  <div className='form-group-update'>
                  <label htmlFor="ingredients">Recipe Ingredients:</label>
                  <textarea
                    value={newIngredients}
                    onChange={(e) => setNewIngredients(e.target.value)}
                    placeholder="New Ingredients"
                  />
                  </div>
                  <div className='form-group-update'>
                  <label htmlFor="instructions">Recipe Instructions:</label>
                  <textarea
                    value={newInstructions}
                    onChange={(e) => setNewInstructions(e.target.value)}
                    placeholder="New Instructions"
                  />
                  </div>
                  <div className="form-group-update">
                      <label>Category:</label>
                      <select value={newCategory} onChange={handleCategoryChange}>
                        <option value={newCategory}>Select a category</option>
                        {categoryOptions.map((category) => (
                          <option key={category} value={category}>{category}</option>
                        ))}
                      </select>
                    </div>
                  <div className='form-group-update'>
                      <label>Tags:</label>
                      <div className="tags-container">
                        {tagOptions.map((tag) => (
                          <div key={tag}>
                            <input
                              type="checkbox"
                              id={tag}
                              value={tag}
                              checked={newTags.includes(tag)}
                              onChange={handleTagChange}
                            />
                            <label htmlFor={tag}>{tag}</label>
                          </div>
                        ))}
                      </div>
                    </div>
                  <div className='form-group-btn'>
                  <button onClick={handleUpdate}>Update Recipe</button>
                  <button onClick={() => setIsOpen(false)}>Cancle</button>
                  </div>
                </div>
            </Modal>
            </div>
            </div>
            
          </div>
        ))}
      </div>
    </div>
  )
}

export default MyProfile