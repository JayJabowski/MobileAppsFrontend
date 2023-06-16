import React, {useState, useEffect, useRef} from "react";
import FontSizeChanger from "./fontSizechanger";
import ThemeChanger from "./ThemeChanger";

//Context
import useActiveTheme from "../hooks/useActiveTheme";
import useAuth from "../hooks/useAuth";

//Pictures
import closeDark from "../icons/close_big_dark.svg"
import closeLight from "../icons/close_big_light.svg"

import userDark from "../icons/user_dark.svg";
import userLight from "../icons/user_light.svg";



function Menu({ LogoutHandler, DeregisterHandler }) {
  const {isLight} = useActiveTheme();
  const {auth} = useAuth();

  const ref = useRef(null);

  const [ menuVisible, setmenuVisible ] = useState(false);

  const updateMenuVisible = (bool) => {
    setmenuVisible(bool);
  }

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        updateMenuVisible(false);
      }
    };
    document.addEventListener('click', handleClickOutside, true);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [ updateMenuVisible ]);


  return (
    <>
      { auth.token 
      ?
        <>
        {
        !menuVisible 
        ?
        <div className='titleButton' onClick={() => updateMenuVisible(!menuVisible)}>
          <img alt="menu" src={isLight ? userDark : userLight} />
        </div>
        :
        <div className='titleButton' onClick={() => updateMenuVisible(!menuVisible)}>
          <img alt="menu" src={isLight ? closeDark : closeLight} />
        </div> 
        }
        </>
      :
      <></>
      }

      {
        menuVisible
        ?
        <>
         <div className="menuNew" ref={ref} >
          <div
            className="menuItem"
            onClick={(e) => {
              LogoutHandler();
              updateMenuVisible(false);
            }}
            >
            Logout
          </div>
          <div
             className="menuItem"
             onClick={ (e) => {
                DeregisterHandler();
                updateMenuVisible(false);
             }}
             >
              Delete Account
          </div>
          <div
            className="menuItem"
            onClick={(e) => {
              updateMenuVisible(false);
            }}
            >
            Close Menu
          </div>
          <FontSizeChanger />
          <ThemeChanger />
        </div>
        </>
        :
        <>
        </>
      }
    </>
  );
}

export default Menu;
