import React, { useState } from "react";
import RecipeForm from "./components/RecipeForm";
import RecipeList from "./components/RecipeList";
import CategoryFilter from "./components/CategoryFilter";
import "./App.css";

function App() {
  const [recipes, setRecipes] = useState([]);
  const [editingRecipe, setEditingRecipe] = useState(null);
  const [activeCategory, setActiveCategory] = useState("All");

  const addRecipe = (recipe) => {
    setRecipes([...recipes, { ...recipe, id: Date.now() }]);
  };

  const deleteRecipe = (id) => {
    setRecipes(recipes.filter((recipe) => recipe.id !== id));
  };

  const editRecipe = (id) => {
    const recipeToEdit = recipes.find((recipe) => recipe.id === id);
    setEditingRecipe(recipeToEdit);
  };

  const updateRecipe = (updatedRecipe) => {
    setRecipes(
      recipes.map((recipe) =>
        recipe.id === updatedRecipe.id ? updatedRecipe : recipe
      )
    );
    setEditingRecipe(null);
  };

  const filteredRecipes =
    activeCategory === "All"
      ? recipes
      : recipes.filter((recipe) => recipe.category === activeCategory);

  const categories = [
    "All",
    ...new Set(recipes.map((recipe) => recipe.category)),
  ];

  return (
    <div className="App">
      <header className="App-header">
        <h1>Recipe Builder and Meal Planner</h1>
      </header>
      <main className="App-main">
        <section className="recipe-form-section">
          <h2>{editingRecipe ? "Edit Recipe" : "Add New Recipe"}</h2>
          <RecipeForm
            onAddRecipe={addRecipe}
            editingRecipe={editingRecipe}
            onUpdateRecipe={updateRecipe}
          />
        </section>
        <section className="recipe-list-section">
          <h2>My Recipes</h2>
          <CategoryFilter
            categories={categories}
            activeCategory={activeCategory}
            onCategoryChange={setActiveCategory}
          />
          <RecipeList
            recipes={filteredRecipes}
            onDeleteRecipe={deleteRecipe}
            onEditRecipe={editRecipe}
          />
        </section>
      </main>
    </div>
  );
}

export default App;
