//------------------------
// AUTHOR: Jan Wittrowski
//------------------------

//EXTERNAL
import React, {useState, useEffect} from "react";

//LOCAL
import Login from "./pages/login";
import GroupChat from "./pages/groupchat";
import Menu from "./components/menu";
import Register from "./pages/register";
import TitleBar from "./components/titlebar";

//TOOLS
import LocalStorageHandler from "./tools/localstoragehandler";

//CUSTOM HOOKS
import useActiveState from "./hooks/useActiveState";
import useAuth from "./hooks/useAuth";

//FETCHES
import { logoutPost } from "./api/Fetcher";

//CSS
import "./styles/main.css";

function App() {

  const storageHandler = LocalStorageHandler();

  const { auth, setAuth } = useAuth();
  const { activeState,setActiveState } = useActiveState();
  const [ menuStatus, setMenuStatus ] = useState(false);
  const [ messageHistory, setmessageHistory ] = useState([]);

  const toggleMenuStatus = () => {
    setMenuStatus(!menuStatus);
  }
  const updateAuth = (status) => {
    setAuth(status);
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
      updateActiveState("groupChat");
    }
  }, [])

  //Fetches

  const LogoutHandler = async () => {
    const response = await logoutPost(auth.token);

    if(response.data.status === "ok"){
      updateActiveState("loggedOut");
      updateAuth({});
      storageHandler.clearLocalStorage();
    }
  }

  //Stateful Content-Generation
  
  const getTitle = () =>{
    switch (activeState[0]){
      case "loggedOut":
        return "Login";
      case "register":
        return "Register";
      case "groupChat":
        return "Group Chat";
    }
  }

  const generateBackButtonTexts = () => {
    if(activeState[0] == "groupChat" && activeState[1] == "loggedOut"){
      return{
        gobackMsg: "This will log you out and take you to the login screen. Do you want to continue?",
        confirmMsg: "Log me Out!",
        abortMsg: "Stay",
        callback: LogoutHandler
      }
    }
    return null;
  }

  //keep state here, initialize in groupChat

  return (
    <>
    <div className="background">
      <div className="mainContainer">
      <TitleBar 
        toggleMenuStatus={toggleMenuStatus} 
        title={getTitle()} 
        backButtonInfo={generateBackButtonTexts()}
        messageHistory={messageHistory}
      />
      <Menu 
        toggleMenuStatus={toggleMenuStatus} 
        status={menuStatus} 
        LogoutHandler={LogoutHandler} 
      />

      {activeState[0] == "loggedOut" ? (<Login />) : (<></>) }
      {activeState[0] == "register" ? (<Register />) : (<></>) }
      {activeState[0] == "groupChat" 
      ? 
      (<GroupChat messageHistory={messageHistory} updateMessageHistory={updateMessageHistory} />) 
      : 
      (<></>) }
        </div>
    </div>
    </>
  );
}

export default App;
