import React, { useState, useEffect } from 'react'

//Images
import sendDark from "../icons/send_dark.svg"
import sendLight from "../icons/send_light.svg"
import redoDark from "../icons/redo_dark.svg"
import redoLight from "../icons/redo_light.svg"
import cameraDark from "../icons/camera_dark.svg"
import cameraLight from "../icons/camera_light.svg"

import useAuth from '../hooks/useAuth';
import useActiveTheme from '../hooks/useActiveTheme';
import { sendPhoto } from '../api/Fetcher'

//https://blog.logrocket.com/using-react-webcam-capture-display-images/

function PhotoButton({updateChat}) {

    const {auth} = useAuth();
    const {isLight} = useActiveTheme();

    const [photoURL,  setPhotoURL] = useState("");
    const [photoOverlayVisible, setOverlayVisible] = useState(false);
    const [cameraSupported, setCameraSupported ] = useState(false); 

    const updatePhotoURL = (url) => {
        setPhotoURL(url);
    }

    const updateOverlayVisible = (bool) => {
        setOverlayVisible(bool);
    }

    const updateCameraSupported = (bool) => {
        setCameraSupported(bool);
    }

    useEffect(() => {
        updateCameraSupported("mediaDevices" in navigator);
    }, []);

    useEffect(() => {
        if(photoOverlayVisible && cameraSupported){
            switchOn();
        }else{
            //switchOff();
        }
    },[photoOverlayVisible])

    const photoHandler = async (evt) => {
        evt.preventDefault();

        const photoURL = takePhoto();

        updatePhotoURL(photoURL);
    }  

    const switchOn = async () => {
        if(!cameraSupported) return;

        //create video element
        const videoHTML = document.getElementById("captureStream");

        // Get camera media stream and set it to player
        await navigator.mediaDevices
          .getUserMedia({
            video: { width: 640, height: 480 },
            audio: false,
            facingMode: "user" // or environment
          })
          .then((mediaStream) => {
            videoHTML.srcObject = mediaStream;
            videoHTML.play();
          });
      };

      const switchOff = () => {
        const videoHTML = document.getElementById("captureStream");
        videoHTML.pause();
        //stream.getTracks()[0].stop();
      };
    
      const takePhoto = () => {
        const videoHTML = document.getElementById("captureStream");

        // Create a canvcas to draw on
        let canvas = document.createElement("canvas");
        canvas.setAttribute("width", 640);
        canvas.setAttribute("height", 480);
        let context = canvas.getContext("2d");
    
        // Copy image from video to canvas
        context.drawImage(videoHTML, 0, 0, canvas.width, canvas.height);
    
        // Convert image to data string
        const photoURL = context.canvas.toDataURL();
    
        // Release resources
        //context = null;
        //canvas = null;
    
        return photoURL;
      };

      //Fetches

      const submitPhotoHandler = async (e) => {
        const response = await sendPhoto(auth.token, photoURL);

        console.dir(response);

        if(response.data.code == 200){
            updateChat();
            updateOverlayVisible(false);
        }
      }
    

    return (
        <>
        <div>
            <button onClick={(e) => {
                e.preventDefault();
                updateOverlayVisible(!photoOverlayVisible);
            }}>Take Photo</button>
        </div>
            { photoOverlayVisible 
            ?
            <div className="photoOverlayWrapper">
                <div className='photoOverlay'>
                    { photoURL 
                    ?
                    <img className="takenPhoto" src={photoURL} alt="no photo taken or none displayed" />
                    :
                    <video id="captureStream" autoPlay></video>
                    }
                    { photoURL 
                    ?
                    <div className="breakButtonWrapper">
                    <button className="sendPhotoButton" onClick={submitPhotoHandler}>
                        <img alt="Send" src={isLight ? sendDark : sendLight} />
                    </button> 
                    <button className="retakePhotoButton" onClick={() => updatePhotoURL("")}>
                        <img alt="retake" src={isLight ? redoDark : redoLight} />
                    </button> 
                    </div>
                    :
                    <button className="breakButton secondPrio" onClick={photoHandler}>
                        <img alt="Take Photo" src={isLight ? cameraDark : cameraLight} />
                    </button>
                    }
                    <button className="breakButton firstPrio" onClick={() => updateOverlayVisible(!photoOverlayVisible)}>close</button>
                </div> 
            </div>
            :
            <></>
            }

        </>
      );
}

export default PhotoButton;