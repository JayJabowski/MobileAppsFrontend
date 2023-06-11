//------------------------
// AUTHOR: Jan Wittrowski
//------------------------

import axios from "./axios";

const fetchLoginPost = async(user,pass) =>{
//returns token in response.data
  try{

    const lazyFix = pass || "WeakArmsStrongPasswords";
    
    const request = {
      request : "login",
      userid: user,
      password: lazyFix
    }
    
    const response = await axios.post("",request, {
      headers: { "Content-Type": "application/json"
      }
    });
  
  return response;

  }catch(err){
    return err.response;
  } 

}
const fetchLoginGet = async(user,pass) =>{
//returns token in response.data
  const lazyFix = pass || "WeakArmsStrongPasswords";

  const response = await axios.get(`request=login&userid=${user}&password=${lazyFix}`, {
    headers: { "Content-Type": "application/json"
               }
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

const sendMessagePost = async (token, message) =>{

  const request = {
    token,
    request : "sendmessage",
    text: message
  }

  const response = await axios.post("",request, {
    headers: { "Content-Type": "application/json",
              }
  });

  return response;
}

const logoutPost = async (token) => {

  const request = {
    request: "logout",
    token
  }
  
  const response = await axios.post("", request, {
    headers: { "Content-Type": "application/json"}});
  return response;
}

const fetchPhoto = async (token, photoid) =>{

  const request = {
    request: "fetchphoto",
    token,  
    photoid
  }
  
  const response = await axios.post("", request, {
    headers: { "Content-Type": "application/json",
              },
    responseType : "blob"
  });
  return response;
}

// HELPERS

const getDateInFuture = (MonthsInAdvance) => {
  const today = new Date();
  const expires =  new Date(today.setMonth(today.getMonth()+MonthsInAdvance));
  console.log(expires);

  return expires;
}

export {
  fetchLoginPost,
  logoutPost,
  registerPost,
  fetchMessagesPost,
  sendMessagePost,
  fetchPhoto
}