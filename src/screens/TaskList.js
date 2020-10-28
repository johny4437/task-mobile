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
        Platform
        } from 'react-native';
import TodayImage from '../../assets/assets/imgs/today.jpg';
import commonStyle from '../commonStyle';
import Task from '../components/Task';
import Icon from 'react-native-vector-icons/FontAwesome';
import  AddTask  from './AddTask';

const {width, height} = Dimensions.get('screen')
export default function TaskList(){

    const [showModal, setShowModal] = useState(true);
    const [visibleTasks, setVisibleTasks] = useState([]);
    const [showDoneTask, setShowDoneTask] = useState(true)
    const [task, setTask] = useState([
        {
            id:Math.random(),
            desc:"comprar curso",
            estimateAt:new Date(),
            doneAt:new Date()
        },
        {
            id:Math.random(),
            desc:"Terminar curso",
            estimateAt:new Date(),
            doneAt:null
        }
            
    ])

    const toggleTask = taskId =>{
        const tasks = [...task];
        tasks.forEach(t=>{
            if(t.id === taskId){
                t.doneAt =  t.doneAt ? null : new Date();
            }
        })
        setTask([...tasks])
        filterTasks();
    }
    // Função pra mudar o icone de visibilidade
   const toogleFilter = () =>{
        setShowDoneTask(!showDoneTask);
        filterTasks()
    }

    const filterTasks = () =>{
        let notViewTasks = null;
        if(showDoneTask){
            notViewTasks = [...task]
        }else{
            const pending = task => task.doneAt === null;
            notViewTasks =  task.filter(pending);
        }
        setVisibleTasks([...notViewTasks])
    }

    React.useEffect(()=>{
        filterTasks()
    },[])

    const {id, desc, estimateAt, doneAt} = task;
    const today=moment().locale('pt-br').format('ddd, D  [de] MMMM') 
    
    return(
        <View style={styles.container}>
            <AddTask  isVisible={showModal} onCancel={()=> setShowModal(false)}/>
            <ImageBackground source={require('../../assets/assets/imgs/today.jpg')} style={styles.ImgBackground} >
                <View style={styles.iconBar}>
                    <TouchableOpacity onPress={toogleFilter}>
                        <Icon name={showDoneTask ? 'eye' : 'eye-slash'}
                        size={20}
                        color={commonStyle.colors.secondary}
                        />
                    </TouchableOpacity>
                </View>
                <View style={styles.titleBar}>
                    <Text style={styles.title}>Hoje</Text>
                    <Text style={styles.subtitle}>{today}</Text>
                </View>
            </ImageBackground>
            <View style={styles.taskList}>
                <FlatList
                data={visibleTasks}
                keyExtractor={item=> `${item.id}`}
                renderItem={({item})=><Task {...item} toggleTask={toggleTask}/>}
                />
            </View>
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
    }
});