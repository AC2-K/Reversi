import { BoardHeight, BoardWidth, dx, dy } from "../utility/Constants";

/**
 * @returns 置けるか?
 */
export function PlaceDiff(BoardState, Turn, row, col) {
    if (BoardState[row][col] !== "Empty") return [], [];

    let rs = [],
        cs = [];

    for (let d = 0; d < dx.length; ++d) {
        let cr = row + dx[d],
            cc = col + dy[d];

        let rsd = [],
            csd = [];
        while (
            0 <= cr &&
            cr < BoardHeight &&
            0 <= cc &&
            cc < BoardWidth &&
            BoardState[cr][cc] === (Turn === "Black" ? "White" : "Black")
        ) {
            console.log(rsd, csd);
            rsd.push(cr);
            csd.push(cc);
            cr += dx[d];
            cc += dy[d];
        }

        if (
            cr < 0 ||
            cr >= BoardHeight ||
            cc < 0 ||
            cc >= BoardWidth ||
            BoardState[cr][cc] === "Empty" ||
            cr === row + dx[d]
        ) {
            continue;
        }

        rs = [...rs, rsd];
        cs = [...cs, csd];
    }

    return rs.length === 0 ? ([], []) : ([...rs, row], [...cs, col]);
}

export function PlaceStone(BoardState, SetBoardState, Turn, row, col) {
    const [rs, cs] = PlaceDiff(BoardState, Turn, row, col);
    let newBoardState = BoardState.map((row) => row.slice());

    for (let i = 0; i < rs.length; ++i) {
        newBoardState[rs[i]][cs[i]] = Turn;
    }

    SetBoardState(newBoardState);
    return;
}

