import React from 'react';

function RememberMe({callback}) {
    return ( 
        <div>
            <form>
                <input type="checkbox" onClick={(e) => callback(e.target.checked)}></input>
                <label>Keep me logged in</label>
            </form>
        </div>
     );
}

export default RememberMe;