//------------------------
// AUTHOR: Jan Wittrowski
//------------------------

import { useContext } from "react";
import CustomerContext from "../context/CustomerProvider";

const useCustomers = () => {
  return useContext(CustomerContext);
};

export default useCustomers;
