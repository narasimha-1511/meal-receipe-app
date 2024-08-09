import React from "react";
import { useDrag } from "react-dnd";

function MealItem({ id, name, day, onRemove }) {
  const [{ isDragging }, drag] = useDrag({
    type: "meal",
    item: { id, day },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  });

  return (
    <li ref={drag} style={{ opacity: isDragging ? 0.5 : 1 }}>
      {name}
      <button onClick={onRemove} className="remove-meal">
        Remove
      </button>
    </li>
  );
}

export default MealItem;
