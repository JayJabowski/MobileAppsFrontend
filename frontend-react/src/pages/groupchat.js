import React, { useEffect, useState } from 'react';
import { fetchMessages } from '../api/Fetcher';
import ChatMessage from '../components/chatmessage';
import useAuth from '../hooks/useAuth';

//MockData
import { MockChat } from '../MockData';

function GroupChat() {
    const { auth } = useAuth();

    const [ incomingMessages, setIncomingMessages ] = useState([]);
    const [ message, setMessage ] = useState("");

    const updateMessage = (msg) => {
        setMessage(msg);
    }
    const updateIncomingMessages = (arr) => {
        setIncomingMessages(arr);
    }

    useEffect(() => {
        initializeChat();
    }, []);

    const submitMessageHandler = async (e) => {
        e.preventDefault();

        //TODO Axios Call sending Message
        //TODO Axios Call refreshing Messages

        updateMessage("");
    }

    const initializeChat = async () => {
        const response = await fetchMessages(auth.token);
        console.dir(response);
    }

    return (
        <>
            <div className="chatBox">
                {MockChat.map((msg) => <ChatMessage {...msg} />)}
            </div>
            <div className="messageBox">
                <input type="text" onChange={updateMessage}></input>
                <button onSubmit={submitMessageHandler}>Send</button>
            </div>
        </>
      );
}

export default GroupChat;