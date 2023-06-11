import React from 'react'

//React Local
import useAuth from '../hooks/useAuth';
import useActiveState from "../hooks/useActiveState";

//Fetches
import { logoutPost } from "../api/Fetcher";
import BackButton from './backButton';
import SearchButton from './searchButton';

//Back-End
import LocalStorageHandler from "../tools/localstoragehandler";


function TitleBar({toggleMenuStatus, title, backButtonInfo, messageHistory}) {
    const { auth, setAuth } = useAuth();
 
    return ( 
        <div className='titleBar'>
            <BackButton {...backButtonInfo} />
        <div className="title">{title}</div>
            <div className='menuButton' onClick={auth.token ? toggleMenuStatus : null}>
                <input type="checkbox" id="menuToggle"/>
            </div> 
         <SearchButton  messageHistory={messageHistory}/>
        </div>
     );
}

export default TitleBar;