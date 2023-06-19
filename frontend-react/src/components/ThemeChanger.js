import React, {useState} from 'react';
import useActiveTheme from '../hooks/useActiveTheme';
import LocalStorageHandler from '../tools/localstoragehandler';

//images
import moonLight from "../icons/moon_light.svg"
import sunDark from "../icons/sun_dark.svg"

function ThemeChanger() {
    const storageHandler = LocalStorageHandler();

    const { isLight, setIsLight } = useActiveTheme();
    const root = document.querySelector(':root');

    const toggleIsLightMode = () => {
        setIsLight(!isLight);
        storageHandler.addToLocalStorage({isLight : !isLight});
    }

    const LIGHTMODE = {
        primaryC : "#5bc9bb",
        primaryShadeC : "#e9ebea",
        backgroundC: "#ffffff",
        backgroundShadeC: "#f5f5f5",
        textC: "#090909",
        textShadeC: "#848e94",
        toneDown: "90%",
        frameVisible: "0"
    }

    const DARKMODE = {
        primaryC : "#5bc9bb",
        primaryShadeC : "#e9ebea",
        backgroundC: "#000000",
        backgroundShadeC: "#313131",
        textC: "#e7e7e7",
        textShadeC: "#848e94",
        toneDown: "70%",
        frameVisible: "0.1em"

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
    }

    return ( 
        <div className='menuItem'>
            <label>Change Themes</label>
            <button onClick={() =>switchModes()}>
                <img alt="change theme" src={isLight ? sunDark : moonLight} />
            </button>
        </div>
     );
}

export default ThemeChanger;