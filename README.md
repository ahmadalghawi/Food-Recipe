# Food-Recipe

A web application for managing and sharing recipes. Users can sign up, log in, add new recipes, update existing ones, and filter through recipes by title, category, and tags.

## Features

- User Authentication (Sign up, Login, Logout)
- Add, update, and delete recipes
- Filter recipes by title, category, and tags
- View individual recipe details
- Responsive design

## Technologies Used

- React
- React Router
- Axios
- Node.js
- Express
- JSON-based database

## Installation

### Prerequisites

- Node.js and npm installed on your machine
- Git installed on your machine

### Backend Setup

1. **Clone the repository**

    ```bash
    git clone https://github.com/ahmadalghawi/Food-Recipe.git
    cd recipe-app/backend
    ```

2. **Install dependencies**

    ```bash
    npm install
    ```

3. **Start the backend server**

    ```bash
    node server.js
    ```

    The backend server will start on `http://localhost:3001`.

### Frontend Setup

1. **Navigate to the frontend directory**

    ```bash
    cd ../Food-Recipes
    ```

2. **Install dependencies**

    ```bash
    npm install
    ```

3. **Start the frontend server**

    ```bash
    npm start
    ```

    The frontend server will start on `http://localhost:3000`.

## Usage

1. **Sign up**

    Create a new account by providing your email and password.

2. **Log in**

    Log in with your registered email and password.

3. **Add Recipe**

    Navigate to the "Add Recipe" page and fill out the form to add a new recipe.

4. **View and Filter Recipes**

    Browse the recipes on the "Recipes" page. Use the search bar and filters to find specific recipes.

5. **Edit and Delete Recipes**

    In your profile page, you can update or delete your recipes.

## File Structure

```plaintext
Food-Recipe/
├── backend/
│   ├── server.js
│   └── uploads/
|
├── Food-Recipes/
│   ├── src/
│   │   ├── components/
│   │   ├── assets/
│   │   ├── App.js
│   │   ├── index.js
│   │   └── utils/
│   ├── public/
│   └── package.json
├── README.md
└── package.json
