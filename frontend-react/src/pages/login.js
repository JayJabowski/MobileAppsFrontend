import React, { useState } from "react";
import useActiveState from "../hooks/useActiveState";
import useAuth from "../hooks/useAuth";

import LocalStorageHandler from "../tools/localstoragehandler";

import { fetchLoginPost } from "../api/Fetcher";
import RememberMe from "../components/rememberme";

function Login() {

  const storageHandler = LocalStorageHandler();

  const { auth, setAuth } = useAuth();
  const { activeState, setActiveState } = useActiveState();
  const [user, setUser] = useState();
  const [password, setPassword] = useState();
  const [passwordShown, setPasswordShown] = useState(false);
  const [rememberLoginCheck, setRememberLoginCheck] = useState(false);
  const [ infomsg, setInfomsg ] = useState([]);

  const updateUser = (e) => {
    setUser(e.target.value);
  };
  const updatePassword = (e) => {
    setPassword(e.target.value);
  };
  const togglePasswordShown = () => {
    setPasswordShown(!passwordShown);
  };
  const updateActiveState = (state) => {
    setActiveState(state);
  };
  const updateRememberLoginCheck = (bool) => {
    setRememberLoginCheck(bool);
  };
  const updateAuth = (Obj) => {
    setAuth(Obj);
  };
  const updateInfoMsg = (arr) =>{
    setInfomsg( arr);
}

  const LoginHandler = async (e) => {
    e.preventDefault();

    const response = await fetchLoginPost(user, password);
    console.log(response.data);

    //TODO: replace console.logs with proper error messages
    switch(response.data.code){
      case 200:
        break;
      case 456:
        console.log(response.data.message);
        storageHandler.clearLocalStorage();
        break;
      default:
        console.log(response.data.message);
        return;
    }
    
    updateActiveState("groupChat");

    updateAuth({ token: response.data.token, user, hash : response.data.hash });

    if(typeof(Storage) !== "undefined" && rememberLoginCheck){
      storageHandler.addLoginToLocalStorage({hash: response.data.hash, token: response.data.token, user});
    }
  };

  const generateUserMessages = () => {
    let tmpmsgs = [];

    if(true){
        tmpmsgs.push("Passwords do not match");
    }
}

  return (
    <div className="loginRegister">
      <div className="loginHeader">
        <label className="selected">Login </label>
        <label onClick={() => updateActiveState("register")}>Register</label>
      </div>

      <form className="loginForm">
        <label>HSE-Kürzel</label>
        <input type="text" onChange={updateUser}></input>
        <label>Passwort</label>
        <div className="passwordWrapper">
          <input type={passwordShown ? "text" : "password"} onChange={updatePassword}></input>
          <button  className="inlineButton" onClick={() => togglePasswordShown()}></button>
        </div>
        <button className="breakButton" onClick={LoginHandler}>Login</button>
        <RememberMe callback={updateRememberLoginCheck}/>
      </form>
    </div>
  );
}

export default Login;
