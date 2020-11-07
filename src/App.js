import React from 'react'
import { View, Text } from 'react-native'
import AuthRoutes from './routes/auth.routes';
import AppRoutes from './routes/app.routes'
import {AuthContext} from './contexts/auth';
import {NavigationContainer} from '@react-navigation/native';
import {singin} from './services/functions'

const App = () =>{
    const [isLoading, setIsLoading] = React.useState(true)
    const [ userToken, setUserToken] = React.useState(null);
    const [user, setUser] = React.useState({})
    const authContext = React.useMemo(()=>({
        singIn: async (user)=>{
            singin(user).then(res=>{
                setUser(res.user)
                setUserToken(res.token);
                setIsLoading(false);
            })
            
            
        },
        singUp: ()=>{
            setUserToken(null   );
            setIsLoading(false)
        },
        singOut: ()=>{
            setUserToken('johny');
            setIsLoading(false)
        },
        user:user
    }),[])

    return (
    <AuthContext.Provider value={authContext}>
        <NavigationContainer>
            {userToken != null ? 
                <AppRoutes/>
                :<AuthRoutes/>
            }
            
        </NavigationContainer> 
    </AuthContext.Provider>
    
    );
}

export default App
