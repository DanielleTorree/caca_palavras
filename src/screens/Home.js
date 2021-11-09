import React from 'react';
import {
    View,
    Text,
    StatusBar,
    TouchableOpacity,
    Dimensions,
    TouchableHighlight
} from 'react-native';
import LottieView from 'lottie-react-native';
import colors from '../colors.json';
import { useNavigation } from '@react-navigation/native';

const { width, height } = Dimensions.get("window");

const Home = ({}) => {
    const navigation = useNavigation();

    return(
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <StatusBar barStyle="light-content" backgroundColor={colors.cor_primaria}/>
            <LottieView
                source={require('../animations/play_hunting_words.json')}
                autoPlay
                loop={true}
                style={{width: '70%', alignSelf: 'center'}}
            />
            <TouchableHighlight
                activeOpacity={1}
                underlayColor={colors.cor_secundaria}
                onPress={() => navigation.navigate('HuntingWords')}
                style={{
                    backgroundColor: colors.cor_primaria,
                    width: height < 800 ? "45%" : '35%',
                    height: height < 800 ? "6%" :"6%",
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
    );
}

export default Home;