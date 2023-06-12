import React from 'react';
import useActiveTheme from '../hooks/useActiveTheme';

import xDark from  "../icons/x_dark.svg"
import xLight from  "../icons/x_light.svg"

function SignUpInput({ placeholder, state, callback}) {
    const {isLight } = useActiveTheme();


    return ( 
        <div className="inputWrapper">
          <div className="defaultInput">
            <input
              value={state}
              placeholder={placeholder}
              type="text"
              onChange={callback}
            ></input>
            <button
              disabled={!state}
              onClick={(e) => {
                e.preventDefault();
                callback({ target : {value : ""}})
              }}
              
            >
              <img alt="clear" src={ isLight ?  xDark : xLight } />
            </button>
          </div>
        </div>
     );
}

export default SignUpInput;