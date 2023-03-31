import React from 'react'
import useAuth from '../hooks/useAuth';

function ChatMessage({userid, sender, message, time}) {
    const { auth } = useAuth();

    return (
        <div className={`chatMessage ${userid === auth.userid ? "alignRight" : "alignLeft"}`}>
            <label className="sender">{sender}</label>
            <label className="message">{message}</label>
            <label className="time">{time}</label>
        </div>
      );
}

export default ChatMessage;