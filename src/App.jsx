import React, { useState, useEffect } from "react";
import RecipeForm from "./components/RecipeForm";
import RecipeList from "./components/RecipeList";
import CategoryFilter from "./components/CategoryFilter";
import MealPlanner from "./components/MealPlanner";
import ShoppingList from "./components/ShoppingList";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import "./App.css";

function App() {
  const [recipes, setRecipes] = useState([]);
  const [editingRecipe, setEditingRecipe] = useState(null);
  const [activeCategory, setActiveCategory] = useState("All");
  const [mealPlan, setMealPlan] = useState({
    Monday: [],
    Tuesday: [],
    Wednesday: [],
    Thursday: [],
    Friday: [],
    Saturday: [],
    Sunday: [],
  });

  const [showShoppingList, setShowShoppingList] = useState(false);

  useEffect(() => {
    const savedRecipes = localStorage.getItem("recipes");
    const savedMealPlan = localStorage.getItem("mealPlan");
    if (savedRecipes) setRecipes(JSON.parse(savedRecipes));
    if (savedMealPlan) setMealPlan(JSON.parse(savedMealPlan));
  }, []);

  useEffect(() => {
    localStorage.setItem("recipes", JSON.stringify(recipes));
  }, [recipes]);

  useEffect(() => {
    localStorage.setItem("mealPlan", JSON.stringify(mealPlan));
  }, [mealPlan]);

  const generateShoppingList = () => {
    const shoppingItems = {};
    Object.values(mealPlan)
      .flat()
      .forEach((recipeId) => {
        const recipe = recipes.find((r) => r.id === recipeId);
        if (recipe) {
          recipe.ingredients.split(",").forEach((ingredient) => {
            const trimmedIngredient = ingredient.trim();
            shoppingItems[trimmedIngredient] =
              (shoppingItems[trimmedIngredient] || 0) + 1;
          });
        }
      });
    return Object.entries(shoppingItems).map(
      ([item, count]) => `${item} (x${count})`
    );
  };

  const addRecipe = (recipe) => {
    setRecipes([...recipes, { ...recipe, id: Date.now() }]);
  };

  const deleteRecipe = (id) => {
    setRecipes(recipes.filter((recipe) => recipe.id !== id));
    // Remove the deleted recipe from the meal plan
    const updatedMealPlan = { ...mealPlan };
    Object.keys(updatedMealPlan).forEach((day) => {
      updatedMealPlan[day] = updatedMealPlan[day].filter(
        (mealId) => mealId !== id
      );
    });
    setMealPlan(updatedMealPlan);
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

  const addToMealPlan = (day, recipeId) => {
    setMealPlan((prevPlan) => ({
      ...prevPlan,
      [day]: [...prevPlan[day], recipeId],
    }));
  };
  const moveRecipe = (recipeId, fromDay, toDay) => {
    setMealPlan((prevPlan) => {
      const updatedPlan = { ...prevPlan };
      updatedPlan[fromDay] = updatedPlan[fromDay].filter(
        (id) => id !== recipeId
      );
      updatedPlan[toDay] = [...updatedPlan[toDay], recipeId];
      return updatedPlan;
    });
  };

  const removeFromMealPlan = (day, recipeId) => {
    setMealPlan((prevPlan) => ({
      ...prevPlan,
      [day]: prevPlan[day].filter((id) => id !== recipeId),
    }));
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="App">
        <header className="App-header">
          <h1>Recipe Builder and Meal Planner</h1>
        </header>
        <main className="App-main">
          <section className="recipe-management">
            <h2>{editingRecipe ? "Edit Recipe" : "Add New Recipe"}</h2>
            <RecipeForm
              onAddRecipe={addRecipe}
              editingRecipe={editingRecipe}
              onUpdateRecipe={updateRecipe}
            />
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
              onAddToMealPlan={addToMealPlan}
            />
          </section>
          <section className="meal-planning">
            <h2>Meal Planner</h2>
            <MealPlanner
              mealPlan={mealPlan}
              recipes={recipes}
              onRemoveFromMealPlan={removeFromMealPlan}
              onMoveMeal={moveRecipe}
            />
            <button
              onClick={() => setShowShoppingList(true)}
              className="generate-shopping-list"
            >
              Generate Shopping List
            </button>
          </section>
        </main>
        {showShoppingList && (
          <ShoppingList
            items={generateShoppingList()}
            onClose={() => setShowShoppingList(false)}
          />
        )}
      </div>
    </DndProvider>
  );
}

export default App;
