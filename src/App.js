import { useState } from "react";
import "./App.css";
import Board from "./components/Board";
import { BoardHeight, BoardWidth } from "./utility/Constants";
import Controles from "./components/Controles";

function App() {
  const [BoardState, SetBoardState] = useState(
    Array(BoardHeight)
      .fill(null)
      .map((_, row) => {
        return Array(BoardWidth)
          .fill(null)
          .map((__, col) => {
            // console.log(row, col);
            if ((row === 3 && col === 3) || (row === 4 && col === 4)) {
              return "Black";
            } else if ((row === 3 && col == 4) || (row === 4 && col === 3)) {
              return "White";
            } else {
              return "Empty";
            }
          });
      })
  );


  console.log(BoardState);
  // console.log(BoardState);
  const [Turn, SetTurn] = useState("Black");

  const [BoardStateHistory, SetBoardStateHistory] = useState([]);

  function Reset() {
    // SetBoardState([...BoardStateHistory.at(BoardStateHistory.length - 1)]);
    // BoardState.pop();
    return;
  }

  function Undo() {
    if (BoardStateHistory.length > 0) {
      SetBoardState(BoardStateHistory[BoardStateHistory.length - 1].map(row => row.slice()));
      let newBoardStateHistory = [...BoardStateHistory];
      newBoardStateHistory.pop();
      SetBoardStateHistory(newBoardStateHistory);
      SetTurn(Turn == "Black" ? "White" : "Black");
    }
  }

  return (
    <div className="App">
      <Board
        BoardState={BoardState}
        SetBoardState={(newBoardState) => {
          console.log("OldBoardState", BoardState);
          console.log("NewBoardState", newBoardState);
          SetBoardStateHistory(prevHistory => [...prevHistory, BoardState.map(row => row.slice())]);
          SetBoardState(newBoardState.map(row => row.slice()));
        }}
        Turn={Turn}
        SetTurn={SetTurn}
      />
      <Controles onReset={Reset} onUndo={Undo} />
    </div>
  );
}

export default App;
