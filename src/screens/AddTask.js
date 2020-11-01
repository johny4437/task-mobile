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
    const[desc, setDesc] =  React.useState('');
    const[showDatePicker, setShowDatePicker] =  React.useState(false)
    const [date, setDate] = React.useState(new Date())

    const show = () => {
        setShowDatePicker(true);
    };
    
    const hideDatePicker = () => {
        setShowDatePicker(false);
    };
    
    const handleConfirm = (date) => {
        setDate(date)
        hideDatePicker();
    };

    const save = () =>{
        const newTask = {
            desc:desc,
            date:date
        }
        onSave(newTask)
        setDesc('');
        setDate(new Date());
    }

    const fomatedDate = moment(date).locale('pt-br').format('ddd, D [de] MMMM [de] YYYY') 

    return(
        <Modal transparent={true} visible={isVisible}
        onRequestClose={onCancel}
        animationType='slide'>
            <TouchableWithoutFeedback onPress={onCancel}>
                <View style={styles.background}></View>
            </TouchableWithoutFeedback>
            <View style={styles.container}>
                <Text style={styles.header}>Nova Tarefa</Text>
                <TextInput 
                style={styles.input} 
                placeholder="Digite sua Tarefa"
                onChangeText={text => setDesc(text)}
                value={desc}
                />
                <TouchableOpacity onPress={show}>
                    <Text style={styles.date}>{fomatedDate}</Text>
                </TouchableOpacity>
                <DateTimePicker
                    isVisible={showDatePicker}
                    mode="date"
                    onConfirm={handleConfirm}
                    onCancel={hideDatePicker}
                
                />
                <View style={styles.bottons}>
                    <TouchableOpacity style={styles.button} onPress={onCancel}>
                        <Text>Cancelar</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button}
                    onPress={save}
                    >
                        <Text>Salvar</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <TouchableWithoutFeedback onPress={onCancel}>
                <View style={styles.background}></View>
            </TouchableWithoutFeedback>

        </Modal>
    )
}

export default AddTask;


const styles = StyleSheet.create({
    background:{
        flex:1,
        backgroundColor:'rgba(0,0,0,0.7)',
    },
    container:{
        backgroundColor:'#FFF',
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
        fontSize:18,
        marginLeft:15
    }
})