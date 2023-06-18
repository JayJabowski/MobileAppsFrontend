import React, {useState} from 'react';
import useActiveTheme from '../hooks/useActiveTheme';

import upDark from "../icons/up_dark.svg"
import upLight from "../icons/up_light.svg"
import downDark from "../icons/down_dark.svg"
import downLight from "../icons/down_light.svg"

function FontSizeChanger() {
    const {isLight } = useActiveTheme();
    const [size, setSize] = useState(1);
    const r = document.querySelector(':root');

    const updateSize = (s) => {
        setSize(s);
    }

    const changeFontSize = (factor) => {
        const tmpSize 
            =  factor < 1  
            ? Math.max(size * factor, 0.5) 
            : Math.min(size * factor, 2) ;

        r.style.setProperty('--fontFactor', `${tmpSize}`);

        updateSize(tmpSize);
    }

    const resetFontSize = () => {
        const tmpSize =  1;

        r.style.setProperty('--fontFactor', `${tmpSize}`);

        updateSize(tmpSize);
    }

    return (  
        <div className='menuItem'>
            <label>Change Font Size</label>
            <div className="buttonWrapper">
                <button  onClick = {() => changeFontSize(0.9)}>
                <img alt="next" src={isLight ? downDark : downLight} />  
                </button>
                <button className="reset" onClick = {() => resetFontSize()}>
                A
                </button>
                <button  onClick = {() => changeFontSize(1.1)}>
                <img alt="previous" src={isLight ? upDark : upLight} />  
                </button>
            </div>
        </div>
    );
}

export default FontSizeChanger;