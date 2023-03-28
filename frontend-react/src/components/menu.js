import React from 'react'
import useActiveState from '../hooks/useActiveState';

function Menu({callback}) {
    const {activeState, setActiveState} = useActiveState();

    const updateActiveState = (state) => {
        setActiveState(state);
    }


    return (
        <>
        <div onClick={(e) => {
            updateActiveState("loggedOut");
            callback("menuNotShown");
        }}>
            Logout
        </div>
        </>
      );
}

export default Menu;