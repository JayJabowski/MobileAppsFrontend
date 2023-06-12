//------------------------
// AUTHOR: Jan Wittrowski
//------------------------

import { useContext } from "react";
import ThemeContext from "../context/ThemeProvider";

const useActiveTheme = () => {
  return useContext(ThemeContext);
};

export default useActiveTheme;
