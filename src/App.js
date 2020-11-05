import React from 'react'
import { View, Text } from 'react-native'
import Routes from './routes/index';
import AuthContext from './contexts/auth';
import {NavigationContainer} from '@react-navigation/native'
const App = () => {
    return (
    <NavigationContainer>
        <AuthContext.Provider value={{signed:true}}>
            <Routes/>
        </AuthContext.Provider>   
    </NavigationContainer> 
    );
}

export default App
