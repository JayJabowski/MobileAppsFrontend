import React, { useState } from "react";
import useActiveState from "../hooks/useActiveState";
import useAuth from "../hooks/useAuth";

import "../index.css";

import { fetchLogin, fetchLoginPost } from "../api/Fetcher";
import { fetchLoginNew } from "../api/fetch";

function Login() {
  const { auth, setAuth } = useAuth();
  const { activeState, setActiveState } = useActiveState();
  const [user, setUser] = useState();
  const [password, setPassword] = useState();

  const updateUser = (e) => {
    setUser(e.target.value);
  };
  const updatePassword = (e) => {
    setPassword(e.target.value);
  };
  const updateActiveState = (state) => {
    setActiveState(state);
  };
  const updateAuth = (Obj) => {
    setAuth(Obj);
  };

  const LoginHandler = async (e) => {
    e.preventDefault();

    const response = await fetchLoginPost(user, password);

    if (!response.data.token) {
      console.log("Login Failed");
      return;
    }
    updateActiveState("groupChat");
    updateAuth({ token: response.data.token, user, password });
  };

  return (
    <div>
      <div className="loginHeader">
        <h1 className="selected">Login </h1>
        <h1 onClick={() => updateActiveState("register")}>Register</h1>
      </div>

      <form className="loginForm">
        <label>HSE-Kürzel</label>
        <input type="text" onChange={updateUser}></input>
        <label>Passwort</label>
        <input type="password" onChange={updatePassword}></input>
        <button onClick={LoginHandler}>Login</button>
      </form>
    </div>
  );
}

export default Login;
