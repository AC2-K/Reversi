import { BoardHeight, BoardWidth, DXY } from "./Constants";

/**
 * @returns 置けるか?
 */
export function PlaceDiff(BoardState, Turn, row, col) {
    if (BoardState[row][col] !== "Empty") return [];

    let diffs = [];

    DXY.forEach((D) => {
        const [dx, dy] = D;

        let cr = row + dx;
        let cc = col + dy;

        let ndiffs = [];

        while (
            0 <= cr &&
            cr < BoardHeight &&
            0 <= cc &&
            cc < BoardWidth &&
            BoardState[cr][cc] === (Turn === "Black" ? "White" : "Black")
        ) {
            ndiffs.push([cr, cc]);
            cr += dx;
            cc += dy;
        }
        
        if (
            cr < 0 ||
            cr >= BoardHeight ||
            cc < 0 ||
            cc >= BoardWidth ||
             BoardState[cr][cc] === "Empty" ||
             ndiffs.length==0
        ) {
            return;
        }

        ndiffs.forEach(
            (item) => {
                diffs.push(item);
            }
        );
    });

    diffs.push([row, col]);

    return diffs.length === 1 ? [] : diffs;
}

export function PlaceStone(BoardState, SetBoardState, Turn,SetTurn, row, col) {
    const diffs = PlaceDiff(BoardState, Turn, row, col);
    
    let newBoardState = BoardState.map((row) => row.slice());

    console.log("DEBUG DIFFS", diffs);
    
    for (let i = 0; i < diffs.length; ++i) {
        console.log(diffs[i][0][0], diffs[i][1]);
        newBoardState[diffs[i][0]][diffs[i][1]] = Turn;
    }

    SetBoardState(newBoardState);
    SetTurn(Turn === "Black" ? "White" : "Black");
    
    return;
}
