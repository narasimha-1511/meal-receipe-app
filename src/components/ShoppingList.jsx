import React, { useState } from "react";
import "./ShoppingList.css";

function ShoppingList({ items, onClose }) {
  const [checkedItems, setCheckedItems] = useState({});

  const toggleItem = (item) => {
    setCheckedItems((prev) => ({ ...prev, [item]: !prev[item] }));
  };

  return (
    <div className="shopping-list-overlay">
      <div className="shopping-list-modal">
        <h2>Shopping List</h2>
        <ul>
          {items.map((item, index) => (
            <li key={index} className={checkedItems[item] ? "checked" : ""}>
              <input
                type="checkbox"
                checked={checkedItems[item] || false}
                onChange={() => toggleItem(item)}
              />
              {item}
            </li>
          ))}
        </ul>
        <button onClick={onClose} className="close-button">
          Close
        </button>
      </div>
    </div>
  );
}

export default ShoppingList;
