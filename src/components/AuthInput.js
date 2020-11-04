import React from 'react';

import {View, Text, TextInput, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';


const AuthInput = ({style, icon, placeholder, onChangeText, value, secureTextEntry})=>{
    return (
        <View style={[styles.container, style]}>
            <Icon name={icon} size={20} style={styles.icon} />
            <TextInput 
            placeholder={placeholder}
            onChangeText={onChangeText}
            value={value}
            style={styles.input}
            secureTextEntry={secureTextEntry}
            />
        </View>
    )
}
export default AuthInput;

const styles = StyleSheet.create({
    container:{
        width:'100%',
        height:40,
        backgroundColor:'#EEE',
        borderRadius:20,
        flexDirection:'row',
        alignItems:'center'
    },
    icon:{
        color:'#333',
        marginLeft:20,
    },
    input:{
        marginLeft:20,
        width:'70%'
    }

})