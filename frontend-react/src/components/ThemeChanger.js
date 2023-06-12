import React, {useState} from 'react';
import useActiveTheme from '../hooks/useActiveTheme';
import LocalStorageHandler from '../tools/localstoragehandler';

function ThemeChanger() {
    const storageHandler = LocalStorageHandler();

    const [isLightMode, setIsLightMode] = useState(true);
    const { isLight, setIsLight } = useActiveTheme();
    const root = document.querySelector(':root');

    const toggleIsLightMode = () => {
        setIsLight(!isLight);
    }

    const LIGHTMODE = {
        primaryC : "#5bc9bb",
        primaryShadeC : "#e9ebea",
        backgroundC: "#ffffff",
        backgroundShadeC: "#fafafa",
        textC: "#090909",
        textShadeC: "#c3c8cb"
    }

    const DARKMODE = {
        primaryC : "#5bc9bb",
        primaryShadeC : "#e9ebea",
        backgroundC: "#000000",
        backgroundShadeC: "#181818",
        textC: "#e7e7e7",
        textShadeC: "#33383b"

    }

    const switchModes = () => {
        if(isLight){
            applyStyleObj(DARKMODE,root);
            
        }else{
            applyStyleObj(LIGHTMODE,root);   
        }
        toggleIsLightMode();
    }

    const applyStyleObj = (Obj, htmlElement) => {
        for (let key in Obj){
            htmlElement.style.setProperty(`--${key}`, `${Obj[key]}`);
        }
        console.dir(htmlElement.style.cssText);
    }

    return ( 
        <div className='wrapper'>
            <label>Change Themes</label>
            <button onClick={() =>switchModes()}>Change</button>
        </div>
     );
}

export default ThemeChanger;