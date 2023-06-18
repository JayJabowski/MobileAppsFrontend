import React, { useState, useEffect, useRef } from "react";
import FontSizeChanger from "./fontSizechanger";
import ThemeChanger from "./ThemeChanger";

//Context
import useActiveTheme from "../hooks/useActiveTheme";
import useAuth from "../hooks/useAuth";

//Pictures
import closeDark from "../icons/close_big_dark.svg";
import closeLight from "../icons/close_big_light.svg";
import gearLight from "../icons/gear_light.svg";
import gearDark from "../icons/gear_dark.svg";

import userDark from "../icons/user_dark.svg";
import userLight from "../icons/user_light.svg";

function Menu({ LogoutHandler, DeregisterHandler }) {
  const { isLight } = useActiveTheme();
  const { auth } = useAuth();

  const ref = useRef(null);

  const [menuVisible, setmenuVisible] = useState(false);

  const updateMenuVisible = (bool) => {
    setmenuVisible(bool);
  };

  return (
    <>
      <div
        className="titleButton"
        onClick={() => updateMenuVisible(!menuVisible)}
      >
        <img alt="menu" src={isLight ? userDark : userLight} />
      </div>

      {menuVisible ? (
        <>
          <div
            onClick={(e) => {
              e.stopPropagation();
              updateMenuVisible(false);
            }}
            className="menuWrapper"
          >
            <div
              onClick={(e) => {
                e.stopPropagation();
              }}
              className="menu"
              ref={ref}
            >
              <div className="menuDivider menuItem">
                <img alt="account" src={isLight ? gearDark : gearLight} />
                <label>Preferences</label>
              </div>
              <FontSizeChanger />
              <ThemeChanger />
              {auth.token ? (
                <>
                  <div className="menuDivider menuItem">
                    <img alt="account" src={isLight ? userDark : userLight} />
                    <label>Account</label>
                  </div>
                  <div
                    className="menuItem"
                    onClick={(e) => {
                      LogoutHandler();
                      updateMenuVisible(false);
                    }}
                  >
                    <label>Logout</label>
                    <div className="placeholder"></div>
                  </div>
                  <div
                    className="menuItem"
                    onClick={(e) => {
                      DeregisterHandler();
                      updateMenuVisible(false);
                    }}
                  >
                    <label>Delete Account</label>
                    <div className="placeholder"></div>
                  </div>
                </>
              ) : (
                <></>
              )}
            </div>
          </div>
        </>
      ) : (
        <></>
      )}
    </>
  );
}

export default Menu;
