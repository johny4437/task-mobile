import React,{useState}from 'react';
import moment from 'moment';
import 'moment/locale/pt-br';
import {View, 
        Text, 
        StyleSheet, 
        ImageBackground, 
        Dimensions,
        FlatList,
        TouchableOpacity,
        Platform,
        Alert
        } from 'react-native';


import  AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import commonStyle from '../commonStyle';
import Task from '../components/Task';
import Icon from 'react-native-vector-icons/FontAwesome';
import  AddTask  from './AddTask';
import { showError, showSuccess, server } from '../common';

import TodayImage from '../../assets/assets/imgs/today.jpg';
import TomorrowImage from '../../assets/assets/imgs/tomorrow.jpg';
import WeekImage from '../../assets/assets/imgs/week.jpg';
import MonthImage from '../../assets/assets/imgs/month.jpg';

export default function TaskList({title, daysAhead, navigation}){
    const today =  moment().locale('pt-br').format('ddd,  D [de] MMMM');
    const[showDoneTasks, setShowDoneTasks] = React.useState(true)
    const [ visibleTasks, setVisibleTasks ] = React.useState([]);
    const [showAddTask, setShowAddTask] = React.useState(false)
    const [tasks, setTasks] =  React.useState([]);
    const [userId, setUserId] = React.useState('');
    const [userToken, setUserToken] = React.useState('')
    const { id, desc, estimateAt, doneAt } = tasks;

    const toogleFilter = () =>{
        setShowDoneTasks(!showDoneTasks);
        // filterTasks();
        
    }


    const getImage = () =>{
        switch(daysAhead){
            case 0: return TodayImage
            case 1: return TomorrowImage
            case 7: return WeekImage
            default: return MonthImage
        }
    }

    const getColor = () =>{
        switch(daysAhead){
            case 0: return commonStyle.colors.today
            case 1: return commonStyle.colors.tomorrow
            case 7: return commonStyle.colors.week
            default: return commonStyle.colors.month
        }
    }


    // FILTRA AS TASKS
    // const filterTasks = () =>{
    //     let visibleTasks = null;
    //     if(showDoneTasks){
    //         visibleTasks=[...tasks]
    //     }else{
    //         const pending = task => task.doneAt === null;
    //         visibleTasks = tasks.filter(pending);
    //     }
        
    //     setVisibleTasks([visibleTasks])
    // }

    const toggleTask = async (taskId) =>{

        await axios.put(`http://192.168.0.108:3300/toggle/${taskId}/tasks`);
        await loadTask()



        // const todo = [...tasks];
        // todo.forEach(task =>{
        //     if(task.id === taskId){
        //         task.doneAt =  task.doneAt ?  null : new Date();
        //     }
        // })
        // setTasks([...todo])
        // AsyncStorage.setItem('@tasks', JSON.stringify(todo))
    }

    const addTask =  async (task) =>{
        if(!task.desc || !task.desc.trim()){
            Alert.alert('Dados inválidos, descrição não informada');
            return;
        }
        const res = await axios.post('http://192.168.0.108:3300/tasks',{
            desc:task.desc,
            estimateAt:task.date
        })



        // const listTasks = [...tasks];
        // listTasks.push({
        //     id:Math.random(),
        //     desc:task.desc,
        //     estimateAt:task.date,
        //     doneAt:null
        // })

        //setTasks([...listTasks]);
        setShowAddTask(false)
        loadTask()

    }
    const deleteTask = async (taskId) =>{
        await axios.delete(`http://192.168.0.108:3300/tasks/${taskId}`);
        await loadTask();
    }

    
   
    const loadTask = async () =>{
        try {
            const url = 'http://192.168.0.108:3300';
            const maxDate = moment().add({days:daysAhead}).format('YYYY-MM-DD 23:59:59');
            const res =  await axios.get(`${url}/tasks?date=${maxDate}`);
            setTasks([...res.data])
        } catch (error) {
            showError(error)
        }
    }

    

    // console.log(userToken)
    // console.log(userId)
    // console.log(tasks)

    React.useEffect(()=>{    
        loadTask()
    },[])

    return(
        <View style={styles.container}>
            <AddTask isVisible={showAddTask}
            onCancel={function(){setShowAddTask(false)}}
            onSave={addTask}
            />
            <ImageBackground 
            source={getImage()}
            style={styles.ImgBackground}>
                <View style={styles.iconBar}>
                    <TouchableOpacity onPress={()=>navigation.openDrawer()}>
                        <Icon name='bars'
                            size={20}
                            color={commonStyle.colors.secondary}
                        />
                    </TouchableOpacity>
                    {/* <TouchableOpacity onPress={toogleFilter}>
                        <Icon name={showDoneTasks ? 'eye': 'eye-slash'}
                        size={20}
                        color={commonStyle.colors.secondary}
                        />
                    </TouchableOpacity> */}
                </View>
                <View style={styles.titleBar}>
                    <Text style={styles.title}>{title}</Text>
                    <Text style={styles.subtitle}>{today}</Text>
                </View>
            </ImageBackground>
            <View style={styles.taskList}>
                <FlatList 
                data={tasks}
                keyExtractor={item => `${item.id}`}
                renderItem={({item})=> <Task {...item} toggleTask={toggleTask} onDelete={deleteTask}/>}
                />
            </View>
            <TouchableOpacity 
            style={[styles.addButton, {backgroundColor: getColor()}]}
            onPress={()=>setShowAddTask(true)}
            >
                <Icon name="plus" 
                size={20} 
                color={commonStyle.colors.secondary}/>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container:{
        flex:1
    },
    ImgBackground:{
        flex:3
    },
    taskList:{
        flex:7
    },
    titleBar:{
        flex:1,
        justifyContent:'flex-end'
    },
    title:{
        fontFamily:commonStyle.fontFamily,
        color: commonStyle.colors.secondary,
        fontSize:50,
        marginLeft:20,
        marginBottom:20
    },
    subtitle:{
        fontFamily:commonStyle.fontFamily,
        color: commonStyle.colors.secondary,
        marginLeft:20,
        marginBottom:30,
        fontSize:20,

    },
    iconBar:{
        flexDirection:'row',
        marginHorizontal:20,
        justifyContent:'flex-start',
        marginTop: Platform.OS === 'ios' ?  45 : 10
    },
    addButton:{
        position:'absolute',
        right:30,
        bottom:30,
        width:50,
        height:50, 
        borderRadius:25,
        alignItems:'center',
        justifyContent:'center'
    }
});