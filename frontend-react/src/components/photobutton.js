import React, { useState } from 'react'

import CameraHandler from '../tools/camerahandler';

//https://blog.logrocket.com/using-react-webcam-capture-display-images/

function PhotoButton() {
    const camera = CameraHandler();

    const [photoURL,  setPhotoURL] = useState(""); 

    const updatePhotoURL = (url) => {
        setPhotoURL(url);
    }

    const photoHandler = (evt) => {
        evt.preventDefault();

        camera.switchOn();
        const photoURL = camera.takePhoto();
        //camera.switchOff();

        updatePhotoURL(photoURL);
    }   

    return (
        <div>
            <button onClick={photoHandler}>Photo</button>
            <img src={photoURL} alt="no photo taken or none displayed" />
        </div>
      );
}

export default PhotoButton;