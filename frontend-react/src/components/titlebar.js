import React from 'react'
import useAuth from '../hooks/useAuth';

function TitleBar({callback, title}) {
    const { auth } = useAuth();


    return ( 
        <div className='titleBar'>
            <div className='menuButton' onClick={auth.token ? callback : null}>
                <input type="checkbox" id="menuToggle"/>
            </div> 
        <div className="title">{title}</div>
        </div>
     );
}

export default TitleBar;