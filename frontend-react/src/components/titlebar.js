import React from 'react'
import useAuth from '../hooks/useAuth';

function TitleBar({callback, title}) {
    const { auth } = useAuth();


    return ( 
        <div className='titleBar'>
        { auth.token ? <button className='menuButton' onClick={() => {
            callback("menuShown");
        }}>Menu</button> : <></> }
        <div className="title">{title}</div>
        </div>
     );
}

export default TitleBar;