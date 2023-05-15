import React, { useEffect, useState } from 'react';
import { fetchMessages, fetchMessagesPost, sendMessagePost } from '../api/Fetcher';
import ChatMessage from '../components/chatmessage';
import useAuth from '../hooks/useAuth';

//Tools
import CameraHandler from '../tools/camerahandler';

//MockData
import { MockChat } from '../MockData';
import PhotoButton from '../components/photobutton';

//TODO: periodically update Chat.

function GroupChat() {


    //RECEIVING:
    const unescapeQuotationMarks = (string) => {
        //swaps HTML-entity for quotation mark with actual quotation mark

        const newString = string.replaceAll("&#34;", "\"");
        return newString;
    }

    const camera = CameraHandler();
    camera.switchOn();

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
        if(!message) return;
        
        e.preventDefault();
        const response = await sendMessagePost(auth.token, message);

        if(response.data.status === "ok"){
            updateMessage({target: { value: ""}});
            updateChat();
            
        }
    }

    const updateChat = async () => {
        const response = await fetchMessagesPost(auth.token);   

        if (response.data.status === "ok"){
            updateMessageHistory(response.data.messages);
        }

    }


   



   //console.dir(messageHistory);

    return (
        <>
            <div className="chatBox">
                {messageHistory.map((msg) => <ChatMessage {...msg} key={Math.random()} />)}
            </div>
            <div className="messageBox">
                <input type="text" value={message} onChange={updateMessage}></input>
                <button onClick={submitMessageHandler}>Send</button>
            </div>
        </>
      );
}

export default GroupChat;