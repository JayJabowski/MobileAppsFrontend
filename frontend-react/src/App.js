//------------------------
// AUTHOR: Jan Wittrowski
//------------------------

//EXTERNAL
import React, {useState} from "react";

//LOCAL
import Login from "./pages/login";
import GroupChat from "./pages/groupchat";

//CSS
import useActiveState from "./hooks/useActiveState";
import useAuth from "./hooks/useAuth";

function App() {
  const { auth } = useAuth();
  const { activeState } = useActiveState();
  const [ menuStatus, setMenuStatus ] = useState("menuNotShown")

  const updateMenuStatus = (status) => {
    setMenuStatus(status);
  }

  console.log(activeState)

  return (
    <>
     { menuStatus == "menuShown" ? (<Menu callback={updateMenuStatus} />) : (<></>)}
     {activeState == "loggedOut" ? (<Login />) : (<></>) }
     {activeState == "groupChat" ? (<GroupChat />) : (<></>) }
    </>
  );
}

export default App;
