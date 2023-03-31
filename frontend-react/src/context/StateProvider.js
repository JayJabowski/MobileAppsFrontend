//------------------------
// AUTHOR: Jan Wittrowski
//------------------------

import React, { createContext, useState } from "react";

//Context that provides availability to groups from all enclosed children
const StateContext = createContext("");

export const StateProvider = ({ children }) => {
  const [activeState, setActiveState] = useState("groupChat");

  return (
    <StateContext.Provider value={{ activeState, setActiveState }}>
      {children}
    </StateContext.Provider>
  );
};

export default StateContext;
