import React, {useState} from 'react';

function FontSizeChanger() {
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
        <div className='wrapper'>
            <label>Change Font Size</label>
            <button className="smaller" onClick = {() => changeFontSize(0.9)}>A</button>
            <button className="reset" onClick = {() => resetFontSize()}>A</button>
            <button className="bigger" onClick = {() => changeFontSize(1.1)}>A</button>
        </div>
    );
}

export default FontSizeChanger;