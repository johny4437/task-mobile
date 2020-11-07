import {api} from './api';
export const singin = async (user) =>{
    const response =  await api.post('/singin',user);
    return response.data
}
