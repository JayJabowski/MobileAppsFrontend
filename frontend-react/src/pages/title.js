import React, { useEffect, useState } from "react";
import useActiveState from "../hooks/useActiveState";
import useAuth from "../hooks/useAuth";
import LocalStorageHandler from "../tools/localstoragehandler";
import useActiveTheme from "../hooks/useActiveTheme";

function Title({msg}) {
  const storageHandler = LocalStorageHandler()

  const { activeState, setActiveState } = useActiveState();
  const { isLight, setIsLight, initializeTheme } = useActiveTheme();
  
  //useState-Setter
  const updateActiveState = (status) => {
    const tmpStates= [ status, ...activeState];
    
    setActiveState(tmpStates);
  }
  const updateActiveTheme = (bool) => {
    setIsLight(bool);
  }
  
  return (
    <div className="loginRegister">

      <div className="infoParagraphWrapper">
        <h1>Chat.</h1>
        <p className="infoParagraph">
          This is a <span>chat client</span> realized as part of the 'Mobile Apps and User Experience' lecture at <span>Hochschule Esslingen</span> in summer semester 2023.<br/> It was implemented by <span>Jan Wittrowski</span>. Enjoy!
        </p>

      </div>

        <button className="breakButton" onClick={() => updateActiveState("login")}>Login</button>
        <button className="breakButton" onClick={() => updateActiveState("register")}>Sign Up</button>
      
        <p>
            &copy; 2023
        </p>
    </div>
  );
}

export default Title;
