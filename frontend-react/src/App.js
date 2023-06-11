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

//CSS
import "./styles/main.css";

function App() {

  const storageHandler = LocalStorageHandler();

  const { auth, setAuth } = useAuth();
  const { activeState,setActiveState } = useActiveState();
  const [ menuStatus, setMenuStatus ] = useState(false);

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

  useEffect(() => {
    const tempAuth = storageHandler.getLoginFromStorage();
    if(tempAuth.token){
      updateAuth(tempAuth);
      updateActiveState("groupChat");
    }
  }, [])
  
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



  return (
    <>
    <div className="background">
      <div className="mainContainer">
      <TitleBar callback={toggleMenuStatus} title={getTitle()} />
      <Menu callback={toggleMenuStatus} status={menuStatus} />
      {activeState[0] == "loggedOut" ? (<Login />) : (<></>) }
      {activeState[0] == "register" ? (<Register />) : (<></>) }
      {activeState[0] == "groupChat" ? (<GroupChat />) : (<></>) }
        </div>
    </div>
    </>
  );
}

export default App;
