import React from 'react';
import useActiveTheme from '../hooks/useActiveTheme';

//images
import xDark from "../icons/x_dark.svg"
import xLight from "../icons/x_light.svg"

function ErrorMessage({ text, callback }) {
    const {isLight} = useActiveTheme();

    return (  
        <div className="errMsgWrapper" >
            <div className="errMsg">
                <label>{text} </label>
                <button onClick={callback}>
                <img alt="close" src={isLight ? xLight : xDark} />
                </button>
            </div>
        </div>

    );
}

export default ErrorMessage;