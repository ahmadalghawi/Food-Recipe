
import { useState } from 'react';
import Modal from 'react-modal';
import axios from 'axios';
import './AddRecipe.css';
Modal.setAppElement('#root');
const AddRecipe = () => {
  const [title, setTitle] = useState('');
  const [image, setImage] = useState('');
  const [previewUrl, setPreviewUrl] = useState(null);
  const [ingredients, setIngredients] = useState('');
  const [instructions, setInstructions] = useState('');
  const [tags, setTags] = useState([]);
  const [category, setCategory] = useState('');
  const [modalIsOpen, setIsOpen] = useState(false); 

  const tagOptions = ['hot', 'cold', 'chicken', 'fish', 'meat', 'vegetable', 'drink', 'sweet'];
  const categoryOptions = ['Breakfast', 'Lunch', 'Dinner', 'Snacks', 'Desserts'];

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);

    const reader = new FileReader();
    reader.onloadend = () => {
      setPreviewUrl(reader.result);
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleTagChange = (e) => {
    const { value, checked } = e.target;
    setTags((prevTags) =>
      checked ? [...prevTags, value] : prevTags.filter((tag) => tag !== value)
    );
  };

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
  };

  console.log('tags',tags);
  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append('title', title);
    formData.append('image', image);
    formData.append('ingredients', ingredients);
    formData.append('instructions', instructions);
    formData.append('tags', JSON.stringify(tags)); // Convert tags array to JSON string
    formData.append('category', category); // Add category to form data
    formData.append('email', localStorage.getItem('email'));
    console.log('formData',formData);
    try {
      const response = await axios.post('http://localhost:3001/api/recipes', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      console.log(response.data);
      if (response.data) {
        setTitle('');
        setIngredients('');
        setInstructions('');
        setPreviewUrl(null);
        setImage('');
        setTags([]);
        setCategory('');
        setIsOpen(true);
      }
    } catch (error) {
      console.error('There was an error adding the recipe!', error);
    }
  };

  return (
    <div className="add-recipe">
    <h2>Add you recipe!</h2>
    <form onSubmit={handleSubmit}>
      <div className='form-group'>   
        <label>Recipe Title:</label>
        <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
        />
      </div>
      <div className='form-group'>
      <label>Recipe Image:</label>
      <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            required
      />
      {previewUrl && <img src={previewUrl} alt="Image Preview" className="image-preview" />}
      </div>
      <div className="form-group">
          <label>Category:</label>
          <select value={category} onChange={handleCategoryChange} required>
            <option value="">Select a category</option>
            {categoryOptions.map((category) => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
        </div>
      <div className="form-group">
          <label>Tags:</label>
          <div className="tags-container">
            {tagOptions.map((tag) => (
              <div key={tag}>
                <input
                  type="checkbox"
                  id={tag}
                  value={tag}
                  checked={tags.includes(tag)}
                  onChange={handleTagChange}
                />
                <label htmlFor={tag}>{tag}</label>
              </div>
            ))}
          </div>
        </div>
      <div className='form-group'>
      <label>Ingredients:</label>
      <textarea
        placeholder="ingredients Text"
        value={ingredients}
        onChange={(e) => setIngredients(e.target.value)}
        required
      />
      </div>
      <div className='form-group'>
      <label>Instructions:</label>
      <textarea
        placeholder="Instructions Text"
        value={instructions}
        onChange={(e) => setInstructions(e.target.value)}
        required
      />
      </div>
      <button className='add-recipe-btn' type="submit">Add Recipe</button>
    </form>
    <Modal
        isOpen={modalIsOpen}
        className={'modal-add-recipe'}
        contentLabel="Add Recipe"
    >
    <h2>Recipe added successfully</h2>
    <button className='cancel-btn' onClick={() => setIsOpen(false)}>OK</button>
    </Modal>
  </div>
  );
};

export default AddRecipe;
