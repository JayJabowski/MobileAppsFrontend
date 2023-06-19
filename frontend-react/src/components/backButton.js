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
                console.dir({
                    callback, activeState, gobackMsg
                })

                //remove first element of Array
                activeState.shift();
                
                const tmpState  = [...activeState];
                setActiveState(tmpState);
                updatePopUpVisible(false);
                callback && await callback();
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
            <div className='backButtonPopupWrapper' onClick={(e) => {
                updatePopUpVisible(false)
                e.stopPropagation();
                }}>

                <div className='backPopup' onClick={(e) => e.stopPropagation()}>
                    <p>{gobackMsg}</p>
                    <button className='breakButton' onClick={() => goBack()}>{confirmMsg}</button>
                    <button className='breakButton' onClick={() => updatePopUpVisible(false)}>{abortMsg}</button>
                </div>

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
