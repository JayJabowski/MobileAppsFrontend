import React from 'react'
import useAuth from '../hooks/useAuth';

function TitleBar({callback, title}) {
    const { auth } = useAuth();


    return ( 
        <div className='titleBar'>
        { auth.token 
            ? <div className='menuButton' onClick={() => { callback();}}>
                <input type="checkbox" id="menuToggle"/></div> 
            : <></> }
        <div className="title">{title}</div>
        </div>
     );
}

export default TitleBar;