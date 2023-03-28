import React, {useState} from 'react';
import useActiveState from '../hooks/useActiveState';
import useAuth from '../hooks/useAuth';

import { fetchLogin } from '../api/Fetcher';

function Login() {
    const { auth, setAuth }= useAuth();
    const {activeState, setActiveState} = useActiveState();
    const [ user, setUser ] = useState();
    const [ password, setPassword ] = useState();

    const updateUser = (e) =>{
        setUser(e.target.value);
    }
    const updatePassword = (e) =>{
        setPassword(e.target.value);
    }
    const updateActiveState = (state) => {
        setActiveState(state);
    }
    const updateAuth = (Obj) => {
        setAuth(Obj);
    }

    const LoginHandler = async (e) => {
        e.preventDefault();

        //const response = await fetchLogin(user, password);

        updateActiveState("groupChat");
        //TODO: add correct username, password parameters
        //updateAuth(response.data.user, response.data.password);
    }


    
    return ( 
        <form>
            <input type="text" onChange={updateUser}></input>
            <input type="password" onChange={updatePassword}></input>
            <button onClick={LoginHandler}>Login</button>
        </form>

     );
}

export default Login;