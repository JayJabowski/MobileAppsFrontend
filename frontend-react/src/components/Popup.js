import React from 'react';
import useActiveTheme from '../hooks/useActiveTheme';

function Popup({ message, acceptText, rejectText, onAccept, onReject}) {   
    return ( 
        <div className='backButtonPopupWrapper' onClick={(e) => {
            onReject();
            e.stopPropagation();
            }}>

            <div className='backPopup' onClick={(e) => e.stopPropagation()}>
                <p>{message}</p>
                <button className='breakButton' onClick={() => onAccept()}>{acceptText}</button>
                <button className='breakButton' onClick={() => onReject()}>{rejectText}</button>
            </div>

        </div>

     );
}

export default Popup;