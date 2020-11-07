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

import TodayImage from '../../assets/assets/imgs/today.jpg';
import commonStyle from '../commonStyle';
import Task from '../components/Task';
import Icon from 'react-native-vector-icons/FontAwesome';
import  AddTask  from './AddTask';
import { showError, showSuccess, server } from '../common';
import { AuthContext} from '../contexts/auth';

export default function TaskList(){
    const today =  moment().locale('pt-br').format('ddd,  D [de] MMMM');
    const[showDoneTasks, setShowDoneTasks] = React.useState(true)
    const [ visibleTasks, setVisibleTasks ] = React.useState([]);
    const [showAddTask, setShowAddTask] = React.useState(false)
    const [tasks, setTasks] =  React.useState([]);
    const [userData, setUserData] = React.useState({})
    const { id, desc, estimateAt, doneAt } = tasks;

    const toogleFilter = () =>{
        setShowDoneTasks(!showDoneTasks);
        // filterTasks();
        
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

    const toggleTask = taskId =>{
        const todo = [...tasks];
        todo.forEach(task =>{
            if(task.id === taskId){
                task.doneAt =  task.doneAt ?  null : new Date();
            }
        })
        setTasks([...todo])
        AsyncStorage.setItem('@tasks', JSON.stringify(todo))
    }

    const addTask =  async (task) =>{
        if(!task.desc || !task.desc.trim()){
            Alert.alert('Dados inválidos, descrição não informada');
            return;
        }
        const listTasks = [...tasks];
        listTasks.push({
            id:Math.random(),
            desc:task.desc,
            estimateAt:task.date,
            doneAt:null
        })

        setTasks([...listTasks]);
        setShowAddTask(false)
        

    }
    const deleteTask = taskId =>{
        const newTasks = tasks.filter(task => task.id != taskId)
        setTasks([...newTasks])
    }

    
   
    const loadTask = async () =>{
        try {
            const maxDate = moment().format('YYY-MM-DD 23:59:59');
            const res =  await axios.get(`${server}/list/${user[0].id}?date=${maxDate}`);
            setTasks([...res.data])
        } catch (error) {
            showError(error)
        }
    }

    
    const { getToken, user } = React.useContext(AuthContext)
    console.log(user)

    React.useEffect(()=>{
        async function getTasks(){
            const getFromUser = await AsyncStorage.getItem('@user');
            const user = JSON.parse(getFromUser);
            setUserData({...user});
        }
        getTasks()
        setTimeout(()=>{
            loadTask()
        },2000)
        
    },[])

    return(
        <View style={styles.container}>
            <AddTask isVisible={showAddTask}
            onCancel={function(){setShowAddTask(false)}}
            onSave={addTask}
            />
            <ImageBackground 
            source={require('../../assets/assets/imgs/today.jpg')}
            style={styles.ImgBackground}>
                {/* <View style={styles.iconBar}>
                    <TouchableOpacity onPress={toogleFilter}>
                        <Icon name={showDoneTasks ? 'eye': 'eye-slash'}
                        size={20}
                        color={commonStyle.colors.secondary}
                        />
                    </TouchableOpacity>
                </View> */}
                <View style={styles.titleBar}>
                    <Text style={styles.title}>Hoje</Text>
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
            style={styles.addButton}
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
        justifyContent:'flex-end',
        marginTop: Platform.OS === 'ios' ?  45 : 10
    },
    addButton:{
        position:'absolute',
        right:30,
        bottom:30,
        width:50,
        height:50, 
        borderRadius:25,
        backgroundColor:commonStyle.colors.today,
        alignItems:'center',
        justifyContent:'center'
    }
});