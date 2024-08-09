import React, { useState } from "react";
import "./RecipeForm.css";

function RecipeForm({ onAddRecipe }) {
  const [name, setName] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [instructions, setInstructions] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddRecipe({ name, ingredients, instructions });
    setName("");
    setIngredients("");
    setInstructions("");
  };

  return (
    <form onSubmit={handleSubmit} className="recipe-form">
      <div className="form-group">
        <label htmlFor="name">Recipe Name:</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="ingredients">Ingredients:</label>
        <textarea
          id="ingredients"
          value={ingredients}
          onChange={(e) => setIngredients(e.target.value)}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="instructions">Instructions:</label>
        <textarea
          id="instructions"
          value={instructions}
          onChange={(e) => setInstructions(e.target.value)}
          required
        />
      </div>
      <button type="submit" className="submit-button">
        Add Recipe
      </button>
    </form>
  );
}

export default RecipeForm;
