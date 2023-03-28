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
  //TODO: replace token

  const response = await axios.get("login", {
    headers: { "Content-Type": "application/json", Authorization: "REPLACE ME" },
    withCredentials: true
  });

  return response;

}

export {
  fetchLogin
}