import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import colors from './colors.json';

// screens
import Home from './screens/Home';
import HuntingWords from './screens/HuntingWords';

const Stack = createNativeStackNavigator();

const Routes = () => {
    return(
        <NavigationContainer initialRouteName="Home">
            <Stack.Navigator>
                <Stack.Screen 
                    name="Home" 
                    component={Home} 
                    options={{ 
                        headerShown: false
                    }}
                />
                <Stack.Screen 
                    name="HuntingWords" 
                    component={HuntingWords} 
                    options={{ 
                        headerShown: false
                    }}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default Routes;