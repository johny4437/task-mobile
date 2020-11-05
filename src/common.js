import {Platform, Alert} from 'react-native';

const server =   Platform.OS == 'ios' ?
'http://localhost:3300':'http://192.168.0.108:3300';

function showError(err){
    Alert.alert('Ops! Ocorreu um Problema!', `Mensagem: ${err}`);
}
function showSuccess(msg){
    Alert.alert('Sucesso', msg)
}

export {server, showError, showSuccess};