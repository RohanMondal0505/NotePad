import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import HomeScreen from '../screen/HomeScreen';

const Stack = createNativeStackNavigator();

const StackNavigation = () => {
    return (
        <>
            <Stack.Navigator>
                <Stack.Screen name="Home" component={HomeScreen} />
            </Stack.Navigator>
        </>
    );
};

export default StackNavigation;
