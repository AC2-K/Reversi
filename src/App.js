import { useState } from "react";
import "./App.css";
import Board from "./components/Board";
import { BoardHeight, BoardWidth } from "./utility/Constants";
import Controles from "./components/ControleBar";
import { PlaceDiff, PlaceStone } from "./functions/Board"
import ResultBar from "./components/ResultBar";

function App() {
  const [BoardState, SetBoardState] = useState(
    Array(BoardHeight)
      .fill(null)
      .map((_, row) => {
        return Array(BoardWidth)
          .fill(null)
          .map((__, col) => {
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

  const [Turn, SetTurn] = useState("Black");

  const [BoardStateHistory, SetBoardStateHistory] = useState([]);

  const [blackScore, SetWhiteScore] = useState(2);
  const [whiteScore, SetWhiteCnt] = useState(2);


  function Reset() {
    SetBoardState(
      Array(BoardHeight)
        .fill(null)
        .map((_, row) => {
          return Array(BoardWidth)
            .fill(null)
            .map((__, col) => {
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
    SetBoardStateHistory([]);
    SetTurn("Black");
    return;
  }

  function Undo() {
    if (BoardStateHistory.length > 0) {
      SetBoardState(BoardStateHistory[BoardStateHistory.length - 1].map(row => row.slice()));
      let newBoardStateHistory = [...BoardStateHistory];
      newBoardStateHistory.pop();
      SetBoardStateHistory(newBoardStateHistory);
      SetTurn(Turn === "Black" ? "White" : "Black");
    }
  }

  function Skip() {
    SetBoardStateHistory([...BoardStateHistory.map(row => row.slice()), BoardState]);
    SetTurn(Turn === "Black" ? "White" : "Black");
  }


  return (
    <div className="App">
      <Board
        BoardState={BoardState}
        SetBoardState={(newBoardState) => {
          SetBoardStateHistory(prevHistory => [...prevHistory, BoardState.map(row => row.slice())]);
          SetBoardState(newBoardState.map(row => row.slice()));
          let newblackScore = 0, newwhiteScore = 0;
          newBoardState.slice().map((v, _) => {
            v.map(
              (s, __) => {
                if (s == "Black") ++newblackScore;
                else if (s == "White") ++newwhiteScore;
              }
            )
          });
          SetWhiteScore(newblackScore);
          SetWhiteCnt(newwhiteScore);
        }}
        Turn={Turn}
        SetTurn={SetTurn}
      />
      <Controles onReset={Reset} onUndo={Undo} onSkip={Skip} onResult={() => { }} />
      <ResultBar blackScore={blackScore} whiteScore={whiteScore} />
    </div>
  );
}

export default App;
