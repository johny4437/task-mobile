import React from 'react';
import TaskList from '../screens/TaskList';
import Singin from '../screens/Singin';
import {createStackNavigator} from '@react-navigation/stack';

const AppStack = createStackNavigator();

const AppRoutes = () =>(
    <AppStack.Navigator
    screenOptions={{
        headerShown:false
    }}
    >
        <AppStack.Screen name="TaskList" component={TaskList}/>
    </AppStack.Navigator>
);

export default AppRoutes;