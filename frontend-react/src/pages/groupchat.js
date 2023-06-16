import React, { useEffect, useState, useRef } from 'react';
import { fetchMessages } from '../api/Fetcher';
import ChatMessage from '../components/chatmessage';
import MessageInput from '../components/MessageInput';
import useAuth from '../hooks/useAuth';


//MockData
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

    //useEffect
    useEffect(() => {
        updateChat();
    }, []);
    useEffect(() => {
        scrollDown();
    }, [messageHistory]);


    //Fetches
    const updateChat = async () => {
        const response = await fetchMessages(auth.token);
        console.dir(response);   

        if (response.data.code == 200){
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
        chatBottom.scrollIntoView({behavior: "instant", block: "end"});
    }

    return (
        <>
            <div className='chatBoxWrapper'>

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
            </div>
        </>
      );
}

export default GroupChat;