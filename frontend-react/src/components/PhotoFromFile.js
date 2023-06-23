import React from 'react';
import useActiveTheme from '../hooks/useActiveTheme';

import clipDark from "../icons/clip_dark.svg";
import clipLight from "../icons/clip_light.svg";

function PhotoFromFile({updatePhotoURL}) {
    const {isLight} = useActiveTheme();

    const createPhotoURL = async (e) => {
        if(!e.target.files.length) return;
        console.dir(e.target);

        const file = e.target.files[0];
        e.target.files = null;

        const reader = new FileReader();
        reader.readAsDataURL(file);

        reader.addEventListener(
            "load",
            () => {
                getFromReader(reader.result);
            },
            false
          );

    }

    const getFromReader = (dataURL) => {
        updatePhotoURL(dataURL);
    }

    return ( 
        <form className="uploadWrapper">
            <input id="files" type="file" onChange={createPhotoURL} accept="image/*" />
            <label htmlFor="files"> 
                <img alt="upload" src={isLight ? clipDark : clipLight} />
            </label>
        </form>
     );
}

export default PhotoFromFile;