import React from 'react';
import {DrawerItems} from 'react-navigation-drawer';
import {ScrollView, StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import {Gravatar} from 'react-native-gravatar';
import commonStyle from '../commonStyle';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/FontAwesome';

export default props =>{
    const logout = async () =>{

        delete axios.defaults.headers['Authorization']
        AsyncStorage.removeItem('@userData');
        props.navigation.navigate('AuthOrApp')

    }

    return(
        <ScrollView>
            <View style={styles.header}>
                <Text style={styles.title}>Burn Tasks</Text>
                <Gravatar style={styles.avatar}
                options={{
                    email:props.navigation.getParam('email'),
                    secure:true
                }}
                />
                <View style={styles.userInfo}>
                    <Text style={styles.name}>
                        {props.navigation.getParam('email')}
                    </Text>
                    <Text style={styles.email}>
                        {props.navigation.getParam('name')}
                    </Text>
                </View>
                <TouchableOpacity onPress={logout}>
                    <View style={styles.logoutIcon}>
                        <Icon name='sign-out' size={30} color="#800"/>
                    </View>
                </TouchableOpacity>
            </View>
            <DrawerItems {...props}/>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    header:{
        borderBottomWidth:1,
        borderColor:'#DDD'
    },
    title:{
        color:'#000',
        fontFamily:commonStyle.fontFamily,
        fontSize:30,
        paddingTop:30,
        padding:10
    },
    avatar:{
        width:60,
        height:60,
        borderWidth:3,
        borderRadius:30,
        margin:10,
        borderColor:'#0000'
    },
    userInfo:{
        marginLeft:10
    },
    name:{
        fontFamily:commonStyle.fontFamily,
        fontSize:20,
        marginBottom:5
        
    },
    email:{
        fontFamily:commonStyle.fontFamily,
        fontSize:15,
        color:commonStyle.colors.mainText,
        marginBottom:10
    },
    logoutIcon:{
        marginLeft:10,
        marginBottom:10
    }
})