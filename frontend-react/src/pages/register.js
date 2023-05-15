import React, {useState} from 'react';
import useActiveState from '../hooks/useActiveState';
import useAuth from '../hooks/useAuth';

import { register, registerPost } from '../api/Fetcher';

function Register() {
    const { auth, setAuth }= useAuth();
    const {activeState, setActiveState} = useActiveState();
    const [ userForm, setUserForm ] = useState({});

    const updateHseId = (e) =>{
        setUserForm(
            {...userForm, userid: e.target.value}
            );
    }
    const updateNickname = (e) =>{
        setUserForm(
            {...userForm, nickname: e.target.value}
            );
    }
    const updateFullName = (e) =>{
        setUserForm(
            {...userForm, fullname: e.target.value}
            );
    }
    const updatePassword = (e) =>{
        setUserForm(
            {...userForm, password: e.target.value}
            );
    }
    const updateRepeatedPassword = (e) =>{
        setUserForm(
            {...userForm, repeatedPassword: e.target.value}
            );
    }
    
    const updateActiveState = (state) => {
        setActiveState(state);
    }
    const updateAuth = (Obj) => {
        setAuth(Obj);
    }

    const RegisterHandler = async (e) => {
        e.preventDefault();
        if(userForm.repeatedPassword != userForm.password){
            console.log("Passwords do not match");
            return;
        }

        const response = await registerPost(userForm);

        if(!response.data.token){
            console.log("Login Failed");
            return;
        }

        console.log("register successful!");
        updateActiveState("groupChat");
        updateAuth({token:response.data.token, user: userForm.userid, password: userForm.password});
    }


    
    return ( 
        <div className="loginRegister">
        <div className="loginHeader">
            <label onClick={() => updateActiveState("loggedOut")}>Login</label>
            <label className='selected'>Register</label>
        </div>
        <form className='loginForm'>
            <label>Enter Your HSE id (e.g. mamu00)</label>
            <input type="text" onChange={updateHseId}></input>
            <label>Nickname</label>
            <input type="text" onChange={updateNickname}></input>
            <label>Full Name</label>
            <input type="text" onChange={updateFullName}></input>
            <label>Password</label>
            <input type="text"  onChange={updatePassword}></input>
            <label>Repeat Password</label>
            <input type="text"  onChange={updateRepeatedPassword}></input>
            <button onClick={RegisterHandler}>Register</button>
        </form>
        </div>

     );
}

export default Register;