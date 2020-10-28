import React from 'react';
import commonStyle from '../commonStyle';
import {View, 
        Text, 
        StyleSheet, 
        Modal, 
        TouchableWithoutFeedback,
        TouchableOpacity,
        TextInput
    } from 'react-native';

const AddTask = ({isVisible, onCancel}) =>{
    const [value, setValues] = React.useState({
        desc:''
    })
    const {desc} = value
    return(
        <Modal transparent={true} visible={isVisible}
        onRequestClose={onCancel}
        animationType="slide"
        >
            <TouchableWithoutFeedback onPress={onCancel}>
                <View style={styles.background}>
                </View>
            </TouchableWithoutFeedback>
            <View style={styles.container}>
                <Text style={styles.header}>Nova Tarefa</Text>
                <TextInput style={styles.input}
                placeholder="Informe a Descrição ..."
                onChangeText={desc => setValues({desc:desc})}
                value={desc}
                />
                <View style={styles.bottons}>
                    <TouchableOpacity onPress={onCancel}>
                        <Text style={styles.button}>Cancelar</Text>
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Text style={styles.button}>Salvar</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <TouchableWithoutFeedback onPress={onCancel}>
                <View style={styles.background}>
                </View>
            </TouchableWithoutFeedback>
        </Modal>
    );
}

export default AddTask;


const styles = StyleSheet.create({
    background:{
        flex:1,
        backgroundColor:'rgba(0,0,0,0.7)',
    },
    container:{
        backgroundColor:'#FFF'
    },
    header:{
        fontFamily:commonStyle.fontFamily,
        backgroundColor:commonStyle.colors.today,
        color:commonStyle.colors.secondary,
        textAlign:'center',
        padding:15,
        fontSize:15
    },
    bottons:{
        flexDirection:'row',
        justifyContent:'flex-end'
    },
    input:{
        fontFamily:commonStyle.fontFamily,
        height:40,
        margin:15,
        backgroundColor:'#FFF',
        borderWidth:1,
        borderColor:'#E3E3E3',
        borderRadius:6
    },
    button:{
        margin:20,
        marginRight:30,
        color:commonStyle.colors.today
    }
})