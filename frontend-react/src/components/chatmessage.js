import React from 'react'
import useAuth from '../hooks/useAuth';

function ChatMessage({userid, sender, message, time}) {
    const { auth } = useAuth();

    return (
        <div className={userid === auth.userid ? "alignRight" : "alignLeft"}>
            <label>{sender}</label>
            <p>{message}</p>
            <label>{time}</label>
        </div>
      );
}

export default ChatMessage;