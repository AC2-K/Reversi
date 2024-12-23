import React from "react";
import "./ResultBar.css";

export default function ResultBar({ blackScore, whiteScore }) {
    console.log(blackScore, whiteScore);
  return (
    <div className="ResultBar">
      <div className="player-score black">
        <div className="player-icon black-icon"></div>
        <span>{blackScore}</span>
      </div>
      <div className="player-score white">
        <div className="player-icon white-icon"></div>
        <span>{whiteScore}</span>
      </div>
    </div>
  );
}