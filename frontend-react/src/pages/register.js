import React, {useState} from 'react';
import useActiveState from '../hooks/useActiveState';
import useAuth from '../hooks/useAuth';

import { register, registerPost } from '../api/Fetcher';

import ErrorMessage from '../components/errMsg';

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

        const response = await registerPost(userForm);

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
            <button className="breakButton" onClick={RegisterHandler}>Register</button>
            <button className="breakButton" onClick={() => updateActiveState("loggedOut")}>Login</button>
        </form>
        </div>

     );
}

export default Register;