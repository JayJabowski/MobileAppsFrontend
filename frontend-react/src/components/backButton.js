import React, {useState, useEffect} from 'react';
import useActiveState from '../hooks/useActiveState';
import useActiveTheme from '../hooks/useActiveTheme';
import useAuth from '../hooks/useAuth';

//Images
import backDark from "../icons/back_dark.svg"
import backLight from "../icons/back_light.svg"
import Popup from './Popup';

function BackButton({gobackMsg, confirmMsg, abortMsg, callback}) {
    const {isLight} = useActiveTheme();
    const{ auth } = useAuth();

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
        
        const tmpState  = auth.token ? [...activeState] : ["title"];
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
            <Popup message={gobackMsg} acceptText={confirmMsg} rejectText={abortMsg} 
                onAccept={goBack}
                onReject={() => updatePopUpVisible(false)}
                />
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
