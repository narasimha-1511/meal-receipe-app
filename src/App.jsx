import React, { useState } from "react";
import RecipeForm from "./components/RecipeForm";
import RecipeList from "./components/RecipeList";
import "./App.css";

function App() {
  const [recipes, setRecipes] = useState([]);

  const addRecipe = (recipe) => {
    setRecipes([...recipes, { ...recipe, id: Date.now() }]);
  };

  const deleteRecipe = (id) => {
    setRecipes(recipes.filter((recipe) => recipe.id !== id));
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Recipe Builder and Meal Planner</h1>
      </header>
      <main className="App-main">
        <section className="recipe-form-section">
          <h2>Add New Recipe</h2>
          <RecipeForm onAddRecipe={addRecipe} />
        </section>
        <section className="recipe-list-section">
          <h2>My Recipes</h2>
          <RecipeList recipes={recipes} onDeleteRecipe={deleteRecipe} />
        </section>
      </main>
    </div>
  );
}

export default App;
