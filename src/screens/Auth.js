import React from 'react'
import { StyleSheet, Text, View, TextInput, ImageBackground, TouchableOpacity} from 'react-native'

import commonStyles from '../commonStyle';

const Auth = () => {

    const [values, setValues] =  React.useState({
        nome:'',
        email:'',
        password:'',
        stageNew:false
    });

    const { nome, email, password,stageNew } =  values;
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
                    <TextInput 
                    style={styles.input}
                    placeholder="Nome..." 
                    value={nome}
                    onChangeText={text => setValues({nome:text})}
                    />
                
                
                }
                <TextInput 
                style={styles.input}
                placeholder="Email" 
                value={email}
                onChangeText={text => setValues({email:text})}
                />
                <TextInput 
                style={styles.input}
                placeholder="Senha" 
                value={password}
                onChangeText={text => setValues({password:text})}
                secureTextEntry={true}
                />
                <TouchableOpacity>
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
        alignItems:'center'
    },
    buttonText:{
        fontFamily:commonStyles.fontFamily,
        color:'#FFF'
    },
    
})
