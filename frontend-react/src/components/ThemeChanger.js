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
        backgroundShadeC: "#fafafa",
        textC: "#090909",
        textShadeC: "#c3c8cb",
        toneDown: "90%",
        frameVisible: "0"
    }

    const DARKMODE = {
        primaryC : "#5bc9bb",
        primaryShadeC : "#e9ebea",
        backgroundC: "#000000",
        backgroundShadeC: "#181818",
        textC: "#e7e7e7",
        textShadeC: "#33383b",
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