import React from "react";
import "./RecipeList.css";

function RecipeList({
  recipes,
  onDeleteRecipe,
  onEditRecipe,
  onAddToMealPlan,
}) {
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
            <select
              onChange={(e) => onAddToMealPlan(e.target.value, recipe.id)}
              className="add-to-meal-plan"
            >
              <option value="">Add to meal plan</option>
              <option value="Monday">Monday</option>
              <option value="Tuesday">Tuesday</option>
              <option value="Wednesday">Wednesday</option>
              <option value="Thursday">Thursday</option>
              <option value="Friday">Friday</option>
              <option value="Saturday">Saturday</option>
              <option value="Sunday">Sunday</option>
            </select>
          </div>
        </div>
      ))}
    </div>
  );
}

export default RecipeList;
