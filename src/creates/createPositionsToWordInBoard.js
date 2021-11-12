const random = require('../utils/random');
const createVerticalPositions = require('../createPositions/createVerticalPositions');
const createHorizontalPositions = require('../createPositions/createHorizontalPositions');
const createDiagonalRightPositions = require('../createPositions/createDiagonalRightPositions');
const createDiagonalLeftPositions = require('../createPositions/createDiagonalLeftPositions');

function createPositionsToWordInBoard(word, board, options, arrColums){
    let positions = [];
    
    const rowMax = board.length;
    //console.log("rowMax: ", rowMax);
    const columnMax = board[0].length;
    //console.log("columnMax: ", columnMax);
    
    const directions = directionsPositions(options);
    //console.log("directions: ", directions);

    const inverseWord = options.inverseWord && random.getBoolean();

    positions = random.getFunctions(directions)(word, rowMax, columnMax, inverseWord, arrColums);
    
    if(isPositionRepeated(positions, board, options.wordsCross))
        positions = createPositionsToWordInBoard(word, board, options);

    return positions;
}

function directionsPositions({wordInVertical, wordInHorizontal, wordDiagonalLeft, wordDiagonalRight}){
    let directions = [];
    
    if(wordInVertical)
        directions.push(createVerticalPositions);
    
    if(wordInHorizontal)
        directions.push(createHorizontalPositions);
    
    if(wordDiagonalLeft)
        directions.push(createDiagonalLeftPositions);
    
    if(wordDiagonalRight)
        directions.push(createDiagonalRightPositions);
    
    return directions;
}

function isPositionRepeated(positions, board, wordsCross){
    
    for({rows, columns, letter} of positions){

        if(board[rows][columns].word.length > 0)
            if(wordsCross)
                if(board[rows][columns].letter != letter)
                    return true;
            else
                return true;
    }
    
    return false;
}

module.exports = createPositionsToWordInBoard;




