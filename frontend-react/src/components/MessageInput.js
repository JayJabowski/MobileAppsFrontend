import React, {useState} from 'react';
import Picker from 'emoji-picker-react';

import { sendMessage } from '../api/Fetcher';
import useAuth from '../hooks/useAuth';
import EmojiPanel from './emojiPanel';

import sendDark from "../icons/send_dark.svg";
import sendLight from "../icons/send_light.svg";
import useActiveTheme from '../hooks/useActiveTheme';



function MessageInput({ updateChat }) {
  const { auth, setAuth } = useAuth();
  const { isLight } = useActiveTheme();

  const [message, setMessage] = useState("");
  const [noOfRows, setNoOfRows] = useState(1);

  const updateTextInput = (e) => {
    updateMessage(e);
    console.dir(e.target);
    console.log(e.target.scrollHeight, e.target.clientHeight);
    if (e.target.scrollHeight > e.target.clientHeight) {
      updateNoOfRows(noOfRows + 1);
    }
  };

  const updateMessage = (e) => {
    setMessage(e?.target.value);

    return message;
  };

  const appendEmoji = (emoji) => {
    setMessage(message + emoji);
  };

  const updateNoOfRows = (rows) => {
    setNoOfRows(rows);
  };

  const submitMessageHandler = async (e) => {
    if (!message) return;

    e.preventDefault();
    const response = await sendMessage(auth.token, message);
    console.dir(response);

    if (response.data.code === 200) {
      updateMessage({ target: { value: "" } });
      updateChat();
    }
  };

  return (
    <div className="footer">
      <div className="messageWrapper">
        <EmojiPanel callback={appendEmoji} />
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