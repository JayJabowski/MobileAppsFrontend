import React, { useEffect, useState, useRef } from 'react';
import { fetchMessages } from '../api/Fetcher';
import ChatMessage from '../components/chatmessage';
import MessageInput from '../components/MessageInput';
import useAuth from '../hooks/useAuth';

//Images
import downDark from "../icons/down_dark.svg";
import downLight from "../icons/down_light.svg";

//MockData
import { parseTimeString } from '../tools/tools';
import useActiveTheme from '../hooks/useActiveTheme';

//TODO: periodically update Chat.

function GroupChat({messageHistory, updateMessageHistory}) {
    const { auth } = useAuth();
    const { isLight } = useActiveTheme();

    const [scrollPosition, setScrollPosition] = useState(false);

    const updateScrollPosition = (e) => {
        const dist = e.target.scrollHeight - e.target.scrollTop - e.target.clientHeight;
        setScrollPosition(dist > 1000);
    }


    //useEffect
    useEffect(() => {
        updateChat();
    }, []);
    useEffect(() => {
        scrollDown("instant");
    }, [messageHistory]);


    //Fetches
    const updateChat = async () => {
        const response = await fetchMessages(auth.token);  

        if (response.data.code == 200){
            updateMessageHistory(response.data.messages);
        }

    }

    //Date-Formatting
    const isNewDay = (current, prev) => {
        return (current?.time.substring(0,10) !== prev?.time.substring(0,10));
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

    const scrollDown = (behavior) => {
        const chatBottom = document.getElementById("chatBottom");
        chatBottom.scrollIntoView({behavior ,block: "end"});
    }

    return (
        <>
            <div className='chatBoxWrapper'>
            <div className="chatBox" 
            onScroll={updateScrollPosition}
            id="chatBox">
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
                {scrollPosition
                ?
        
                    <button className='goToBottom' 
                        onClick={(e) => {
                            e.preventDefault();
                            
                            scrollDown("smooth");
                    }}>
                        <img alt="Scroll Down" src={isLight ? downDark : downLight} />
                    </button>
            
                :
                <></>
                
                }
        </>
      );
}

export default GroupChat;