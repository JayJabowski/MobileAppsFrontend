import React from 'react';

import closeDark from "../icons/close_big_dark.svg"
import closeLight from "../icons/close_big_light.svg"
import useActiveTheme from '../hooks/useActiveTheme';

function PhotoPanel({photoURL, updatePhotoURL}) {
    const {isLight} = useActiveTheme();

    return ( 
        <>
            <div className="photoBox">
                <div className="photoPanel">
                    <img
                    className="takenPhoto"
                    src={photoURL}
                    alt="no photo taken or none displayed"
                    />

                    <div className='breakButtonWrapper'>
                    <div className="photoHeader">
                    <div className="placeholder"></div>
                    <button
                    onClick={() => updatePhotoURL("")}
                    >
                    <img alt="close" src={isLight ? closeDark: closeLight} />
                    </button>
                </div>
                    </div>
                </div>
            </div>
        </>
     );
}

export default PhotoPanel;