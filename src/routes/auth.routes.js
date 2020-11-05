import React from 'react';
import Auth from '../screens/Auth';

import {createStackNavigator} from '@react-navigation/stack';

const AuthStack = createStackNavigator();

const AuthRoutes = () =>(
    <AuthStack.Navigator
    screenOptions={{
        headerShown:false
    }}
    >
        <AuthStack.Screen name="Auth" component={Auth}/>
    </AuthStack.Navigator>
);

export default AuthRoutes;