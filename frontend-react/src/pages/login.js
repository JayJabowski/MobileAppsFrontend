import React, { useState } from "react";
import useActiveState from "../hooks/useActiveState";
import useAuth from "../hooks/useAuth";

import LocalStorageHandler from "../tools/localstoragehandler";

import { login } from "../api/Fetcher";
import RememberMe from "../components/rememberme";
import SignUpInput from "../components/SignUpInput";
import SignUpPassword from "../components/SignUpPassword";
import ErrorMessage from "../components/errMsg";

function Login({msg}) {

  const storageHandler = LocalStorageHandler();

  const { auth, setAuth } = useAuth();

  const { activeState, setActiveState } = useActiveState();
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [rememberLoginCheck, setRememberLoginCheck] = useState(false);
  const [ infomsg, setInfomsg ] = useState(msg ? [msg] : []);

  //useState-Setter

  const updateUser = (e) => {
    setUser(e.target.value);
  };
  const updatePassword = (e) => {
    e.preventDefault();
    setPassword(e.target.value);
  };
  const updateActiveState = (status) => {
    const tmpStates= [ status, ...activeState];
    
    setActiveState(tmpStates);
  }
  const updateRememberLoginCheck = (bool) => {
    setRememberLoginCheck(bool);
  };
  const updateAuth = (Obj) => {
    setAuth(Obj);
  };
  const updateInfoMsg = (obj) =>{  
    setInfomsg(obj);
  }
  const setInfoMsProperty = (name, msg) => {
    setInfomsg({...infomsg, [name]:msg});
  }


// Fetch-Handlers

  const LoginHandler = async (e) => {
    e.preventDefault();
   
    const response = await login(user, password);

    switch(response.data.code){
      case 200:
        break;
      case 455:
      case 456:
        storageHandler.clearLocalStorage();
        return;
        default:
        setInfoMsProperty("loginFailed", "Invalid Credentials. Please try again");
        return;
    }
    
    updateActiveState("groupChat");

    updateAuth({ token: response.data.token, user, hash : response.data.hash });

    if(typeof(Storage) !== "undefined" && rememberLoginCheck){
      storageHandler.addToLocalStorage({hash: response.data.hash, token: response.data.token, user, isLight: true});
    }
  };
  
  return (
    <div className="loginRegister">
      <form>
        {infomsg.loginFailed ? <ErrorMessage text = {infomsg.loginFailed} callback = {() => setInfoMsProperty("loginFailed", null)}/> : <></>}
        <SignUpInput placeholder={"HSE-Credentials"} state={user} callback={updateUser} onSubmit={LoginHandler} />
        <SignUpPassword placeholder={"Password"} callback={updatePassword} onSubmit={LoginHandler}/>
        <RememberMe callback={updateRememberLoginCheck} />

        <button className="breakButton firstPrio hoverWhite" onClick={LoginHandler}>
          Login
        </button>

        <button
          className="breakButton secondPrio hoverWhite"
          onClick={() => updateActiveState("register")}
        >
          Sign Up
        </button>
      </form>
    </div>
  );
}

export default Login;
