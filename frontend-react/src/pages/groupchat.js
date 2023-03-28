import React, { useState } from 'react';
import ChatMessage from '../components/chatmessage';

//MockData
import { MockChat } from '../MockData';

function GroupChat() {
    const [ message, setMessage ] = useState("");

    const updateMessage = (msg) => {
        setMessage(msg);
    }

    const submitMessageHandler = async (e) => {
        e.preventDefault();

        //TODO Axios Call sending Message
        //TODO Axios Call refreshing Messages

        updateMessage("");
    }

    return (
        <>
            <h1>GroupChat</h1>
            <div className="ChatBox">
                {MockChat.map((msg) => <ChatMessage {...msg} />)}
            </div>
            <input type="text" onChange={updateMessage}></input>
            <button onSubmit={submitMessageHandler}>Send</button>
        </>
      );
}

export default GroupChat;