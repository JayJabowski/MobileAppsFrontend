import React, { useEffect, useState } from "react";
import useActiveState from "../hooks/useActiveState";

function Title() {
  const { activeState, setActiveState } = useActiveState();

  //useState-Setter
  const updateActiveState = (status) => {
    const tmpStates = [status, ...activeState];

    setActiveState(tmpStates);
  };

  return (
    <div className="loginRegister">

      <div className="infoParagraphWrapper">
        <h1>Chat.</h1>
        <p className="infoParagraph">
          This is a <span>chat client</span> realized as part of the 'Mobile
          Apps and User Experience' lecture at <span>Hochschule Esslingen</span>{" "}
          in summer semester 2023.
          <br /> It was implemented by <span>Jan Wittrowski</span>. Enjoy!
        </p>
      </div>

      <button
        className="breakButton hoverWhite"
        onClick={() => updateActiveState("login")}
      >
        Login
      </button>

      <button
        className="breakButton hoverWhite"
        onClick={() => updateActiveState("register")}
      >
        Sign Up
      </button>

      <p>&copy; 2023</p>
    </div>
  );
}

export default Title;
