import React from "react";
import useActiveState from "../hooks/useActiveState";
import useAuth from "../hooks/useAuth";
import { logoutPost } from "../api/Fetcher";
import LocalStorageHandler from "../tools/localstoragehandler";

function Menu({ callback, status }) {
  const storageHandler = LocalStorageHandler();

  const { auth, setAuth } = useAuth();
  const { activeState, setActiveState } = useActiveState();

  const updateActiveState = (state) => {
    setActiveState(state);
  };

  const updateAuth = (Obj) =>{
    setAuth(Obj);
  }

  const LogoutHandler = async () => {
    const response = await logoutPost(auth.token);

    if(response.data.status === "ok"){
      updateActiveState("loggedOut");
      updateAuth({});
      storageHandler.clearLocalStorage();
    }
  }

  return (
      <div className={status ? "menu" : "menu menuVisible"}>
        <div
          className="menuItem"
          onClick={(e) => {
            LogoutHandler();
            callback();
          }}
        >
          Logout
        </div>
        <div
          className="menuItem"
          onClick={(e) => {
            callback();
          }}
        >
          Close Menu
        </div>
      </div>
  );
}

export default Menu;
