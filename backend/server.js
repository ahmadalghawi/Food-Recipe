const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');
const multer = require('multer');
const bcrypt = require('bcrypt');
const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());

const filePath = path.join(__dirname, 'recipes.json');
const uploadsDir = path.join(__dirname, 'uploads');
const { v4: uuidv4 } = require('uuid');

// Multer configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadsDir);
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  }
});

const upload = multer({ storage: storage });

// Serve static files from the 'uploads' directory
app.use('/uploads', express.static(uploadsDir));

// Route to handle recipe submission with image upload
app.post('/api/recipes', upload.single('image'), (req, res) => {
    const { title, ingredients, instructions, email, tags, category } = req.body;
    const image = req.file ? req.file.filename : null;
    const newRecipe = {
        id: Date.now().toString(),
        title,
        ingredients,
        instructions,
        image: image ? `/uploads/${image}` : null,
        email,
        tags: JSON.parse(tags), // Parse the tags JSON string back into an array
        category
      };

  // Write the new recipe to the JSON file
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      return res.status(500).send('Error reading file');
    }

    const recipes = JSON.parse(data);
    recipes.push(newRecipe);

    fs.writeFile(filePath, JSON.stringify(recipes, null, 2), (err) => {
      if (err) {
        return res.status(500).send('Error writing file');
      }
      res.status(201).send('Recipe added');
    });
  });
});

// Route to fetch recipes data
app.get('/api/recipes', (req, res) => {
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      return res.status(500).send('Error reading file');
    }

    const recipes = JSON.parse(data);
    res.json(recipes);
  });
});

app.get('/api/recipes/:id', (req, res) => {
    const recipeId = req.params.id;
  
    fs.readFile(filePath, 'utf8', (err, data) => {
      if (err) {
        return res.status(500).send('Error reading file');
      }
  
      const recipes = JSON.parse(data);
      const recipe = recipes.find((r) => r.id === recipeId);
  
      if (!recipe) {
        return res.status(404).send('Recipe not found');
      }
  
      res.json(recipe);
    });
  });

////////////// ----Update Recipe & Delete Recipe----- //////////////

// Endpoint to update a recipe
app.put('/api/recipes/:id', (req, res) => {
    const recipeId = req.params.id;
    const updatedRecipe = req.body;
  
    fs.readFile(filePath, 'utf8', (err, data) => {
      if (err) {
        return res.status(500).send('Error reading file');
      }
  
      let recipes = JSON.parse(data);
      recipes = recipes.map(recipe => (recipe.id === recipeId ? { ...recipe, ...updatedRecipe } : recipe));
  
      fs.writeFile(filePath, JSON.stringify(recipes, null, 2), (err) => {
        if (err) {
          return res.status(500).send('Error writing file');
        }
        res.status(200).send('Recipe updated');
      });
    });
  });
  
// Endpoint to delete a recipe

app.delete('/api/recipes/:id', (req, res) => {
    const recipeId = req.params.id;
  
    fs.readFile(filePath, 'utf8', (err, data) => {
      if (err) {
        return res.status(500).send('Error reading file');
      }
  
      let recipes = JSON.parse(data);
      const recipe = recipes.find(recipe => recipe.id === recipeId);
  
      if (!recipe) {
        return res.status(404).send('Recipe not found');
      }
  
      recipes = recipes.filter(recipe => recipe.id !== recipeId);
  
      fs.writeFile(filePath, JSON.stringify(recipes, null, 2), (err) => {
        if (err) {
          return res.status(500).send('Error writing file');
        }
  
        // Delete the image file from the uploads folder
        const imagePath = path.join(uploadsDir, path.basename(recipe.image));
        fs.unlink(imagePath, (err) => {
          if (err) {
            console.error('Error deleting image file:', err);
          } else {
            console.log('Image file deleted:', imagePath);
          }
        });
  
        res.status(200).send('Recipe deleted');
      });
    });
  });

/////////---------------- Backend API for fetching recipes by email -----------------------

app.get('/api/user-recipes', (req, res) => {
    const userEmail = req.query.email;
  
    if (!userEmail) {
      return res.status(400).send('Email query parameter is required');
    }
  
    fs.readFile(filePath, 'utf8', (err, data) => {
      if (err) {
        return res.status(500).send('Error reading file');
      }
  
      const recipes = JSON.parse(data);
      const userRecipes = recipes.filter(recipe => recipe.email === userEmail);
  
      res.json(userRecipes);
    });
  });
  

  
////////////////////////////////////////////////////for signup and login////////////

const usersFilePath = path.join(__dirname, 'users.json');

// Helper function to read users file
const readUsersFile = () => {
  const data = fs.readFileSync(usersFilePath, 'utf8');
  return JSON.parse(data);
};

// Helper function to write users file
const writeUsersFile = (users) => {
  fs.writeFileSync(usersFilePath, JSON.stringify(users, null, 2));
};

// Signup route
app.post('/api/signup', async (req, res) => {
  const { email, password } = req.body;
  const users = readUsersFile();

  const userExists = users.some(user => user.email === email);
  if (userExists) {
    return res.status(400).send('User already exists');
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  users.push({ email, password: hashedPassword });
  writeUsersFile(users);

  res.status(201).send('User registered successfully');
});

// --------------------------------------------------------

// Login route
app.post('/api/login', async (req, res) => {
    const { email, password } = req.body;
    const users = readUsersFile();
  
    const user = users.find(user => user.email === email);
    if (!user) {
      return res.status(200).send('Invalid email or password');
    }
  
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(200).send('Invalid email or password');
    }
  
    res.status(200).send({  message: 'Login successful',
                            email: user.email });  
     });


///////////////////////////////////////////////////////////////////////////////////////


app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
