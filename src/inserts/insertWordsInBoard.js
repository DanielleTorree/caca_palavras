const createPositionsToWordInBoard = require('../creates/createPositionsToWordInBoard');

function insertWordsInBoard(board, words, options){

    for(let word of words){
        // console.log("word: ", word);
        // console.log("words: ", words);
        let positions = createPositionsToWordInBoard(word, board, options);
        
        let wordIndex = 0;
        
        for(const {rows, columns, letter} of positions){
            
            board[rows][columns].addNewWord(word);
            board[rows][columns].setLetter(letter);
            
            wordIndex++;
        }
    }

    return board;
}

module.exports = insertWordsInBoard;
