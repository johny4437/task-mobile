import React from 'react';
import {
    View,
    ActivityIndicator,
    StyleSheet
} from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';


const AuthOrApp = ({navigation})=>{

    React.useEffect(()=>{
        async function getUserData(){
            const userData = await AsyncStorage.getItem('@userData');
            if(userData != null){
                const data = JSON.parse(userData)
                axios.defaults.headers['Authorization'] = `Bearer ${data.token}`;
                navigation.navigate('TaskList', data)
            }else{
                navigation.navigate('Auth')
            }
            
        }
        getUserData()
    },[])
    return(
        <View style={styles.container}>
            <ActivityIndicator size="large" color="#FFF"/>
        </View>
    );
}

export default AuthOrApp;

const styles =  StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'center',
        alignContent:'center',
        backgroundColor:'#000'
    },
    
})