import React from "react";
import { useDrop } from "react-dnd";
import MealItem from "./MealItem";
import "./MealPlanner.css";

function MealPlanner({ mealPlan, recipes, onRemoveFromMealPlan, onMoveMeal }) {
  const days = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  const renderDay = (day) => {
    const [{ isOver }, drop] = useDrop({
      accept: "meal",
      drop: (item) => onMoveMeal(item.id, item.day, day),
      collect: (monitor) => ({
        isOver: !!monitor.isOver(),
      }),
    });

    return (
      <div
        key={day}
        className={`day-plan ${isOver ? "drag-over" : ""}`}
        ref={drop}
      >
        <h3>{day}</h3>
        <ul>
          {mealPlan[day].map((recipeId) => {
            const recipe = recipes.find((r) => r.id === recipeId);
            return recipe ? (
              <MealItem
                key={recipeId}
                id={recipeId}
                name={recipe.name}
                day={day}
                onRemove={() => onRemoveFromMealPlan(day, recipeId)}
              />
            ) : null;
          })}
        </ul>
      </div>
    );
  };

  return <div className="meal-planner">{days.map(renderDay)}</div>;
}

export default MealPlanner;
