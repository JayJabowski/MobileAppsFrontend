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

//TOOLS
import LocalStorageHandler from "./tools/localstoragehandler";

//CSS
import useActiveState from "./hooks/useActiveState";
import useAuth from "./hooks/useAuth";
import TitleBar from "./components/titlebar";


function App() {

  const storageHandler = LocalStorageHandler();

  const { auth, setAuth } = useAuth();
  const { activeState,setActiveState } = useActiveState();
  const [ menuStatus, setMenuStatus ] = useState("menuNotShown")

  const updateMenuStatus = (status) => {
    setMenuStatus(status);
  }
  const updateAuth = (status) => {
    setAuth(status);
  }
  const updateActiveState = (status) => {
    setActiveState(status);
  }

  useEffect(() => {
    const tempAuth = storageHandler.getLoginFromStorage();
    if(tempAuth.token){
      updateAuth(tempAuth);
      updateActiveState("groupChat");
    }
  }, [])
  
  const getTitle = () =>{
    switch (activeState){
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
    <div className="fullPage">
      <div className="mainContainer">
      <TitleBar callback={updateMenuStatus} title={getTitle()} />
     {menuStatus == "menuShown" ? (<Menu callback={updateMenuStatus} />) : (<></>)}
     {activeState == "loggedOut" ? (<Login />) : (<></>) }
     {activeState == "register" ? (<Register />) : (<></>) }
     {activeState == "groupChat" ? (<GroupChat />) : (<></>) }
      </div>
    </div>
    </>
  );
}

export default App;
