const random = require('../utils/random');

function createVerticalPositions(word, rowMax, columnMax, inverseWord){
    let positions = [];
    
    let rows = random.getInt(0, (rowMax - word.length) - 1);
    let columns = random.getInt(0, columnMax - 1);

    let wordIndex = inverseWord ? word.length - 1 : 0;

    for(let i = 0; i < word.length; i++){
        positions.push({ rows, columns, letter: word[wordIndex]});
        rows++;

        wordIndex = inverseWord ? wordIndex - 1 : wordIndex + 1;
    }

    return positions;
}

module.exports = createVerticalPositions;