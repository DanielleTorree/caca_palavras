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
import sobre from '../images/sobre.png';
import imgJson from '../images/img.json';

const { width, height } = Dimensions.get("window");

const Home = () => {
    const navigation = useNavigation();

    return (
        <View 
            style={{ 
                flex: 1, 
                height: height, 
                backgroundColor: colors.white, 
                alignItems: 'center', 
                justifyContent: 'center' 
            }}
        >
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
                        marginVertical: 10
                    }}
                >
                    <Image
                        source={sobre}
                        style={{
                            height: 40,
                            width: 40,
                            marginTop: 10,
                        }}
                    />
                </TouchableOpacity>
            </View>
            <View 
                style={{ 
                    flex: 1, 
                    justifyContent: 'center', 
                    alignItems: 'center', 
                    marginTop: -110
                }}
            >
                <Text
                    style={{
                        textAlign: 'center',
                        color: colors.cinza,
                        fontSize: 20,
                        fontWeight: 'bold',
                        width: width * 0.8
                    }}
                >Bem-vindo ao Caça-Palavras do Museu Naval</Text>
                <LottieView
                    source={require('../animations/crown-premium-icon-animation.json')}
                    autoPlay
                    loop={true}
                    style={{ width: '60%', alignSelf: 'center' }}
                />
                <TouchableHighlight
                    activeOpacity={1}
                    underlayColor={colors.cor_secundaria}
                    onPress={() => navigation.navigate('HuntingWords')}
                    style={{
                        backgroundColor: colors.cor_primaria,
                        width: height < 800 ? 200 : 300,
                        height: height < 800 ? 45 : 68,
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
            </View>
            <View
                style={{
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginBottom: 20,
                }}
            >
                <Text
                    style={{
                        textAlign: 'center',
                        color: colors.cinza,
                        fontSize: 16,
                        fontWeight: 'bold',
                        marginHorizontal: 5
                    }}
                >By</Text>
                <Image 
                    source={{ uri: imgJson.logo_infsmart_fundo_branco }}
                    resizeMode="stretch"
                    style={{
                        width: '40%',
                        height: '120%',
                        borderRadius: 5,
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                />
            </View>
        </View>
    );
}

export default Home;