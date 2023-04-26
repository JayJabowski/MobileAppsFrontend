//------------------------
// AUTHOR: Jan Wittrowski
//------------------------

import axios from "./axios";

const fetchLogin = async(user,pass) =>{
//returns token in response.data
  const lazyFix = pass || "WeakArmsStrongPasswords";

  const response = await axios.get(`?request=login&userid=${user}&password=${lazyFix}`, {
    headers: { "Content-Type": "application/json",
              "Cache-Control": "max-age=604800"
              }
  });

  return response;

}

const fetchLoginPost = async(user,pass) =>{
//returns token in response.data
  const lazyFix = pass || "WeakArmsStrongPasswords";

  const request = {
    request : "login",
    userid: user,
    password: lazyFix
  }

  const response = await axios.post("",request, {
    headers: { "Content-Type": "application/json",
              }
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

const registerPost = async (Obj)=> {
//returns token in response.data

  const request = {
    request: "register",
    ...Obj
  }

  const response = await axios.post("", request, {
    headers: { "Content-Type": "application/json"}
  });

  return response;

}

const fetchMessages = async (token) => {
  const response = await axios.get(`?request=fetchmessages&token=${token}`, {
    headers: { "Content-Type": "application/json"
              }
  });

  return response;
}

const fetchMessagesPost = async (token) => {

  const request = {
    token,
    request : "fetchmessages"
  }

  const response = await axios.post("",request, {
    headers: { "Content-Type": "application/json"
              }
  });

  return response;
}

const sendMessage = async (token, message) =>{
  const response = await axios.get(`?request=sendmessage&token=${token}&text=${message}`, {
    headers: { "Content-Type": "application/json"}
  });

  return response;
}
const sendMessagePost = async (token, message) =>{

  const request = {
    token,
    request : "sendmessage",
    text: message
  }

  const response = await axios.post("",request, {
    headers: { "Content-Type": "application/json"
              }
  });

  return response;
}

const logout = async (token) => {
  const response = await axios.get(`?request=logout&token=${token}`, {
    headers: { "Content-Type": "application/json" }
  });
  return response;
}
const logoutPost = async (token) => {

  const request = {
    request: "logout",
    token
  }
  
  const response = await axios.post("", request, {
    headers: { "Content-Type": "application/json" }
  });
  return response;
}

const fetchPhoto = async (token, photoid) =>{

  const request = {
    request: "fetchphoto",
    token,  
    photoid
  }
  
  const response = await axios.post("", request, {
    headers: { "Content-Type": "application/json" },
    responseType : "blob"
  });
  return response;
}

export {
  fetchLogin,
  fetchLoginPost,
  logout,
  logoutPost,
  register,
  registerPost,
  fetchMessages,
  fetchMessagesPost,
  sendMessage,
  sendMessagePost,
  fetchPhoto
}