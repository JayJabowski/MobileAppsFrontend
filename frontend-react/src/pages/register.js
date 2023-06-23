import React, {useState} from 'react';
import useActiveState from '../hooks/useActiveState';
import useAuth from '../hooks/useAuth';

import { register } from '../api/Fetcher';

import ErrorMessage from '../components/errMsg';
import SignUpInput from '../components/SignUpInput';
import SignUpPassword from '../components/SignUpPassword';

function Register() {
    const { auth, setAuth }= useAuth();
    const {activeState, setActiveState} = useActiveState();
    const [ userForm, setUserForm ] = useState({});
    const [ infomsg, setInfomsg ] = useState([]);

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

    const updateInfoMsg = (arr) =>{
        setInfomsg( arr);
    }

    const setInfoMsProperty = (name, msg) => {
        setInfomsg({...infomsg, [name]:msg});
    }
    
    const updateActiveState = (status) => {
        const tmpStates= [ status, ...activeState];
        
        setActiveState(tmpStates);
      }

    const updateAuth = (Obj) => {
        setAuth(Obj);
    }

    const RegisterHandler = async (e) => {
        e.preventDefault();

        if(!generateUserMessages()) return;

        const response = await register(userForm);

        if(!response.data.token){
            console.log("Login Failed");
            return;
        }

        console.log("register successful!");
        updateActiveState("groupChat");
        updateAuth({token:response.data.token, user: userForm.userid, password: userForm.password});
    }

    const generateUserMessages = () => {
        const tmpmsgs = {};

        if(userForm.repeatedPassword != userForm.password){
            tmpmsgs.password = "Passwords do not match";
        }
        if(userForm.userid?.length != 8){
            tmpmsgs.userid = "HSE-Tag in wrong format";
        }
        if(!userForm.nickname){
            tmpmsgs.nickname = "Please specify a nickname";
        }
        if(!userForm.fullname){
            tmpmsgs.fullname = "Please specify a full name";
        }
        if(!userForm.password || !userForm.repeatedPassword){
            tmpmsgs.repeatedPassword = "Please enter and repeat a password";
        }
        
        updateInfoMsg({...tmpmsgs});

        return !Object.values(tmpmsgs).length;
    }
    
    return ( 
        <div className="loginRegister">
        <form className='loginForm'>
            <SignUpInput placeholder={"HSE-Credentials"} state={userForm.userid} callback={updateHseId} />
            {infomsg.userid ? <ErrorMessage text = {infomsg.userid} callback = {() => setInfoMsProperty("userid", null)}/> : <></>}
            <SignUpInput placeholder={"Nickname"} state={userForm.nickname} callback={updateNickname} />
            {infomsg.nickname ? <ErrorMessage text = {infomsg.nickname} callback = {() => setInfoMsProperty("nickname", null)}/> : <></>}
            <SignUpInput placeholder={"Full Name"} state={userForm.fullname} callback={updateFullName} />
            {infomsg.fullname ? <ErrorMessage text = {infomsg.fullname} callback = {() => setInfoMsProperty("fullname", null)}/> : <></>}

            <SignUpPassword placeholder={"Enter Password"} callback={updatePassword} />
            {infomsg.password ? <ErrorMessage text = {infomsg.password} callback = {() => setInfoMsProperty("password", null)}/> : <></>}
            <SignUpPassword placeholder={"Repeat Your Password"} callback={updateRepeatedPassword} />
            {infomsg.repeatedPassword ? <ErrorMessage text = {infomsg.repeatedPassword} callback = {() => setInfoMsProperty("repeatedPassword", null)}/> : <></>}

            <button className="breakButton hoverWhite" onClick={RegisterHandler}>Create Account</button>
            <button className="breakButton hoverWhite" onClick={() => updateActiveState("login")}>Already have an account? Sign in!</button>
        </form>
        </div>

     );
}

export default Register;