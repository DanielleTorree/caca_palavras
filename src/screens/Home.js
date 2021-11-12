import React from 'react';
import {
    View,
    Text,
    StatusBar,
    TouchableOpacity,
    Dimensions,
    TouchableHighlight,
    ImageBackground,
    Image
} from 'react-native';
import LottieView from 'lottie-react-native';
import colors from '../colors.json';
import { useNavigation } from '@react-navigation/native';
import iconeMarinha from '../images/logo_dphdm.png';

const { width, height } = Dimensions.get("window");

const Home = () => {
    const navigation = useNavigation();

    return (
        <View style={{ flex: 1, height: height }}>
            <StatusBar barStyle="light-content" backgroundColor={colors.cor_primaria} />
            <View
                style={{
                    width: width,
                    justifyContent: 'flex-end',
                    alignItems: 'flex-end',
                }}
            >
                <TouchableOpacity
                    onPress={() => navigation.navigate("CartazExposicao")}
                    style={{
                        height: 100,
                        width: 60,
                        marginHorizontal: 20,
                        marginVertical: 10
                    }}
                >
                    <Image
                        source={iconeMarinha}
                        style={{
                            height: 100,
                            width: 60,
                            marginHorizontal: -5,
                            marginVertical: 10
                        }}
                    />
                </TouchableOpacity>
            </View>
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', marginTop: -100 }}>

                <LottieView
                    source={require('../animations/play_hunting_words.json')}
                    autoPlay
                    loop={true}
                    style={{ width: '70%', alignSelf: 'center' }}
                />
                <TouchableHighlight
                    activeOpacity={1}
                    underlayColor={colors.cor_secundaria}
                    onPress={() => navigation.navigate('HuntingWords')}
                    style={{
                        backgroundColor: colors.cor_primaria,
                        width: height < 800 ? "45%" : '35%',
                        height: height < 800 ? "6%" : "6%",
                        borderRadius: height < 800 ? 23 : 30,
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}
                >
                    <Text
                        style={{
                            color: colors.white,
                            fontSize: 24,
                            fontWeight: 'bold'
                        }}
                    >Jogar</Text>
                </TouchableHighlight>
                {/* </View> */}
            </View>
            <Text style={{
                color: colors.cor_primaria,
                fontSize: 18,
                fontWeight: 'bold',
                textAlign: 'center',
                marginBottom: 10
            }}>By InfSmart</Text>
        </View>
    );
}

export default Home;