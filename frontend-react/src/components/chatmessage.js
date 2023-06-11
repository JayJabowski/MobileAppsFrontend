import React, { useEffect, useState } from 'react'
import useAuth from '../hooks/useAuth';
import { fetchPhoto } from '../api/Fetcher';
import { parseTimeString } from '../tools/tools';

function ChatMessage({userhash, usernickname, user, text, time, photoid, id}) {
    const { auth } = useAuth();
    const [image, setImage] = useState(undefined);

    const updateImage = (img) => {
        setImage(img);
    }

    useEffect(() => {
        if(photoid){
            photoLoader();
        }
    }, [])

    const photoLoader = async () =>{
        const response = await fetchPhoto(auth.token,photoid);
        
        updateImage(new Blob([response.data]));
    }

    const getFormattedTime = () => {
        const now = new Date();

        const messageTime = parseTimeString(time);
        let timeString = "";

        /*
        if(now.getFullYear() !=  messageTime.year){
            timeString = messageTime.year;
            }
        if(now.getMonth() !== messageTime.month 
            && now.getDay() !==  messageTime.day){
                timeString = messageTime.day+"."+messageTime.month+"."+timeString;
            }
        */


        timeString = messageTime.hour+":"+messageTime.minute+" "+timeString;

        
        return timeString;
    }

    return (
        <div id={`msg${id}`} className={`${userhash === auth.hash ? "self" : ""} wrapper`}>
            <div className="messageCard" >
                <label className="name">{usernickname || user}</label>
                { photoid && image ? <img src={URL.createObjectURL(image)} alt="photo" width="100%" /> : <></>}
                <label className="text">{text}</label>
                <label className="time">{getFormattedTime()}</label>
            </div>
        </div>
      );
}

export default ChatMessage;