import React, { useEffect, useState } from 'react';
import { fetchMessages, sendMessage } from '../api/Fetcher';
import ChatMessage from '../components/chatmessage';
import useAuth from '../hooks/useAuth';

//MockData
import { MockChat } from '../MockData';

//TODO: periodically update Chat.

function GroupChat() {
    const { auth } = useAuth();

    const [ messageHistory, setIncomingMessages ] = useState([]);
    const [ message, setMessage ] = useState("");

    const updateMessage = (e) => {
        setMessage(e?.target.value);

        return message;
    }
    const updateMessageHistory = (arr) => {
        setIncomingMessages(arr);
    }

    useEffect(() => {
        updateChat();
    }, []);

    const submitMessageHandler = async (e) => {
        e.preventDefault();
        console.dir(message);
        const response = await sendMessage(auth.token, message);

        if(response.data.status === "ok"){
            updateMessage({target: { value: ""}});
            updateChat();
        }
    }

    const updateChat = async () => {
        const response = await fetchMessages(auth.token);   

        if (response.data.status === "ok"){
            updateMessageHistory(response.data.messages);
        }

    }

    return (
        <>
            <div className="chatBox">
                {messageHistory.map((msg) => <ChatMessage {...msg} />)}
            </div>
            <div className="messageBox">
                <input type="text" value={message} onChange={updateMessage}></input>
                <button onClick={submitMessageHandler}>Send</button>
            </div>
        </>
      );
}

export default GroupChat;