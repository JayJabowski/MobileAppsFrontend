//------------------------
// AUTHOR: Jan Wittrowski
//------------------------

import axios from "./axios";

/*
const getAllCustomers = async (token) => {
  const response = await axios.get("Customer", {
    headers: { "Content-Type": "application/json", Authorization: token },
    withCredentials: true
  });

  return response;
};

const updateCustomer = async (customerObj, token) => {
  const response = await axios.put("Customer", customerObj, {
    headers: { "Content-Type": "application/json", Authorization: token },
    withCredentials: true
  });

  return response;
};

const addCustomer = async (customerObj, token) => {
  const response = await axios.post("Customer", customerObj, {
    headers: { "Content-Type": "application/json", Authorization: token },
    withCredentials: true
  });

  return response;
};
const deleteCustomer = async (customerObj, token) => {
  const response = await axios.delete(`Customer/${customerObj.id}`, {
    headers: { "Content-Type": "application/json", Authorization: token },
    withCredentials: true
  });

  return response;
};

*/

const fetchLogin = async(user,pass) =>{
//returns token in response.data
  const lazyFix = pass || "WeakArmsStrongPasswords";

  const response = await axios.get(`?request=login&userid=${user}&password=${lazyFix}`, {
    headers: { "Content-Type": "application/json"}
  });

  return response;

}

const register = async ({userid, nickname,fullname, password})=> {
//returns token in response.data

  const response = await axios.get(`?request=register&userid=${userid}&password=${password}&nickname=${nickname}&fullname=${fullname}`, {
    headers: { "Content-Type": "application/json"}
  });

  return response;

}

const fetchMessages = async (token) => {
  const response = await axios.get(`?request=fetchmessages&token=${token}`, {
    headers: { "Content-Type": "application/json"}
  });

  return response;
}

const sendMessage = async (token, message) =>{
  const response = await axios.get(`?request=sendmessage&token=${token}&text=${message}`, {
    headers: { "Content-Type": "application/json"}
  });

  return response;
}

const logout = async (token) => {
  const response = await axios.get(`?request=logout&token=${token}`, {
    headers: { "Content-Type": "application/json" }
  });
  return response;
}

export {
  fetchLogin,
  logout,
  register,
  fetchMessages,
  sendMessage
}