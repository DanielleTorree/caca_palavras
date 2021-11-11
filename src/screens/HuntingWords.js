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
import SoundPlayer from 'react-native-sound-player';

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
    const [rows, setRows] = useState(12);
    const [columns, setColumns] = useState(12);
    const [allWords, setAllWords] = useState(
        [
            'ASTROS', 'CARTOGRAFO', 'MAPOTECA', 'ATLANTICO', 
            'ESTRELA', 'NAVEGACAO', 'ATLAS', 'OCULO', 
            'PORTULANO', 'CARTANAUTICA', 'AGULHAMAREAR'
        ]
    );
    const [words, setWords] = useState(['ASTROS', 'OCULO', 'NAVEGACAO', 'ESTRELA']);
    // Palavras com mais de 10 caracteres: CARTANAUTICA, AGULHAMAREAR
    // Todas as palavras: ASTROS, CARTOGRAFO, MAPOTECA, ATLANTICO, ESTRELA, NAVEGACAO, ATLAS, OCULO, PORTULANO, CARTANAUTICA, AGULHAMAREAR
    const [stateGame, setStateGame] = useState({
        game: new createGame(rows, columns, words, options),
    });
    const [qtdPalavrasEncontradas, setQtdPalavrasEncontradas] = useState(0);
    const [palavrasEncontradas, setPalavrasEncontradas] = useState([
        { palavra: words[0], isFinded: false },
        { palavra: words[1], isFinded: false },
        { palavra: words[2], isFinded: false },
        { palavra: words[3], isFinded: false },
    ]);
    const [rerender, setRerender] = useState(false);

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
        setStateGame({
            game: new createGame(rows, columns, palavrasAleatorias, options),
        });
        setPalavrasEncontradas([
            { palavra: palavrasAleatorias[0], isFinded: false },
            { palavra: palavrasAleatorias[1], isFinded: false },
            { palavra: palavrasAleatorias[2], isFinded: false },
            { palavra: palavrasAleatorias[3], isFinded: false },
        ]);
    }

    function getRandomArbitrary(min, max) {
        return parseInt(Math.random() * (max - min) + min);
    }

    const getLetterSelectedSameWord = (word) => {
        let lettersSelected = 0;
        stateGame.game.board
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
                setQtdPalavrasEncontradas(qtdPalavrasEncontradas + 1);
                setRerender(!rerender);

                palavrasEncontradas.map((valor) => {
                    if (word == valor.palavra) {
                        valor.isFinded = !valor.isFinded;
                        setPalavrasEncontradas(palavrasEncontradas);
                        executaAudio();
                    }
                })
            }
        }
    }

    const executaAudio = () => {
        try {
            SoundPlayer.playSoundFile('success', 'mp3');
        } catch (e) {
            console.log("erro ao executar audio");
        }
    };

    const selectLetter = (item) => {
        let game = stateGame.game;

        game.board[item.rows][item.columns].setIsSelected(!item.isSelected);

        setStateGame({
            game: game
        });

        verifyFindWord(item.word);
    }

    const gerarNovoGame = () => {
        setQtdPalavrasEncontradas(0);
        gerarPalavrasAleatorias();
    }

    const { board } = stateGame.game;

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
                                marginLeft: 18
                            }}
                        >
                            <View style={styles.containerPalavras}>
                                {
                                    palavrasEncontradas.map(({ palavra, isFinded }) => (
                                        <Text
                                            key={palavra}
                                            style={{
                                                color: isFinded ? '#028' : colors.white,
                                                fontSize: height < 800 ? 16 : 20,
                                                fontWeight: 'bold',
                                                textDecorationLine: isFinded ? 'line-through' : 'none',
                                                textDecorationColor: colors.cor_secundaria,
                                                textDecorationStyle: 'dotted',
                                                width: width * 0.5,
                                            }}
                                        >{palavra}</Text>
                                    ))
                                }
                            </View>
                        </View>
                        <View style={{
                            width: width * 0.3,
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
                    <View style={{
                        marginTop: 20,
                        marginRight: 10,
                        width: width,
                        justifyContent: 'flex-end',
                        alignItems: 'center',
                        flexDirection: 'row',
                        height: height * 0.1,
                    }}>
                        <TouchableOpacity
                            onPress={() => navigation.navigate("Home")}
                            style={styles.buttonGoBack}
                        >
                            <Icon
                                name="x"
                                type="foundation"
                                sixe={26}
                                color={colors.white}
                                style={{ fontWeight: 'bold' }}
                            />
                        </TouchableOpacity>
                    </View>
                    <View style={{
                        paddingBottom: 30,
                        width: width * 0.9,
                        justifyContent: 'center',
                        alignItems: 'center',
                        height: height * 0.9,
                    }}>
                        <Text
                            style={{
                                color: colors.white,
                                fontSize: 24,
                                fontWeight: 'bold',
                                textAlign: 'center'
                            }}
                        >PARABÉNS! VOCÊ ACHOU TODAS AS PALAVRAS!</Text>
                        <LottieView
                            source={require('../animations/winner.json')}
                            autoPlay
                            loop={true}
                            style={{ width: '80%', alignSelf: 'center' }}
                        />
                    </View>
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
        paddingBottom: 8,
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
        padding: 3,
        marginBottom: 10,
        flexWrap: 'wrap',
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