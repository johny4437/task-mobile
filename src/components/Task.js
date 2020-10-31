import React from 'react';

import {
    View, 
    Text,
    StyleSheet,
    TouchableWithoutFeedback,
    TouchableOpacity,

} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'
import commonStyle from '../commonStyle';
import moment from 'moment';
import 'moment/locale/pt-br';
import  Swipeable from 'react-native-gesture-handler/Swipeable';

const Task = ({desc, estimateAt,doneAt, toggleTask, id, onDelete}) =>{

    const doneOrNot = doneAt != null ? 
    {textDecorationLine:'line-through'} : {};

    const date = doneAt ? doneAt : estimateAt;
    const formatedDate =  moment(date).locale('pt-br').format('ddd, D [de] MMMM')

    const getRightAction = () =>{
        return(
            <TouchableOpacity 
            style={styles.right} onPress={()=> onDelete(id)}>
                <Icon name="trash" size={30} color="#FFF"/>
            </TouchableOpacity>

        );
    }
    const getLeftAction = () =>{
        return(
            <View style={styles.left}>
                <Icon name="trash" size={20} color="#FFF" style={styles.excludeIcon}/>
                <Text style={styles.excludeText}>Excluir</Text>
            </View>

        );
    }


    return(
    <Swipeable 
    renderRightActions={getRightAction}
    renderLeftActions={getLeftAction}
    onSwipeableLeftOpen={()=>onDelete(id)}
    >
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
    </Swipeable>
    
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
        paddingVertical:10,
        backgroundColor:'#FFF'
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
    },
    right:{
        backgroundColor:'red',
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'flex-end',
        paddingHorizontal:20
    },
    left:{
        flex:1,
        backgroundColor:'red',
        flexDirection:'row',
        alignItems:'center',

    },
    excludeText:{
        fontFamily:commonStyle.fontFamily,
        color:'#FFF',
        fontSize:20,
        margin:10
    },
    excludeIcon:{
        marginLeft:10
    }
})