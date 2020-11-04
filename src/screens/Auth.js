import React from 'react'
import { StyleSheet, Text, View, TextInput, ImageBackground, TouchableOpacity, Alert} from 'react-native'

import commonStyles from '../commonStyle';
import AuthInput from '../components/AuthInput';
import {server, showError, showSuccess} from '../common';
import axios from 'axios';
const Auth = () => {

    const [values, setValues] =  React.useState({
        name:'',
        email:'',
        password:'',
        stageNew:false
    });

    const { name, email, password,stageNew } =  values;
    const singinOrSingup = () =>{
        if(stageNew){
            singup()
        }else{
            Alert.alert('errado')
        }
    }

    const singup = async () =>{
        try {
            await axios.post(`http://192.168.0.106:3300/singup`,{
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
                />
                <TouchableOpacity onPress={singinOrSingup}>
                    <View style={styles.button}>
                        {stageNew && stageNew ?
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
