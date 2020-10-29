import React from 'react';

import {View, Text, StyleSheet, TouchableWithoutFeedback} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'
import commonStyle from '../commonStyle';
import moment from 'moment';
import 'moment/locale/pt-br';


const Task = ({desc, estimateAt,doneAt, toggleTask, id}) =>{

    const doneOrNot = doneAt != null ? 
    {textDecorationLine:'line-through'} : {};

    const date = doneAt ? doneAt : estimateAt;
    const formatedDate =  moment(date).locale('pt-br').format('ddd, D [de] MMMM')

    return(
    <View style={styles.container}>
        <TouchableWithoutFeedback
        onPress={()=> toggleTask(id)}
        >
            <View style={styles.checkContainer}>
                {getCheckView(doneAt)}
            </View>
        </TouchableWithoutFeedback>
        <View>
            <Text style={[styles.desc, doneOrNot]}>{desc}</Text>
            <Text style={styles.date}>{formatedDate}</Text>
        </View>
    </View>
    );

}
export default Task;

function getCheckView(doneAt){
    if(doneAt != null){
        return(
            <View style={styles.done}>
                <Icon name="check" size={20} color="#FFF"></Icon>
            </View>
        );
    }else{
        return(
            <View style={styles.pending}>
                
            </View>
        );
    }
   
}


const styles =  StyleSheet.create({
    container:{
        flexDirection:'row',
        borderWidth:1,
        borderColor:'#AAA',
        alignItems:'center',
        paddingVertical:10
    },
    checkContainer:{
        width:'20%',
        alignItems:'center'
    },
    pending:{
        height:25,
        width:25,
        borderRadius:13,
        borderWidth:1,
        borderColor:'#555'
    },
    done:{
        height:25,
        width:25,
        borderRadius:13,
        borderWidth:1,
        backgroundColor:"#4D7031",
        alignItems:'center',
        justifyContent:'center'
    },
    desc:{
        fontFamily:commonStyle.fontFamily,
        color:commonStyle.colors.mainText,
        fontSize:15
    },
    date:{
        fontFamily: commonStyle.fontFamily,
        color:commonStyle.colors.subText,
        fontSize:12
    }
})