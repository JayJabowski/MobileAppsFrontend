//------------------------
// AUTHOR: Jan Wittrowski
//------------------------

//EXTERNAL
import React, {useState, useEffect} from "react";

//LOCAL
import Login from "./pages/login";
import GroupChat from "./pages/groupchat";
import Title from "./pages/title";
import Register from "./pages/register";
import TitleBar from "./components/titlebar";

//TOOLS
import LocalStorageHandler from "./tools/localstoragehandler";

//CUSTOM HOOKS
import useActiveState from "./hooks/useActiveState";
import useAuth from "./hooks/useAuth";

//FETCHES
import { deregister, logout } from "./api/Fetcher";

//CSS
import "./styles/main.css";
import useActiveTheme from "./hooks/useActiveTheme";

function App() {

  const storageHandler = LocalStorageHandler();

  const { auth, setAuth } = useAuth();
  const { isLight, setIsLight } = useActiveTheme();
  const { activeState,setActiveState } = useActiveState();
  const [ messageHistory, setmessageHistory ] = useState([]);


  const updateAuth = (status) => {
    setAuth(status);
  }

  const updateTheme = (bool) => {
    setIsLight(bool);
  }
  const updateActiveState = (status) => {
    const tmpStates= [ status, ...activeState];
    
    setActiveState(tmpStates);
  }

  const updateMessageHistory = (arr) => {
    setmessageHistory(arr);
  }

  useEffect(() => {
 
    const tempAuth = storageHandler.getLoginFromStorage();
    if(tempAuth.token){
      updateAuth(tempAuth);
      updateTheme(tempAuth.theme);
      //work-around to get logout msg at back button in group chat
      updateActiveState("login");
      updateActiveState("groupChat");
    }
  }, [])

  //Fetches

  const LogoutHandler = async () => {
    const response = await logout(auth.token);

    if(response.data.code === 200){
      updateActiveState("title");
      updateAuth({});
      storageHandler.clearLocalStorage();
    }
  }

  const DeregisterHandler = async () => {
    const response = await deregister(auth.token);

    if(response.data.code === 200){
      updateActiveState("title");
      updateAuth({});
      storageHandler.clearLocalStorage();
    }
  }

  //Stateful Content-Generation
  
  const getTitle = () =>{
    switch (activeState[0]){
      case "login":
        return "Sign In";
      case "register":
        return "Sign Up";
      case "groupChat":
        return "Group Chat";
      case "title":
        return "Welcome";
    }
  }

  const generateBackButtonTexts = () => {
    if(activeState[0] == "groupChat"){
      return{
        gobackMsg: "This will log you out and take you to the login screen. Do you want to continue?",
        confirmMsg: "Log me Out!",
        abortMsg: "Stay",
        callback: LogoutHandler
      }
    }
    return null;
  }

  return (
    <>
    <div className="background">
      <div className="mainContainer">
      <TitleBar 
        title={getTitle()} 
        backButtonInfo={generateBackButtonTexts()}
        messageHistory={messageHistory} 
        LogoutHandler={LogoutHandler}
        DeregisterHandler={DeregisterHandler}
      />

      {activeState[0] == "title" ? (<Title />) : (<></>) }
      {activeState[0] == "login" ? (<Login />) : (<></>) }
      {activeState[0] == "register" ? (<Register />) : (<></>) }
      {activeState[0] == "groupChat" ? (<GroupChat 
                    messageHistory={messageHistory} 
                    updateMessageHistory={updateMessageHistory} 
                    />) : (<></>) }
        </div>
    </div>
    </>
  );
}

export default App;
