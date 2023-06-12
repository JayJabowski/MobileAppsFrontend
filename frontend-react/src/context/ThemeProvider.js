//------------------------
// AUTHOR: Jan Wittrowski
//------------------------

import React, { createContext, useState } from "react";

//Context that provides availability to groups from all enclosed children
const ThemeContext = createContext("");

export const ThemeProvider = ({ children }) => {
  const [isLight, setIsLight] = useState(true);

  return (
    <ThemeContext.Provider value={{ isLight, setIsLight }}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeContext;
