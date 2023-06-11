import React, { useEffect, useState, useRef } from 'react';
import { fetchMessages, fetchMessagesPost, sendMessagePost } from '../api/Fetcher';
import ChatMessage from '../components/chatmessage';
import MessageInput from '../components/MessageInput';
import useAuth from '../hooks/useAuth';

//Tools
import CameraHandler from '../tools/camerahandler';

//MockData
import { MockChat } from '../MockData';
import PhotoButton from '../components/photobutton';
import { parseTimeString } from '../tools/tools';

//TODO: periodically update Chat.

function GroupChat({messageHistory, updateMessageHistory}) {
    const { auth } = useAuth();

    //RECEIVING:
    const unescapeQuotationMarks = (string) => {
        //swaps HTML-entity for quotation mark with actual quotation mark

        const newString = string.replaceAll("&#34;", "\"");
        return newString;
    }

    //Taking Photos
    const camera = CameraHandler();
    camera.switchOn();


    //useEffect
    useEffect(() => {
        updateChat();
        console.log("groupChat.js called useEffect")
    }, []);
    useEffect(() => {
        scrollDown();
    }, [messageHistory]);


    //Fetches
    const updateChat = async () => {
        const response = await fetchMessagesPost(auth.token);   

        if (response.data.status === "ok"){
            updateMessageHistory(response.data.messages);
        }

    }

    //Date-Formatting
    const isNewDay = (current, prev) => {
        return (current?.time.substring(0,9) !== prev?.time.substring(0,9));
    }

    const createDatecard = (timeString) => {
        const timeObj = parseTimeString(timeString);
        const formattedTime = timeObj.day+"."+timeObj.month+"."+timeObj.year;

        return(
            <div className='timeWrapper' key={Math.random()}>
                <div className="timecard" key={Math.random()}>
                    <label key={Math.random()}>{formattedTime}</label>
                </div>
            </div>
        );
    }

    const insertDatecard = (msg, i) => {
        if(isNewDay(messageHistory[i],messageHistory[i-1])) return createDatecard(msg.time);
        return;
    }

    //Scrolling

    const scrollDown = () => {
        const chatBottom = document.getElementById("chatBottom");
        console.dir(chatBottom);
        chatBottom.scrollIntoView({behavior: "instant", block: "end"});
    }

    return (
        <>
            <div className="chatBox">
                {messageHistory.map((msg, i) => {
                    return(
                        <>
                            {insertDatecard(msg,i)}
                            <ChatMessage {...msg} key={msg.id} />
                        </>)
                })}
                <div id="chatBottom"></div>
            </div>
            <MessageInput updateChat={updateChat} />
        </>
      );
}

export default GroupChat;