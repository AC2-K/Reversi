import { useState } from "react";
import "./App.css";
import Board from "./components/Board";
import { BoardHeight, BoardWidth } from "./utility/Constants";


function App() {
  const [BoardState, SetBoardState] = useState(
    Array(BoardHeight).fill(null).map(
      (_, row) => {
        return Array(BoardWidth).fill(null).map(
          (__, col) => {
              // console.log(row, col);
              if ((row === 3 && col === 3) || (row === 4 && col === 4)) {
                return "Black";
              } else if ((row === 3&& col == 4) || (row ===4 && col === 3)) {
                return "White";
              } else {
                return "Empty";
              }
          }
        )
      }
    )      
  );

  console.log(BoardState);
  const [Turn, SetTurn] = useState("Black");

  return <Board BoardState={BoardState} SetBoardState={SetBoardState} Turn={Turn} SetTurn={SetTurn} />;
}

export default App;
