import React from 'react'
import useAuth from '../hooks/useAuth';

function ChatMessage({userhash, usernickname, user, text, time}) {
    const { auth } = useAuth();

    return (
        <div className={`chatMessage ${userhash === auth.userid ? "alignRight" : "alignLeft"}`}>
            <label className="sender">{usernickname || user}</label>
            <label className="message">{text}</label>
            <label className="time">{time}</label>
        </div>
      );
}

export default ChatMessage;