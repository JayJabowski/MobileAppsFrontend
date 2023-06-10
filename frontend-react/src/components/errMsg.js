import React from 'react';

function ErrorMessage({ text, closeMsg }) {
    return (  
        <div className="errMsgWrapper">
            <div className="errMsg">
                {text}
            </div>
        </div>

    );
}

export default ErrorMessage;