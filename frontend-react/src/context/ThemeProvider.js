//------------------------
// AUTHOR: Jan Wittrowski
//------------------------

import React, { createContext, useState } from "react";
import LocalStorageHandler from "../tools/localstoragehandler";

//Context that provides availability to groups from all enclosed children
const ThemeContext = createContext("");

export const ThemeProvider = ({ children }) => {
  const [isLight, setIsLight] = useState(true);

  const initializeTheme = () => {
    if(localStorage.getItem("isLight") == null){
      localStorage.setItem("isLight", true);
     }
     else{
      const isLight = localStorage.getItem("isLight")
      setIsLight(isLight);
     }
  }

  return (
    <ThemeContext.Provider value={{ isLight, setIsLight, initializeTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeContext;
