import React, { useState, useEffect } from "react";

//Images
import sendDark from "../icons/send_dark.svg";
import sendLight from "../icons/send_light.svg";
import redoDark from "../icons/redo_dark.svg";
import redoLight from "../icons/redo_light.svg";
import closeDark from "../icons/close_big_dark.svg"
import closeLight from "../icons/close_big_light.svg"
import cameraDark from "../icons/camera_dark.svg";
import cameraLight from "../icons/camera_light.svg";


import useAuth from "../hooks/useAuth";
import useActiveTheme from "../hooks/useActiveTheme";
import { sendPhoto } from "../api/Fetcher";
import MessageInput from "./MessageInput";

//https://blog.logrocket.com/using-react-webcam-capture-display-images/

function PhotoButton({ updateChat, updatePhotoURL, photoURL }) {
  const { auth } = useAuth();
  const { isLight } = useActiveTheme();

  const [photoOverlayVisible, setOverlayVisible] = useState(false);
  const [cameraSupported, setCameraSupported] = useState(false);

  const updateOverlayVisible = (bool) => {
    setOverlayVisible(bool);
    //bool  || updatePhotoURL("");
  };

  const updateCameraSupported = (bool) => {
    setCameraSupported(bool);
  };

  useEffect(() => {
    updateCameraSupported("mediaDevices" in navigator);
  }, []);

  useEffect(() => {
    if (photoOverlayVisible && cameraSupported) {
      switchOn();
    } else {
      switchOff();
    }
  }, [photoOverlayVisible, photoURL]);

  const photoHandler = async (evt) => {
    evt.preventDefault();

    const photoURL = takePhoto();

    updatePhotoURL(photoURL);
    updateOverlayVisible(false);
  };

  const switchOn = async () => {
    if (!cameraSupported) return;

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
    videoHTML && videoHTML.pause();
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

    if (response.data.code == 200) {
      updateChat();
      updateOverlayVisible(false);
    }
  };

  return (
    <>
      <div>
        <button
          onClick={(e) => {
            e.preventDefault();
            updateOverlayVisible(!photoOverlayVisible);
          }}
        >
          <img
                  alt="Take Photo"
                  src={isLight ? cameraDark : cameraLight}
                />
        </button>
      </div>

      {photoOverlayVisible ? (

        <div
          className="photoOverlayWrapper"
          onClick={(e) => {
            e.stopPropagation();
            updateOverlayVisible(false);
          }}
        >

          <div onClick={(e) => e.stopPropagation()} className="photoOverlay">
                <video id="captureStream" autoPlay></video>

              <div className="breakButtonWrapper">
                  
                  <div className="photoHeader">
                    <div className="placeholder"></div>
                    <button
                      onClick={() => updateOverlayVisible(!photoOverlayVisible)}
                      >
                      <img alt="close" src={isLight ? closeDark: closeLight} />
                    </button>
                  </div>

                  <div className="photoFooter">
                  
                    <div className="placeholder"></div>
                    <div className="shutter" onClick={photoHandler}>
                      <div className="innerShutter"></div>
                    </div>
                    <div className="placeholder"></div>
                  
                  </div>
            </div>
          </div>
        </div>
      ) : (
        <></>
      )}
    </>
  );
}

export default PhotoButton;
