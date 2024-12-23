import React from "react";
import Cell from "./Cell";
import { BoardHeight, BoardWidth, dx, dy } from "../utility/Constants";
import "./Board.css"
import { PlaceDiff, PlaceStone } from "../utility/functions";

export default function Board({ BoardState, SetBoardState, Turn, SetTurn }) {
    function ClickHandler(row, col) {
        if (PlaceDiff(BoardState, Turn, row, col).length == 0) return;
        PlaceStone(BoardState, SetBoardState, Turn, SetTurn, row, col);
    }

    function render_row(row) {
        let cells = [];
        for (let col = 0; col < BoardWidth; ++col) {
            cells.push(
                <Cell
                    State={BoardState[row][col]}
                    ClickHandler={() => ClickHandler(row, col)}
                />
            );
        }
        return <div className="Row">{cells}</div>;
    }

    function render_board() {
        let rows = [];
        for (let row = 0; row < BoardHeight; ++row) {
            rows.push(render_row(row));
        }
        return <div className="Board">{rows}</div>;
    }

    return render_board();
}
