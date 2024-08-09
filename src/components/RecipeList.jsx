import React from "react";
import "./RecipeList.css";

function RecipeList({ recipes, onDeleteRecipe, onEditRecipe }) {
  return (
    <div className="recipe-list">
      {recipes.map((recipe) => (
        <div key={recipe.id} className="recipe-item">
          <h3>{recipe.name}</h3>
          <p>
            <strong>Category:</strong> {recipe.category}
          </p>
          <p>
            <strong>Ingredients:</strong> {recipe.ingredients}
          </p>
          <p>
            <strong>Instructions:</strong> {recipe.instructions}
          </p>
          <div className="recipe-actions">
            <button
              onClick={() => onEditRecipe(recipe.id)}
              className="edit-button"
            >
              Edit
            </button>
            <button
              onClick={() => onDeleteRecipe(recipe.id)}
              className="delete-button"
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default RecipeList;
