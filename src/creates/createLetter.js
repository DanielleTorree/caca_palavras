function createLetter(letter, word, rows, columns){
    
    this.letter = letter.toUpperCase();
    this.word = (word)? [word] : [];
    this.rows = rows;
    this.columns = columns;
    this.isSelected = false;

    this.addNewWord = function(word){
        this.word.push(word);
    }

    this.setLetter = function(letter){
        this.letter = letter.toUpperCase();
    }

    this.setRow = function(rows){
        this.rows = rows;
    }

    this.setColumn = function(columns){
        this.columns = columns;
    }

    this.setIsSelected = function(isSelected){
        this.isSelected = isSelected;
    }

}

module.exports = createLetter;