import React, { useState } from "react";
import RecipeForm from "./components/RecipeForm";

function App() {
  const [recipes, setRecipes] = useState([]);

  const addRecipe = (recipe) => {
    setRecipes([...recipes, recipe]);
  };

  return (
    <div className="App">
      <h1>Recipe Builder and Meal Planner</h1>
      <RecipeForm onAddRecipe={addRecipe} />
      <div>
        <h2>Recipes:</h2>
        <ul>
          {recipes.map((recipe, index) => (
            <li key={index}>{recipe.name}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
