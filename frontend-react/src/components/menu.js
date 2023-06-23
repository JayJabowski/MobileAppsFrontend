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
import xDark from "../icons/x_dark.svg"
import xLight from "../icons/x_light.svg"

import userDark from "../icons/user_dark.svg";
import userLight from "../icons/user_light.svg";
import Popup from "./Popup";

function Menu({ LogoutHandler, DeregisterHandler }) {
  const { isLight } = useActiveTheme();
  const { auth } = useAuth();

  const ref = useRef(null);

  const [menuVisible, setmenuVisible] = useState(false);
  const [deletePopup, setDeletePopup] = useState(false);
  const [logoutPopup, setLogoutPopup]= useState(false);

  const updateMenuVisible = (bool) => {
    setmenuVisible(bool);
  };

  const updateDeletePopup = (bool) => {
    setDeletePopup(bool);
  }
  const updateLogoutPopup = (bool) => {
    setLogoutPopup(bool);
  }

  return (
    <>
      {deletePopup 
      ?
      <Popup message={"WARNING: This will delete your account. Are you certain you want to proceed?"}
            acceptText={`Delete ${auth.user}`}
            rejectText={"Stay"}
            onAccept={() => {
              DeregisterHandler();
              updateMenuVisible(false);
              updateDeletePopup(false);
            }}
            onReject={() => {
              updateDeletePopup(false);
              updateMenuVisible(true);
            }}
            />
        :
        <></>
        }

      {logoutPopup 
        ?
        <Popup message={"This will log you out and take you to the login screen. Do you want to continue?"}
              acceptText={`Log Me Out!`}
              rejectText={"Stay"}
              onAccept={() => {
                LogoutHandler();
                updateMenuVisible(false);
                updateLogoutPopup(false);
              }}
              onReject={() => {
                updateLogoutPopup(false);
                updateMenuVisible(true);
              }}
              />
          :
          <></>
      } 

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
                <button onClick={() => updateMenuVisible(false)}>
                <img alt="close" src={isLight ? xDark : xLight} />
                </button>
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
                    className="menuItem clickable"
                    onClick={(e) => {
                      updateLogoutPopup(true);
                    }}
                  >
                    <label>Logout</label>
                    <div className="placeholder"></div>
                  </div>
                  
                  <div
                    className="menuItem clickable"
                    onClick={(e) => {
                      updateDeletePopup(true);
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
