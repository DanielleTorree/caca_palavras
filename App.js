import React, { useState } from 'react';
import {
  View,
  Text,
  Dimensions,
  TouchableHighlight,
  TouchableOpacity
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import colors from './src/colors.json'

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

const App = () => {

  const [letra, setLetra] = useState([
    ['A', 'X', 'V', 'E', 'K', 'L'],
    ['E', 'S', 'C', 'O', 'L', 'A'],
    ['B', 'A', 'R', 'C', 'O', 'R'],
    ['O', 'G', 'I', 'R', 'B', 'A'],
    ['M', 'A', 'R', 'I', 'C', 'A'],
    ['S', 'U', 'E', 'S', 'U', 'M']
  ])

  const palavras = ['ESCOLA', 'BARCO', 'MAR', 'MUSEU']

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: colors.cor_primaria
      }}
    >
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <View
          style={{
            width: width * 0.92,
            height: height * 0.60,
            backgroundColor: colors.white,
            borderRadius: 10,
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'row',
            flexWrap: 'wrap'
          }}
        >
          {
            letra.map((valor, linha) => (
              valor.map((letra, coluna) => (
                <View
                  style={{
                    margin: -0.1
                  }}
                >
                  <TouchableOpacity
                    key={coluna}
                    onPress={() => alert(`letra: ${letra}; linha: ${linha}, coluna: ${coluna}`)}
                    style={{
                      width: width * 0.15,
                      height: height * 0.1,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                  >
                    <Text
                      style={{
                        color: colors.black,
                        fontSize: 28,
                      }}
                    >
                      {letra}
                    </Text>
                  </TouchableOpacity>
                </View>
              ))

            ))
          }
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            width: width * 0.8
          }}
        >
          <Text
            style={{
              color: colors.white,
              fontSize: 24,
              flexWrap: 'wrap',
              width: width * 0.5,
              fontWeight: 'bold'
            }}
          >
            {palavras[0]}
          </Text>

          <Text
            style={{
              color: colors.white,
              fontSize: 24,
              flexWrap: 'wrap',
              width: width * 0.5,
              fontWeight: 'bold'
            }}
          >
            {palavras[1]}
          </Text>
        </View>

        <View
          style={{
            flexDirection: 'row'
          }}
        >
          <Text
            style={{
              color: colors.white,
              fontSize: 24,
              flexWrap: 'wrap',
              width: width * 0.5,
              fontWeight: 'bold'
            }}
          >
            {palavras[2]}
          </Text>

          <Text
            style={{
              color: colors.white,
              fontSize: 24,
              flexWrap: 'wrap',
              width: width * 0.5,
              fontWeight: 'bold'
            }}
          >
            {palavras[3]}
          </Text>
        </View>
      </View>
    </View>
  );
}

export default App;