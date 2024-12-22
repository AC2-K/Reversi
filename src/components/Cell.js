import { useState } from "react";
import React from "react";
import "./Cell.css"

export default function Cell({ State, ClickHandler }) {
  return (
    <button className="Cell" onClick={ClickHandler}>
      <div className={`Stone${State}`} />
    </button>
  );
}
