import React, { useState, useEffect } from "react";
import "./RecipeForm.css";

function RecipeForm({ onAddRecipe, editingRecipe, onUpdateRecipe }) {
  const [name, setName] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [instructions, setInstructions] = useState("");
  const [category, setCategory] = useState("");

  useEffect(() => {
    if (editingRecipe) {
      setName(editingRecipe.name);
      setIngredients(editingRecipe.ingredients);
      setInstructions(editingRecipe.instructions);
      setCategory(editingRecipe.category);
    }
  }, [editingRecipe]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const recipeData = { name, ingredients, instructions, category };
    if (editingRecipe) {
      onUpdateRecipe({ ...editingRecipe, ...recipeData });
    } else {
      onAddRecipe(recipeData);
    }
    setName("");
    setIngredients("");
    setInstructions("");
    setCategory("");
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
        <label htmlFor="category">Category:</label>
        <input
          type="text"
          id="category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="ingredients">Ingredients (comma-separated):</label>
        <textarea
          id="ingredients"
          value={ingredients}
          onChange={(e) => setIngredients(e.target.value)}
          placeholder="Enter ingredients separated by commas"
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
        {editingRecipe ? "Update Recipe" : "Add Recipe"}
      </button>
    </form>
  );
}

export default RecipeForm;
