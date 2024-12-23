import React from "react";
import "./Controles.css"

export default function Controles({ onReset, onUndo }) {
  return (
    <div className="Controles">
      <button className="Controler" onClick={onReset}>
        Reset
      </button>
      <button className="Controler" onClick={onUndo}>
        Undo
      </button>
    </div>
  );
}
