import React,{useContext} from 'react'
import { StyleSheet, Text, View, TextInput, ImageBackground, TouchableOpacity, Alert} from 'react-native'

import commonStyles from '../commonStyle';
import AuthInput from '../components/AuthInput';
import {server, showError, showSuccess} from '../common';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';


const Auth = ({navigation}) => {
    const [values, setValues] =  React.useState({
        name:'',
        email:'zuckvs@gmail.com',
        password:'123456',
        confirmPassword:'',
        stageNew:false
    });

    const { name, email, password, confirmPassword, stageNew } =  values;
    const singinOrSingup = () =>{
        if(stageNew){
            singup()
        }else{
            singin()
        }
    }
    const singup = async () =>{
        try {
            await axios.post(`http://192.168.0.108:3300/singup`,{
                name:name,
                email:email,
                password:password
            })
            showSuccess('Usuário Cadastrado');
            setValues({stageNew:true})
        } catch (error) {
            showError(error)
        }
    }

    const user = {
        email:email,
        password:password
    }

    const singin = async() =>{
        const response = await axios.post('http://192.168.0.108:3300/singin',{
            email:email,
            password:password
        })
        axios.defaults.headers['Authorization'] = `Bearer ${response.data.token}`;
        navigation.navigate('TaskList')
    }



    const validations = [];

    validations.push(email && email.includes('@'));
    validations.push(password && password.length >= 6);

    if(stageNew){
        validations.push(name && name.trim().length >= 3);
        validations.push(confirmPassword);
        validations.push(password === confirmPassword);
    }

    const validForm = validations.reduce((t, a)=> t && a);

    return (
        <ImageBackground
        source={require('../../assets/assets/imgs/login.jpg')}
        style={styles.background}
        >
            <Text style={styles.title}>Burn Tasks</Text>
            <View style={styles.formContainer}>
                <Text style={styles.subtitle}>
                    {stageNew ? 'Crie a sua conta' : 'Informe seus dados'}
                </Text>
                { stageNew &&
                    <AuthInput
                    icon='user' 
                    style={styles.input}
                    placeholder="Nome..." 
                    onChangeText={name => setValues({...values,name:name})}
                    value={name}
                    />
                
                }
                <AuthInput
                icon='at' 
                style={styles.input}
                placeholder="Email" 
                value={email}
                onChangeText={email => setValues({...values,email:email})}
                />
                <AuthInput
                icon='lock' 
                style={styles.input}
                placeholder="Senha" 
                value={password}
                onChangeText={text => setValues({...values, password:text})}
                secureTextEntry={true}
                />{
                    stageNew &&
                    <AuthInput
                    icon='lock' 
                    style={styles.input}
                    placeholder="Digite a senha Novamente" 
                    value={confirmPassword}
                    onChangeText={text => setValues({...values, confirmPassword:text})}
                    secureTextEntry={true}
                />
                }
                <TouchableOpacity onPress={singinOrSingup}
                disabled={!validForm}
                >
                    <View style={[styles.button, validForm ? {} : {backgroundColor:'#AAA'}]}>
                        { stageNew ?
                        <Text style={styles.buttonText}>Registrar</Text> :
                        <Text style={styles.buttonText}>Entrar</Text>
                        }
                    </View>
                </TouchableOpacity>
            </View>
            <TouchableOpacity style={{padding:10}}
            onPress={()=>setValues({stageNew:!stageNew})}>
                <Text style={styles.buttonText}>
                    {stageNew  ? 'Já possui conta?':'Ainda não possui conta? Registrar'}
                </Text>
            </TouchableOpacity>
        </ImageBackground>
    )
}

export default Auth;

const styles = StyleSheet.create({
    background:{
        flex:1,
        width:'100%',
        alignItems:'center',
        justifyContent:'center'
    },
    title:{
        fontFamily:commonStyles.fontFamily,
        color:commonStyles.colors.secondary,
        fontSize:70,
        marginBottom:10

    },
    subtitle:{
        fontFamily:commonStyles.fontFamily,
        color:'#FFF',
        fontSize:20,
        textAlign:'center',
        marginBottom:10
    },
    formContainer:{
        backgroundColor:'rgba(0,0,0,0.8)',
        padding:20,
        width:'90%'
    },
    input:{
        marginTop:10,
        backgroundColor:'#FFF'
    },
    button:{
        backgroundColor:'#080',
        marginTop:10,
        padding:10,
        alignItems:'center',
        borderRadius:5
    },
    buttonText:{
        fontFamily:commonStyles.fontFamily,
        color:'#FFF',
        
    },
    
})
