import React, {useState, useEffect} from 'react';
import useActiveState from '../hooks/useActiveState';
import useActiveTheme from '../hooks/useActiveTheme';

//Images
import backDark from "../icons/back_dark.svg"
import backLight from "../icons/back_light.svg"

function BackButton({gobackMsg, confirmMsg, abortMsg, callback}) {
    const {isLight} = useActiveTheme();

    const {activeState, setActiveState} = useActiveState();
    const [isBackButtonActive, setBackButtonActive] = useState(activeState.length > 1);
    const [popupVisible, setPopupVisible] = useState(false);

    const updateBackButtonActive = (bool) =>{
        setBackButtonActive(bool);
    }
    const updatePopUpVisible = (bool) =>{
        setPopupVisible(bool);
    }

    useEffect(() => {
        updateBackButtonActive(activeState.length > 1);
    }, [activeState])

    const goBack = async () => {

                //remove first element of Array
                activeState.shift();
                
                const tmpState  = [...activeState];
                setActiveState(tmpState);
                updatePopUpVisible(false);
                callback && callback();
      }

    return ( 
        <div className='backButtonWrapper'>
            <button className="titleButton" disabled={!isBackButtonActive} onClick={gobackMsg ? 
            () => updatePopUpVisible(true)
            :
            () => goBack()
            }>
                <img alt="back" src={ isLight ? backDark : backLight} />
            </button>

            {popupVisible 
            ? 
            <div className='backPopup'>
                <p>{gobackMsg}</p>
                <button onClick={() => goBack()}>{confirmMsg}</button>
                <button onClick={() => updatePopUpVisible(false)}>{abortMsg}</button>
            </div>
            :
            <></>
            }
        </div>
     );
}

export default BackButton;


/*
Back-Button:
 groupChat ->  showLogout popup -> Login
 Register -> Login
 Photo-Capture -> groupChat
 
*/
