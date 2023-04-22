import axios from "./axios";

const BASE_URL = "https://www2.hs-esslingen.de/~melcher/map/chat/api/";

const fetchLoginNew = (user, pass) => {
  
  const lazyFix = pass || "WeakArmsStrongPasswords";

  const response = fetch(
    `${BASE_URL}?request=login&userid=${user}&password=${lazyFix}`
  )
  .then((response) => response.json())
  .catch((err) => console.dir(err))

  return response;
};

const register = async ({ userid, nickname, fullname, password }) => {
  //returns token in response.data

  const response = await axios.get(
    `?request=register&userid=${userid}&password=${password}&nickname=${nickname}&fullname=${fullname}`,
    {
      headers: { "Content-Type": "application/json" }
    }
  );

  return response;
};

const fetchMessages = async (token) => {
  const response = await axios.get(`?request=fetchmessages&token=${token}`, {
    headers: { "Content-Type": "application/json" }
  });

  return response;
};

const sendMessage = async (token, message) => {
  const response = await axios.get(
    `?request=sendmessage&token=${token}&text=${message}`,
    {
      headers: { "Content-Type": "application/json" }
    }
  );

  return response;
};

const logout = async (token) => {
  const response = await axios.get(`?request=logout&token=${token}`, {
    headers: { "Content-Type": "application/json" }
  });
  return response;
};

export { fetchLoginNew, logout, register, fetchMessages, sendMessage };
