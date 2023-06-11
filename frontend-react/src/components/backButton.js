import React, {useState, useEffect} from 'react';
import useActiveState from '../hooks/useActiveState';

function BackButton() {
    const {activeState, setActiveState} = useActiveState();
    const [isBackButtonActive, setBackButtonActive] = useState(activeState.length > 1);

    const updateBackButtonActive = (bool) =>{
        setBackButtonActive(bool);
    }

    useEffect(() => {
        updateBackButtonActive(activeState.length > 1);
    }, [activeState])

    const goBack = () => {
            //remove first element of Array
            activeState.shift();

            const tmpState  = [...activeState];
            setActiveState(tmpState);
      }

    return ( 
        <>
            <button disabled={!isBackButtonActive} onClick={() => goBack()}>Back</button>
        </>
     );
}

export default BackButton;


/*
Back-Button:
 groupChat ->  showLogout popup -> Login
 Register -> Login
 Photo-Capture -> groupChat
 
*/
