import React from 'react'
import useAuth from '../hooks/useAuth';
import BackButton from './backButton';

function TitleBar({callback, title}) {
    const { auth } = useAuth();


    return ( 
        <div className='titleBar'>
            <BackButton />
        <div className="title">{title}</div>
            <div className='menuButton' onClick={auth.token ? callback : null}>
                <input type="checkbox" id="menuToggle"/>
            </div> 
        </div>
     );
}

export default TitleBar;