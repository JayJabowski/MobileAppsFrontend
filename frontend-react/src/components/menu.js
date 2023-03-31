import React from "react";
import useActiveState from "../hooks/useActiveState";

function Menu({ callback }) {
  const { activeState, setActiveState } = useActiveState();

  const updateActiveState = (state) => {
    setActiveState(state);
  };

  return (
    <>
      <div className="menu">
        <div
          className="menuItem"
          onClick={(e) => {
            updateActiveState("loggedOut");
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
