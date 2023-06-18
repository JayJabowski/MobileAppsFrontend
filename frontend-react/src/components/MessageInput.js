import React, {useState} from 'react';
import Picker from 'emoji-picker-react';

import { sendMessage } from '../api/Fetcher';
import useAuth from '../hooks/useAuth';
import EmojiPanel from './emojiPanel';

import sendDark from "../icons/send_dark.svg";
import sendLight from "../icons/send_light.svg";
import faceDark from "../icons/face_dark.svg"
import faceLight from "../icons/face_light.svg"
import downDark from "../icons/down_dark.svg"
import downLight from "../icons/down_light.svg"

import useActiveTheme from '../hooks/useActiveTheme';
import PhotoButton from './photobutton';



function MessageInput({ updateChat }) {
  const { auth, setAuth } = useAuth();
  const { isLight } = useActiveTheme();

  const [message, setMessage] = useState("");
  const [noOfRows, setNoOfRows] = useState(1);
  const [emojiPanelVisible, setEmojiPanelVisible] = useState(false);

  const updateTextInput = (e) => {
    updateMessage(e);

    if (e.target.scrollHeight > e.target.clientHeight) {
      updateNoOfRows(noOfRows + 1);
    }
  };

  const updateMessage = (e) => {
    setMessage(e?.target.value);
  };

  const appendEmoji = (emoji) => {
    setMessage(message + emoji);
  };

  const updateEmojiPanelVisible = (bool) => {
    setEmojiPanelVisible(bool);
  }

  const updateNoOfRows = (rows) => {
    setNoOfRows(rows);
  };

  const submitMessageHandler = async (e) => {
    if (!message) return;

    e.preventDefault();
    const response = await sendMessage(auth.token, message);

    if (response.data.code === 200) {
      updateMessage({ target: { value: "" } });
      updateChat();
    }
  };

  return (
    <div className="footer">
        <EmojiPanel callback={appendEmoji} visible={emojiPanelVisible} updateVisible={updateEmojiPanelVisible} />
      <div className="messageWrapper">
        <button onClick={() => updateEmojiPanelVisible(!emojiPanelVisible)}>
          <img alt="Emojis" src={isLight 
            ? 
            emojiPanelVisible ? downDark : faceDark 
            : 
            emojiPanelVisible ? downLight : faceLight} />
        </button>
        <PhotoButton updateChat={updateChat}/>
        <textarea
          placeholder="Type a message"
          id="textInput"
          value={message}
          onChange={updateTextInput}
        ></textarea>
        <button onClick={submitMessageHandler}>
          <img alt="Send" src={isLight ? sendDark : sendLight} />
        </button>
      </div>
    </div>
  );
}

export default MessageInput;