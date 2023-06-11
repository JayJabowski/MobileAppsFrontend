import React from "react";
import useActiveState from "../hooks/useActiveState";
import useAuth from "../hooks/useAuth";
import LocalStorageHandler from "../tools/localstoragehandler";
import FontSizeChanger from "./fontSizechanger";
import ThemeChanger from "./ThemeChanger";

function Menu({ toggleMenuStatus, status, LogoutHandler }) {

  return (
      <div className={status ? "menu menuVisible" : "menu"}>
        <div
          className="menuItem"
          onClick={(e) => {
            LogoutHandler();
            toggleMenuStatus();
          }}
        >
          Logout
        </div>
        <div
          className="menuItem"
          onClick={(e) => {
            toggleMenuStatus();
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
