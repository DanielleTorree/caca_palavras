const alphabet = [
    'A',
    'B',
    'C',
    'D',
    'E',
    'F',
    'G',
    'H',
    'I',
    'J',
    'K',
    'L',
    'M',
    'N',
    'O',
    'P',
    'Q',
    'R',
    'S',
    'T',
    'U',
    'V',
    'X',
    'W',
    'Y',
    'Z'
];
const random = require("../utils/random");
const createLetter = require('../creates/createLetter');

function initBoardWithRandomLetters(rows, columns) {
    let board = [];

    for(let i = 0; i < rows; i++){
        let boardRow = [];

        for(let j = 0; j < columns; j++){
            let letter = random.getString(alphabet);

            boardRow.push(new createLetter(letter, null, i, j));
        }

        board.push(boardRow);
    }

    // console.log('letter: ', board[0][0].letter)

    return board;
}

module.exports = initBoardWithRandomLetters;