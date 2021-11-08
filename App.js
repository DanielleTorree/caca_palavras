import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  Dimensions,
  TouchableHighlight,
  StatusBar,
  StyleSheet,
  TouchableOpacity
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import colors from './src/colors.json';
const createGame = require('./src/creates/createGame');
// import * as huntWord from 'hunting-words';

// Regras:

// Dificuldade
// Fácil: palavras escondidas na horizontal e vertical, sem palavras ao contrário
// Médio: palavras escondidas na horizontal, vertical e diagonal, sem palavras ao contrário
// Difícil: palavras escondidas na horizontal, vertical e diagonal, com palavras ao contrário

//Tamanho
// 6x6
// 9x9
// 12x12
// 15x15

const { width, height } = Dimensions.get("window");

const options = {
  wordsCross: false,
  inverseWord: true,
  wordInVertical: true,
  wordInHorizontal: true,
  wordDiagonalLeft: false,
  wordDiagonalRight: false
};

const App = () => {
  // const [rerender, setRerender] = useState(false);
  // const palavras = ['ESCOLA', 'BARCO', 'MAR', 'MUSEU'];
  // const [sentence, setSentence] = useState([]);
  // const [letra, setLetra] = useState([
  //   [
  //     { valor: 'A', selecionado: false, id: 0 },
  //     { valor: 'X', selecionado: false, id: 1 },
  //     { valor: 'V', selecionado: false, id: 2 },
  //     { valor: 'E', selecionado: false, id: 3 },
  //     { valor: 'K', selecionado: false, id: 4 },
  //     { valor: 'R', selecionado: false, id: 5 }
  //   ],
  //   [
  //     { valor: 'E', selecionado: false, id: 6 },
  //     { valor: 'S', selecionado: false, id: 7 },
  //     { valor: 'C', selecionado: false, id: 8 },
  //     { valor: 'O', selecionado: false, id: 9 },
  //     { valor: 'L', selecionado: false, id: 10 },
  //     { valor: 'A', selecionado: false, id: 11 }
  //   ],
  //   [
  //     { valor: 'O', selecionado: false, id: 12 },
  //     { valor: 'G', selecionado: false, id: 13 },
  //     { valor: 'I', selecionado: false, id: 14 },
  //     { valor: 'R', selecionado: false, id: 15 },
  //     { valor: 'B', selecionado: false, id: 16 },
  //     { valor: 'R', selecionado: false, id: 17 }
  //   ],
  //   [
  //     { valor: 'M', selecionado: false, id: 18 },
  //     { valor: 'A', selecionado: false, id: 19 },
  //     { valor: 'R', selecionado: false, id: 20 },
  //     { valor: 'I', selecionado: false, id: 21 },
  //     { valor: 'C', selecionado: false, id: 22 },
  //     { valor: 'A', selecionado: false, id: 23 }
  //   ],
  //   [
  //     { valor: 'S', selecionado: false, id: 24 },
  //     { valor: 'U', selecionado: false, id: 25 },
  //     { valor: 'E', selecionado: false, id: 26 },
  //     { valor: 'S', selecionado: false, id: 27 },
  //     { valor: 'U', selecionado: false, id: 28 },
  //     { valor: 'M', selecionado: false, id: 29 }
  //   ],
  //   [
  //     { valor: 'B', selecionado: false, id: 30 },
  //     { valor: 'A', selecionado: false, id: 31 },
  //     { valor: 'R', selecionado: false, id: 32 },
  //     { valor: 'C', selecionado: false, id: 33 },
  //     { valor: 'O', selecionado: false, id: 34 },
  //     { valor: 'L', selecionado: false, id: 35 }
  //   ],
  // ])

  // const letraSelecionada = (letraValor, linha, coluna, id) => {
  //   for (let l = 0; l < letra.length; l++) {
  //     for (let c = 0; c < letra.length; c++) {
  //       if (letraValor === letra[l][c].valor && l == linha && c == coluna) {
  //         letra[l][c].selecionado = !letra[l][c].selecionado;
  //         comparar(letraValor, linha, coluna, id);
  //         return;
  //       }
  //     }
  //   }
  //   setRerender(!rerender);
  // }

  // const comparar = (letraValor, linha, coluna, id) => {
  //   setSentence([...sentence, letraValor, linha, coluna, id]);
  // }

  const [rows, setRows] = useState(10);
  const [columns, setColumns] = useState(10);
  const [words, setWords] = useState(['ESCOLA1', 'BARCO2', 'MAR3', 'MUSEU4'])
  const [state, setState] = useState({
    game: new createGame(rows, columns, words, options),
  });

  const getLetterSelectedSameWord = (word) => {
    let lettersSelected = 0;
    state.game.board
      .filter((row) => {
        lettersSelected = lettersSelected + row.filter((el) => { 
          return el.word == word && el.isSelected; 
        }).length;
      });

    return lettersSelected;
  }

  const verifyFindWord = (words) => {
    for (let word of words) {
      let lettersSelected = getLetterSelectedSameWord(word);

      if (lettersSelected == word.length) {
        alert("Você achou a palavra: " + word);
      }
    }
  }

  const selectLetter = (item) => {
    let game = state.game;

    game.board[item.rows][item.columns].setIsSelected(!item.isSelected);

    setState({
      game: game
    });

    verifyFindWord(item.word);
  }

  const { board } = state.game;

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={colors.cor_primaria} />
      <View style={styles.containerCaixaExterna}>
        <View style={styles.containerCaixaInterna}>
          {board.map((row, indexRow) => (
              <View key={'row' + indexRow} style={{ backgroundColor: '#258' }}>
                {row.map((column, indexColumn) => (
                  <TouchableOpacity
                    key={'column' + indexColumn}
                    onPress={() => { selectLetter(column) }}
                    style={{
                      width: width * 0.095,
                      height: height * 0.079,
                      justifyContent: 'center',
                      alignItems: 'center',
                      backgroundColor: column.isSelected ? colors.cor_secundaria : '#FFF',
                    }}
                  >
                    <Text  style={styles.letraBotao}>
                      {column.letter}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            ))}

          {/* {
            letra.map((valor, linha) => (
              valor.map((letra, coluna) => (
                <View key={coluna}>
                  {rerender ? (
                    <TouchableHighlight
                      onPress={() => letraSelecionada(letra.valor, linha, coluna, letra.id)}
                      activeOpacity={1}
                      underlayColor={colors.cor_secundaria}
                      style={{
                        width: width * 0.15,
                        height: height * 0.1,
                        justifyContent: 'center',
                        alignItems: 'center',
                        backgroundColor: letra.selecionado ? colors.cor_secundaria : '#FFF0'
                      }}
                    >
                      <Text style={styles.letraBotao}>
                        {letra.valor}
                      </Text>
                    </TouchableHighlight>
                  ) : (
                    <TouchableHighlight
                      onPress={() => letraSelecionada(letra.valor, linha, coluna, letra.id)}
                      activeOpacity={1}
                      underlayColor={colors.cor_secundaria}
                      style={{
                        width: width * 0.15,
                        height: height * 0.1,
                        justifyContent: 'center',
                        alignItems: 'center',
                        backgroundColor: letra.selecionado ? colors.cor_secundaria : '#FFF0'
                      }}
                    >
                      <Text style={styles.letraBotao}>
                        {letra.valor}
                      </Text>
                    </TouchableHighlight>
                  )
                  }
                </View>
              ))
            ))
          } */}
        </View>
      </View>
      <View style={styles.containerPalavras}>
        <Text style={styles.palavraDoContainer}>{words[0]}</Text>
        <Text style={styles.palavraDoContainer}>{words[1]}</Text>
      </View>
      <View style={styles.containerPalavras}>
        <Text style={styles.palavraDoContainer}>{words[2]}</Text>
        <Text style={styles.palavraDoContainer}>{words[3]}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.cor_primaria,
    justifyContent: 'center',
    alignItems: 'center',
  },
  containerCaixaExterna: {
    justifyContent: 'center',
    alignItems: 'center',
    height: height * 0.7,
    marginBottom: 80
  },
  containerCaixaInterna: {
    width: width * 0.95,
    height: height * 0.70,
    backgroundColor: colors.white,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  letraBotao: {
    color: colors.black,
    fontSize: 24,
    fontWeight: 'bold'
  },
  containerPalavras: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: width * 0.8,
    padding: 5,
  },
  palavraDoContainer: {
    color: colors.white,
    fontSize: 24,
    fontWeight: 'bold'
  },

  wordsGroup: {
    paddingTop: 24,
    paddingBottom: 24,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
    maxWidth: "100%"
  },
  word: {
    fontSize: 30,
  },
  wordSelected: {
    fontSize: 30,
    textDecorationLine: 'line-through'
  },
  wordBoard: {
    paddingVertical: 10,
    paddingHorizontal: 5,
    backgroundColor: "#ccc",
    width: "100%"
  },
  row: {
    flexDirection: 'row',
  },
  letter: {

  },
  letterText: {
    paddingHorizontal: 5,
    fontSize: 30,
    lineHeight: 38,
    width: 35,
    height: 35,
    textAlignVertical: 'center',
    textAlign: 'center'
  },
  letterTextSelected: {
    backgroundColor: "#000",
    color: "#fff",
    paddingHorizontal: 5,
    fontSize: 30,
    lineHeight: 35,
    width: 35,
    height: 35,
    textAlignVertical: 'center',
    textAlign: 'center'
  }
})

export default App;