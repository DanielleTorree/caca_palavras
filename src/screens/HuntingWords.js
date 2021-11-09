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
import colors from '../colors.json';
const createGame = require('../creates/createGame');
import { Icon } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';

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
    const [words, setWords] = useState(
        [
            'ASTROS1', 'CARTOGRAF2', 'MAPOTECA3',
        ]
    )
    // Palavras com mais de 10 caracteres: CARTANAUTICA, AGULHAMAREAR
    // Todas as palavras: ASTROS, CARTOGRAFO, MAPOTECA, ATLANTICO, ESTRELA, NAVEGACAO,ATLAS, OCULO, PORTULANO, CARTANAUTICA, AGULHAMAREAR
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
            console.log("word of words: ", word, words);
            console.log("lettersSelected: ", lettersSelected);
            console.log("lettersSelected == word.length ", lettersSelected, word.length);

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

    const gerarNovoGame = () => {
        setState({
            game: new createGame(rows, columns, words, options),
        });
    }

    const { board } = state.game;

    return (
        <View style={styles.container}>
            <StatusBar backgroundColor={colors.cor_primaria} />
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
            <TouchableOpacity
                onPress={() => gerarNovoGame()}
            >
                <Text>Gerar Novo</Text>
            </TouchableOpacity>
            <View style={styles.containerPalavras}>
                <Text style={styles.palavraDoContainer}>{words[0]}</Text>
                <Text style={styles.palavraDoContainer}>{words[1]}</Text>
                <Text style={styles.palavraDoContainer}>{words[2]}</Text>
            </View>
            <View style={styles.containerPalavras}>
                <Text style={styles.palavraDoContainer}>{words[3]}</Text>
                <Text style={styles.palavraDoContainer}>{words[4]}</Text>
                <Text style={styles.palavraDoContainer}>{words[5]}</Text>
            </View>
            <View style={styles.containerPalavras}>
                <Text style={styles.palavraDoContainer}>{words[6]}</Text>
                <Text style={styles.palavraDoContainer}>{words[7]}</Text>
                <Text style={styles.palavraDoContainer}>{words[8]}</Text>
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
    header: {
        paddingBottom: 20,
        paddingTop: 20,
        width: width,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row'
    },
    textHeader: {
        width: width * 0.85,
        fontSize: 24,
        color: colors.white,
        fontWeight: 'bold',
        paddingLeft: 20
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
        marginBottom: 30,
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
        width: width * 0.92,
        padding: 3,
    },
    palavraDoContainer: {
        color: colors.white,
        fontSize: height < 800 ? 16 : 20,
        fontWeight: 'bold',
        width: height < 800 ? width * 0.3 : width * 0.2,
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