import React from "react";
import useActiveState from "../hooks/useActiveState";
import useAuth from "../hooks/useAuth";
import { logout } from "../api/Fetcher";

function Menu({ callback }) {
  const { auth, setAuth } = useAuth();
  const { activeState, setActiveState } = useActiveState();

  const updateActiveState = (state) => {
    setActiveState(state);
  };

  const updateAuth = (Obj) =>{
    setAuth(Obj);
  }

  const LogoutHandler = async () => {
    const response = await logout(auth.token);

    if(response.data.status === "ok"){
      updateActiveState("loggedOut");
      updateAuth({});
    }
  }

  return (
    <>
      <div className="menu">
        <div
          className="menuItem"
          onClick={(e) => {
            LogoutHandler();
            callback("menuNotShown");
          }}
        >
          Logout
        </div>
        <div
          className="menuItem"
          onClick={(e) => {
            callback("menuNotShown");
          }}
        >
          Close Menu
        </div>
      </div>
    </>
  );
}

export default Menu;
