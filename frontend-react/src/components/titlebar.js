import React, {useState} from 'react'

//React Local
import useAuth from '../hooks/useAuth';

//Components
import BackButton from './backButton';
import SearchButton from './searchButton';
import Menu from './menu';

import useActiveTheme from '../hooks/useActiveTheme';


function TitleBar({ title, backButtonInfo, messageHistory, LogoutHandler}) {
    const { auth, setAuth } = useAuth();
    const { isLight } = useActiveTheme();

    const [ menuStatus, setMenuStatus ] = useState(false);

    const toggleMenuStatus = () => {
        setMenuStatus(!menuStatus);
      }

    return ( 
        <div className='titleBar'>
            <div className="titleLeft">
                <BackButton 
                    {...backButtonInfo} 
                />
            </div>
            <div className="title">{title}</div>
            <div className="titleRight">
                <SearchButton  
                    messageHistory={messageHistory}
                />
                <Menu 
                    LogoutHandler={LogoutHandler} 
                />
            </div> 
        </div>
     );
}

export default TitleBar;