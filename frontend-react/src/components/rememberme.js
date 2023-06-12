import React from 'react';

function RememberMe({callback}) {
    return ( 
        <div className="breakinglabeledCheckbox">
                <input type="checkbox" onClick={(e) => callback(e.target.checked)}></input>
                <label>Keep me logged in</label>
        </div>
     );
}

export default RememberMe;