import React from 'react';
import commonStyle from '../commonStyle';
import {View, 
        Text, 
        StyleSheet, 
        Modal, 
        TouchableWithoutFeedback,
        TouchableOpacity,
        TextInput,
        Platform
    } from 'react-native';

    import moment from 'moment';
    import 'moment/locale/pt-br';

    import DateTimePicker from "react-native-modal-datetime-picker"
const AddTask = ({isVisible, onCancel, onSave}) =>{
    const [desc, setDesc] = React.useState('')
    const [date, setDate] = React.useState(new Date());
    const [showTimePicker, setShowTimePicker] = React.useState(false)
    
    
    const dateString =  moment(date).format('ddd, D [de] MMMM [de] YYYY');

    const showPicker = () =>{
        setShowTimePicker(true)
    }
    const  hideDateTimePicker = () =>{
        setShowTimePicker(false)
    }
    const handleDatePicked = date => {
        setDate(date)
        hideDateTimePicker()
    };

    const save = () =>{
        const newTask = {
            desc:desc,
            date:date
        }
        onSave(newTask)
        setDesc('');
        setDate(new Date())
    }

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
                onChangeText={desc => setDesc(desc)}
                value={desc}
                />
                <TouchableOpacity onPress={showPicker}>
                    <Text style={styles.date}>{dateString}</Text>
                </TouchableOpacity>
                <DateTimePicker
                isVisible={showTimePicker}
                onConfirm={handleDatePicked}
                onCancel={hideDateTimePicker}
                />
                <View style={styles.bottons}>
                    <TouchableOpacity onPress={onCancel}>
                        <Text style={styles.button}>Cancelar</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={save}>
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
    },
    date:{
        fontFamily:commonStyle.fontFamily,
        fontSize:20,
        marginLeft:15
    }
})