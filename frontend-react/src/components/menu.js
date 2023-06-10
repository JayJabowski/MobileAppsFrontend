import React from "react";
import useActiveState from "../hooks/useActiveState";
import useAuth from "../hooks/useAuth";
import { logoutPost } from "../api/Fetcher";
import LocalStorageHandler from "../tools/localstoragehandler";
import FontSizeChanger from "./fontSizechanger";
import ThemeChanger from "./ThemeChanger";

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
      <div className={status ? "menu menuVisible" : "menu"}>
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
        <FontSizeChanger />
        <ThemeChanger />
      </div>
  );
}

export default Menu;
