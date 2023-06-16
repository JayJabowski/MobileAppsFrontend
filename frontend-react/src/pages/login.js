import React, { useState } from "react";
import useActiveState from "../hooks/useActiveState";
import useAuth from "../hooks/useAuth";
import useActiveTheme from "../hooks/useActiveTheme";

import LocalStorageHandler from "../tools/localstoragehandler";

import { login } from "../api/Fetcher";
import RememberMe from "../components/rememberme";
import SignUpInput from "../components/SignUpInput";
import SignUpPassword from "../components/SignUpPassword";

function Login({msg}) {

  const storageHandler = LocalStorageHandler();

  const { auth, setAuth } = useAuth();

  const { activeState, setActiveState } = useActiveState();
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [passwordShown, setPasswordShown] = useState(false);
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
  const updateInfoMsg = (msg) =>{
    const tmpArr = [...infomsg, msg];
    
    setInfomsg(tmpArr);
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
        updateInfoMsg(response.data.message);
        storageHandler.clearLocalStorage();
        return;
        default:
        updateInfoMsg(response.data.message);
        return;
    }
    
    updateActiveState("groupChat");

    updateAuth({ token: response.data.token, user, hash : response.data.hash });

    if(typeof(Storage) !== "undefined" && rememberLoginCheck){
      storageHandler.addToLocalStorage({hash: response.data.hash, token: response.data.token, user});
    }
  };

  return (
    <div className="loginRegister">
      <div className="msgWrapper">
        {infomsg.map((msg, i) => {
          setTimeout(() => {
            const tmpArr = [...infomsg];
            tmpArr.splice(i, 1);

            setInfomsg(tmpArr);
          }, 3000);

          return <div className="infoMsgBox">{msg}</div>;
        })}
      </div>


        <form>
        <SignUpInput placeholder={"HSE-Credentials"} state={user} callback={updateUser} />

        <SignUpPassword placeholder={"Password"} callback={updatePassword} />

        <RememberMe callback={updateRememberLoginCheck} />

        <button className="breakButton firstPrio" onClick={LoginHandler}>
          Login
        </button>
        <button
          className="breakButton secondPrio"
          onClick={() => updateActiveState("register")}
        >
          Sign Up
        </button>
      </form>
    </div>
  );
}

export default Login;
