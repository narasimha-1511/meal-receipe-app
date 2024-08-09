import React from "react";
import "./RecipeList.css";

function RecipeList({ recipes, onDeleteRecipe }) {
  return (
    <div className="recipe-list">
      {recipes.map((recipe) => (
        <div key={recipe.id} className="recipe-item">
          <h3>{recipe.name}</h3>
          <p>
            <strong>Ingredients:</strong> {recipe.ingredients}
          </p>
          <p>
            <strong>Instructions:</strong> {recipe.instructions}
          </p>
          <button
            onClick={() => onDeleteRecipe(recipe.id)}
            className="delete-button"
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}

export default RecipeList;
