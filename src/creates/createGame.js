const createBoard = require('./createBoard');


/**
 * 
 * @param {number} rows 
 * @param {number} columns 
 * @param {Array<string>} words 
 * @param {object{wordsCross:boolen, inverseWord:boolean, wordInVertical:boolean, wordInHorizontal:boolean, wordDiagonalLeft: boolen, wordDiagonalRight: boolen}} options 
 * @returns object
 */
function createGame(rows, columns, words, options){

    // console.log("rows: ", rows);
    // console.log("columns: ", columns);
    // console.log("words: ", words);
    // console.log("options: ", options);
    // console.log("!options || options.wordsCross != false", !options || options.wordsCross != false)
    // console.log("!options: ", !options);
    // console.log("options.wordsCross != false", options.wordsCross != false)

    options = {
        wordsCross: (!options || options.wordsCross != false), 
        inverseWord: (!options || options.inverseWord != false), 
        wordInVertical: (!options || options.wordInVertical != false), 
        wordInHorizontal: (!options || options.wordInHorizontal != false),  
        wordDiagonalLeft: (!options || options.wordDiagonalLeft != false),  
        wordDiagonalRight: (!options || options.wordDiagonalRight != false) 
    };

    this.board = new createBoard(rows, columns, words, options);
    this.words = words;
    this.rows = rows;
    this.columns = columns;
}

module.exports = createGame;






