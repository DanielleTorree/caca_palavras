import React, { useState, useEffect } from 'react';
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
import colors from '../colors.json';
const createGame = require('../creates/createGame');
import { Icon } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
import LottieView from 'lottie-react-native';

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
    wordInHorizontal: false,
    wordDiagonalLeft: false,
    wordDiagonalRight: false
};

const HuntingWords = () => {
    const navigation = useNavigation();
    // const [rerender, setRerender] = useState(false);
    const [rows, setRows] = useState(12);
    const [columns, setColumns] = useState(12);
    const [allWords, setAllWords] = useState(
        [
            '11111111', '22222222', '333333333', '444444444', '55555555', '666666666', '77777777', '8888888', '99999999', '000000000', '100000000'
        ]
    );
    const [words, setWords] = useState(['111111111', '222222222', '3333333333', '444444444']);
    // Palavras com mais de 10 caracteres: CARTANAUTICA, AGULHAMAREAR
    // Todas as palavras: ASTROS, CARTOGRAFO, MAPOTECA, ATLANTICO, ESTRELA, NAVEGACAO,ATLAS, OCULO, PORTULANO, CARTANAUTICA, AGULHAMAREAR
    const [state, setState] = useState({
        game: new createGame(rows, columns, words, options),
    });
    const [qtdPalavrasEncontradas, setQtdPalavrasEncontradas] = useState(0);

    const gerarPalavrasAleatorias = () => {
        let palavrasAleatorias = [];
        let todosIndices = [];
        let aleatorio = 0;

        while (todosIndices.length < 4) {
            aleatorio = getRandomArbitrary(0, 11);

            if (todosIndices.indexOf(aleatorio) == -1) {
                todosIndices.push(aleatorio);
            }
        }

        for (let i = 0; i < 4; i++) {
            palavrasAleatorias.push(allWords[todosIndices[i]]);
        }

        setWords(palavrasAleatorias);
        setState({
            game: new createGame(rows, columns, palavrasAleatorias, options),
        });

        console.log(palavrasAleatorias)
    }

    function getRandomArbitrary(min, max) {
        return parseInt(Math.random() * (max - min) + min);
    }

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
            console.log("word of words: ", word, words);
            console.log("lettersSelected: ", lettersSelected);
            console.log("lettersSelected == word.length ", lettersSelected, word.length);

            if (lettersSelected == word.length) {
                alert("Você achou a palavra: " + word);
                setQtdPalavrasEncontradas(qtdPalavrasEncontradas + 1);
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

    const gerarNovoGame = () => {
        gerarPalavrasAleatorias();
    }

    const { board } = state.game;

    return (
        <View style={styles.container}>
            <StatusBar backgroundColor={colors.cor_primaria} />
            {qtdPalavrasEncontradas != 4 ? (
                <>
                    <View style={styles.header}>

                        <TouchableOpacity
                            onPress={() => navigation.goBack()}
                            style={styles.buttonGoBack}
                        >
                            <Icon
                                name='arrow-left'
                                type='font-awesome'
                                color={colors.white}
                                size={24}
                            />
                        </TouchableOpacity>

                        <Text
                            style={styles.textHeader}
                        >Caça Palavras</Text>
                    </View>
                    <View style={styles.containerCaixaExterna}>
                        <View style={styles.containerCaixaInterna}>
                            {board.map((row, indexRow) => (
                                <View key={'row' + indexRow} style={{ backgroundColor: '#258' }}>
                                    {row.map((column, indexColumn) => (
                                        <TouchableHighlight
                                            activeOpacity={1}
                                            underlayColor={colors.cor_secundaria}
                                            key={'column' + indexColumn}
                                            onPress={() => { selectLetter(column) }}
                                            style={{
                                                margin: -0.1,
                                                width: width * 0.075,
                                                height: height * 0.06,
                                                justifyContent: 'center',
                                                alignItems: 'center',
                                                backgroundColor: column.isSelected ? colors.cor_secundaria : colors.white,
                                            }}
                                        >
                                            <Text
                                                style={{
                                                    color: column.isSelected ? colors.white : colors.black,
                                                    fontSize: 24,
                                                    fontWeight: 'bold'
                                                }}
                                            >
                                                {column.letter}
                                            </Text>
                                        </TouchableHighlight>
                                    ))}
                                </View>
                            ))}
                        </View>
                    </View>
                    <View
                        style={{
                            justifyContent: 'center',
                            alignItems: 'center',
                            flexDirection: 'row',
                        }}
                    >
                        <View
                            style={{
                                //backgroundColor: '#ccc',
                                marginLeft: 18
                            }}
                        >
                            <View style={styles.containerPalavras}>
                                <Text style={styles.palavraDoContainer}>{words[0]}</Text>
                                <Text style={styles.palavraDoContainer}>{words[1]}</Text>
                            </View>
                            <View style={styles.containerPalavras}>
                                <Text style={styles.palavraDoContainer}>{words[2]}</Text>
                                <Text style={styles.palavraDoContainer}>{words[3]}</Text>
                            </View>
                        </View>
                        <View style={{
                            width: width * 0.3,
                            //backgroundColor: '#000',
                        }}>
                            <TouchableOpacity
                                onPress={() => gerarNovoGame()}
                                style={{
                                    justifyContent: 'center',
                                    alignItems: 'center'
                                }}
                            >
                                <Icon
                                    reverse
                                    name="rotate-right"
                                    type="font-awesome"
                                    size={24}
                                    color={colors.cor_secundaria}
                                />
                            </TouchableOpacity>
                        </View>

                    </View>
                </>
            ) : (
                <>
                <View style={styles.header}>
                    <TouchableOpacity
                        onPress={() => navigation.navigate("Home")}
                        style={styles.buttonGoBack}
                    >
                        <Icon 
                            name="x"
                            type="foundation"
                            sixe={24}
                            color={colors.white}
                            style={{fontWeight: 'bold'}}
                        />
                    </TouchableOpacity>
                </View>
                
                    {/* <LottieView
                        source={require('../animations/winner_hunting_words.json')}
                        autoPlay
                        loop={true}
                        style={{width: '70%', alignSelf: 'center'}}
                    /> */}
                </>
            )}

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
    header: {
        paddingBottom: 20,
        width: width,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row'
    },
    textHeader: {
        width: width * 0.85,
        fontSize: 28,
        color: colors.white,
        fontWeight: 'bold',
    },
    buttonGoBack: {
        width: width * 0.15,
        height: 56,
        justifyContent: 'center',
        alignItems: 'center',
    },
    containerCaixaExterna: {
        justifyContent: 'center',
        alignItems: 'center',
        height: height * 0.73,
        marginBottom: 10,
        backgroundColor: colors.white,
        borderRadius: 5,
        width: width * 0.93,
    },
    containerCaixaInterna: {
        width: width * 0.92,
        height: height * 0.72,
        backgroundColor: colors.white,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    containerPalavras: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: width * 0.6,
        //backgroundColor: '#f0f',
        padding: 3,
        marginBottom: 10,
    },
    palavraDoContainer: {
        color: colors.white,
        fontSize: height < 800 ? 14 : 20,
        fontWeight: 'bold',
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

export default HuntingWords;