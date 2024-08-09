import React from "react";
import "./MealPlanner.css";

function MealPlanner({ mealPlan, recipes, onRemoveFromMealPlan }) {
  const days = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  return (
    <div className="meal-planner">
      {days.map((day) => (
        <div key={day} className="day-plan">
          <h3>{day}</h3>
          <ul>
            {mealPlan[day].map((recipeId) => {
              const recipe = recipes.find((r) => r.id === recipeId);
              return recipe ? (
                <li key={recipeId}>
                  {recipe.name}
                  <button
                    onClick={() => onRemoveFromMealPlan(day, recipeId)}
                    className="remove-meal"
                  >
                    Remove
                  </button>
                </li>
              ) : null;
            })}
          </ul>
        </div>
      ))}
    </div>
  );
}

export default MealPlanner;
