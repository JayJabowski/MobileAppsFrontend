import React, { useState } from "react";
import useActiveState from "../hooks/useActiveState";
import useAuth from "../hooks/useAuth";

import LocalStorageHandler from "../tools/localstoragehandler";

import { fetchLoginPost } from "../api/Fetcher";
import RememberMe from "../components/rememberme";

function Login({msg}) {

  const storageHandler = LocalStorageHandler();

  const { auth, setAuth } = useAuth();
  const { activeState, setActiveState } = useActiveState();
  const [user, setUser] = useState();
  const [password, setPassword] = useState();
  const [passwordShown, setPasswordShown] = useState(false);
  const [rememberLoginCheck, setRememberLoginCheck] = useState(false);
  const [ infomsg, setInfomsg ] = useState(msg ? [msg] : []);

  //useState-Setter

  const updateUser = (e) => {
    setUser(e.target.value);
  };
  const updatePassword = (e) => {
    setPassword(e.target.value);
  };
  const togglePasswordShown = () => {
    setPasswordShown(!passwordShown);
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
  const updateInfoMsg = (msg) =>{
    const tmpArr = [...infomsg, msg];
    
    setInfomsg(tmpArr);
}



// Fetch-Handlers

  const LoginHandler = async (e) => {
    e.preventDefault();

    const response = await fetchLoginPost(user, password);
    console.log(response.data);

    //TODO: replace console.logs with proper error messages
    switch(response.data.code){
      case 200:
        break;
      case 456:
        updateInfoMsg(response.data.message);
        storageHandler.clearLocalStorage();
        break;
        default:
        updateInfoMsg(response.data.message);
        return;
    }
    
    updateActiveState("groupChat");

    updateAuth({ token: response.data.token, user, hash : response.data.hash });

    if(typeof(Storage) !== "undefined" && rememberLoginCheck){
      storageHandler.addLoginToLocalStorage({hash: response.data.hash, token: response.data.token, user});
    }
  };

  console.dir(infomsg);

  return (
    <div className="loginRegister">

      <div className="msgWrapper">
        {infomsg.map((msg,i) => {
            setTimeout(() => { 
              const tmpArr = [...infomsg];
              tmpArr.splice(i,1);

              setInfomsg(tmpArr);
             },3000);

            return(
              <div className="infoMsgBox">{msg}</div>
            )
        })}
      </div>

      <div className="infoParagraphWrapper">
        <p className="infoParagraph">
          This is a chat client implemented as part of the 'Mobile Apps and User Experience' lecture at Hochschule Esslingen in summer semester 2023. It was implemented by Jan Wittrowski. Enjoy!
        </p>

      </div>
     
      <form className="loginForm">
        <label>HSE-Kürzel</label>
        <input type="text" onChange={updateUser}></input>
        <label>Passwort</label>
        <div className="passwordWrapper">
          <input type={passwordShown ? "text" : "password"} onChange={updatePassword}></input>
          <button  className="inlineButton" onClick={() => togglePasswordShown()}></button>
        </div>
        <RememberMe callback={updateRememberLoginCheck}/>
        <button className="breakButton" onClick={LoginHandler}>Login</button>
        <button className="breakButton" onClick={() => updateActiveState("register")}>Sign Up</button>
      </form>
    </div>
  );
}

export default Login;
