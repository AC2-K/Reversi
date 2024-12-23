import React from "react";
import Cell from "./Cell";
import { BoardHeight, BoardWidth, dx, dy } from "../utility/Constants";
import "./Board.css"

export default function Board({ BoardState, SetBoardState, Turn, SetTurn }) {
    function ClickHandler(row, col) {
        if (BoardState[row][col] !== "Empty") return;
        let newBoardState = BoardState.map(row => row.slice());

        let isValid = false;
        for (let d = 0; d < dx.length; ++d){
            let cr = row + dx[d], cc = col + dy[d];
            let rs = [], cs = [];
            
            while (0 <= cr && cr < BoardHeight && 0 <= cc && cc < BoardWidth && BoardState[cr][cc] === (Turn === "Black" ? "White" : "Black")) {
                rs.push(cr);
                cs.push(cc);
                cr += dx[d];
                cc += dy[d];
            }

            if (cr < 0 || cr >= BoardHeight || cc < 0 || cc >= BoardWidth || BoardState[cr][cc] === "Empty" || rs.length === 0) {
                continue;   
            }
            isValid = true;
            for (let i = 0; i < rs.length; ++i){
                newBoardState[rs[i]][cs[i]] = Turn;
            }
        }

        if (!isValid) return;

        newBoardState[row][col] = Turn;
        SetBoardState(newBoardState);
        SetTurn(Turn === "Black" ? "White" : "Black");
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
