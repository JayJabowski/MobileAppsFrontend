import React, {useEffect, useState} from 'react';

import { sendMessage } from '../api/Fetcher';
import useAuth from '../hooks/useAuth';
import EmojiPanel from './emojiPanel';
import PhotoPanel from './PhotoPanel';

import faceDark from "../icons/face_dark.svg"
import faceLight from "../icons/face_light.svg"
import downDark from "../icons/down_dark.svg"
import downLight from "../icons/down_light.svg"
import sendDark from "../icons/send_dark.svg";
import sendLight from "../icons/send_light.svg";
import redoDark from "../icons/redo_dark.svg";
import redoLight from "../icons/redo_light.svg";

import useActiveTheme from '../hooks/useActiveTheme';
import PhotoButton from './photobutton';
import PhotoFromFile from './PhotoFromFile';





function MessageInput({ updateChat}) {
  const { auth, setAuth } = useAuth();
  const { isLight } = useActiveTheme();

  const [message, setMessage] = useState();
  const [emojiPanelVisible, setEmojiPanelVisible] = useState(false);
  const [photoURL, setPhotoURL] = useState("");
    
  const updatePhotoURL = (url) => {
    setPhotoURL(url);
  };

  const updateMessage = (e) => {
    setMessage(e?.target.value);

    e.target.style.height = "0";
    e.target.style.height = e.target.scrollHeight+"px";
  };

  const resetMessageContent = () => {
    setMessage("");
    updatePhotoURL("");
  }

  const appendEmoji = (emoji) => {
    setMessage(message + emoji);
  };

  const updateEmojiPanelVisible = (bool) => {
    setEmojiPanelVisible(bool);
  }

  const submitMessageHandler = async (e) => {
    if (!message) return;

    e.preventDefault();
    const response = await sendMessage(auth.token, message, photoURL);

    console.dir(response);

    if (response.data.code === 200) {
      resetMessageContent();
      updateChat();
    }
  };

  return (
    <div className="footer">
        {photoURL ? <PhotoPanel updatePhotoURL={updatePhotoURL} photoURL={photoURL} /> : <></>}
        <EmojiPanel callback={appendEmoji} visible={emojiPanelVisible} updateVisible={updateEmojiPanelVisible} />

      <div className="messageWrapper">

        <button onClick={() => updateEmojiPanelVisible(!emojiPanelVisible)}>
          <img alt="Emojis" src={isLight 
            ? 
            emojiPanelVisible ? downDark : faceDark 
            : 
            emojiPanelVisible ? downLight : faceLight} />
        </button>

        <PhotoFromFile updatePhotoURL={updatePhotoURL} />
        <PhotoButton updateChat={updateChat} photoURL={photoURL} updatePhotoURL={updatePhotoURL}/>
        
        <textarea
          placeholder="Type a message"
          value={message}
          onChange={updateMessage}
        ></textarea>

            {(photoURL || message)
            ?
            <button  onClick={submitMessageHandler}>
              <img alt="Send" src={isLight ? sendDark : sendLight} />
            </button>:
            <></>
            }

      </div>
    </div>
  );
}

export default MessageInput;
