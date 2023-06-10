import React, {useState} from 'react';
import Picker from 'emoji-picker-react';

import { sendMessagePost } from '../api/Fetcher';
import useAuth from '../hooks/useAuth';



function MessageInput({ updateChat }) {
    const { auth, setAuth } = useAuth();

    const [ message, setMessage ] = useState("");
    const [noOfRows, setNoOfRows] = useState(1);
    

    const updateTextInput = (e) => {
        updateMessage(e);
        console.dir(e.target)
        console.log(e.target.scrollHeight, e.target.clientHeight);
        if(e.target.scrollHeight > e.target.clientHeight){
            updateNoOfRows(noOfRows + 1);
        }
    }

    const addInputLineRecursive = (scrollHeight,InputHeight) =>{
        
    }

    const updateMessage = (e) => {
        setMessage(e?.target.value);

        return message;
    }

    const updateNoOfRows = (rows) => {
        setNoOfRows(rows);
    }

    const submitMessageHandler = async (e) => {
        if(!message) return;
        
        e.preventDefault();
        const response = await sendMessagePost(auth.token, message);

        if(response.data.status === "ok"){
            updateMessage({target: { value: ""}});
            updateChat();  
        }
    }

    return ( 
        <div className="messageBox">
                <textarea id="textInput" rows={noOfRows} value={message} onChange={updateTextInput}></textarea>
                <button onClick={submitMessageHandler}>Send</button>
        
            </div>
     );
}

export default MessageInput;