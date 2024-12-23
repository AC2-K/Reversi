import React from "react";
import "./ControleBar.css"
    
export default function ControlesBar({ onReset, onUndo, onSkip, onResult }) {
    return (
        <div className="Controles">
            <button className="Controler" onClick={onReset}>
                Reset
            </button>
            <button className="Controler" onClick={onUndo}>
                Undo
            </button>
            <button className="Controler" onClick={onSkip}>
                Skip
            </button>
            <button className="Controler" onClick={onResult}>
                Result
            </button>
        </div>
    );
}
