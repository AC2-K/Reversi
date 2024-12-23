import { useState } from "react";
import React from "react";
import "./Cell.css"
import "./Stone.css"

export default function Cell({ State, ClickHandler }) {
  return (
    <button className="Cell" onClick={ClickHandler}>
      <div className={`Stone${State}`} />
    </button>
  );
}
