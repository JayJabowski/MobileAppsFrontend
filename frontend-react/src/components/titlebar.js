import React from 'react'

function TitleBar({callback, title}) {
    return ( 
        <>
        <div onClick={() => {
            callback("menuShown");
        }}>Menu</div>
        <div>{title}</div>
        </>
     );
}

export default TitleBar;