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
    
    const updateActiveState = (status) => {
        const tmpStates= [ status, ...activeState];
        
        setActiveState(tmpStates);
      }

    const updateAuth = (Obj) => {
        setAuth(Obj);
    }

    const RegisterHandler = async (e) => {
        e.preventDefault();

        generateUserMessages();

        if(userForm.repeatedPassword != userForm.password){
            console.log("Passwords do not match");
            return;
        }

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
        let tmpmsgs = [];

        if(userForm.repeatedPassword != userForm.password){
            tmpmsgs.push("Passwords do not match");
        }
        if(userForm.userid?.length != 8){
            tmpmsgs.push("HSE-Tag in wrong format");
        }
        if(!userForm.nickname){
            tmpmsgs.push("Please specify a nickname");
        }
        if(!userForm.fullname){
            tmpmsgs.push("Please specify a full name");
        }
        if(!userForm.password || !userForm.repeatedPassword){
            tmpmsgs.push("Please enter and repeat a password");
        }
        
        updateInfoMsg([...tmpmsgs]);
    }

    const deleteUserMessages = () => {
        setInfomsg([]);
    }
    
    return ( 
        <div className="loginRegister">
        <form className='loginForm'>
            <SignUpInput placeholder={"HSE-Credentials"} state={userForm.userid} callback={updateHseId} />
            <SignUpInput placeholder={"Nickname"} state={userForm.nickname} callback={updateNickname} />
            <SignUpInput placeholder={"Full Name"} state={userForm.fullname} callback={updateFullName} />

            <SignUpPassword placeholder={"Enter Password"} callback={updatePassword} />
            <SignUpPassword placeholder={"Repeat Your Password"} callback={updateRepeatedPassword} />

            <div>
                {infomsg.map((msg,i) => {
                    setTimeout(() => { 
                        const tmpArr = [...infomsg];
                        tmpArr.splice(i,1);
          
                        setInfomsg(tmpArr);
                       },3000);

                    return (
                        <ErrorMessage key={Math.random()} text={msg} />
                    )
                })
                }
            </div>
            <button className="breakButton firstPrio" onClick={RegisterHandler}>Create Account</button>
            <button className="breakButton secondPrio" onClick={() => updateActiveState("login")}>Sign In</button>
        </form>
        </div>

     );
}

export default Register;