//------------------------
// AUTHOR: Jan Wittrowski
//------------------------

import { useContext } from "react";
import StateContext from "../context/StateProvider";

const useActiveState = () => {
  return useContext(StateContext);
};

export default useActiveState;
