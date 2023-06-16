//------------------------
// AUTHOR: Jan Wittrowski
//------------------------

import axios from "./axios";

// HELPERS

const getDateInFuture = (MonthsInAdvance) => {
  const today = new Date();
  const expires = new Date(today.setMonth(today.getMonth() + MonthsInAdvance));
  console.log(expires);

  return expires;
};

//------------------------
// GET-Overhaul
//------------------------

const loginGET = async (user, pass) => {
  //returns token in response.data
  const lazyFix = pass || "WeakArmsStrongPasswords";

  const response = await axios.get(
    `?request=login&userid=${user}&password=${lazyFix}`
  );

  return response;
};

const registerGET = async ({ userid, fullname, nickname, password }) => {
  const response = await axios.get(
    `?request=register&userid=${userid}&fullname=${fullname}&nickname=${nickname}&password=${password}`,
    { headers: { "Content-Type": "application/json" } }
  );

  return response;
};

const fetchMessagesGET = async (token) => {
  const response = await axios.get(`?request=fetchmessages&token=${token}`, {
    headers: { "Content-Type": "application/json" }
  });

  return response;
};

const logoutGET = async (token) => {
  const response = await axios.get(`?request=logout&token=${token}`, {
    headers: { "Content-Type": "application/json" }
  });

  return response;
};

const deregisterGET = async (token) => {
  const response = await axios.get(`?request=deregister&token=${token}`, {
    headers: { "Content-Type": "application/json" }
  });

  return response;
};

const fetchPhotoGET = async (token, photoid) => {
  const response = await axios.get(
    `?request=fetchphoto&photoid=${photoid}&token=${token}`,
    {
      headers: { "Content-Type": "application/json" },
      responseType: "blob"
    }
  );

  return response;
};

const sendMessagePost = async (token, message) => {
  const request = {
    token,
    request: "sendmessage",
    text: message
  };

  const response = await axios.post("", request, {
    headers: { "Content-Type": "application/json" }
  });

  return response;
};

//------------------------
// Deprecated
//------------------------

const fetchLoginPost = async (user, pass) => {
  //returns token in response.data
  try {
    const lazyFix = pass || "WeakArmsStrongPasswords";

    const request = {
      request: "login",
      userid: user,
      password: lazyFix
    };

    const response = await axios.post("", request, {
      headers: { "Content-Type": "application/json" }
    });

    return response;
  } catch (err) {
    return err.response;
  }
};
const registerPost = async (Obj) => {
  //returns token in response.data

  const request = {
    request: "register",
    ...Obj
  };

  const response = await axios.post("", request, {
    headers: { "Content-Type": "application/json" }
  });

  return response;
};
const fetchMessagesPost = async (token) => {
  const request = {
    token,
    request: "fetchmessages"
  };

  const response = await axios.post("", request, {
    headers: { "Content-Type": "application/json" }
  });

  return response;
};
const logoutPost = async (token) => {
  const request = {
    request: "logout",
    token
  };

  const response = await axios.post("", request, {
    headers: { "Content-Type": "application/json" }
  });
  return response;
};
const fetchPhoto = async (token, photoid) => {
  const request = {
    request: "fetchphoto",
    token,
    photoid
  };

  const response = await axios.post("", request, {
    headers: { "Content-Type": "application/json" },
    responseType: "blob"
  });
  return response;
};

export {
  loginGET as login,
  logoutGET as logout,
  registerGET as register,
  deregisterGET as deregister,
  fetchMessagesGET as fetchMessages,
  sendMessagePost as sendMessage,
  fetchPhotoGET as fetchPhoto
};
