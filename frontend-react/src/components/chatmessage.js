import React, { useEffect, useState } from 'react'
import useAuth from '../hooks/useAuth';
import { fetchPhoto } from '../api/Fetcher';

function ChatMessage({userhash, usernickname, user, text, time, photoid}) {
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

        console.dir(response);

        const url = URL.createObjectURL(new Blob([response.data], {type: "image/png"}));

        console.log(url);
        
        updateImage(new Blob([response.data]));
    }

    return (
        <div className={`chatMessage ${userhash === auth.userid ? "alignRight" : "alignLeft"}`}>
            <label className="sender">{usernickname || user}</label>
            { photoid && image ? <img src={URL.createObjectURL(image)} alt="photo" /> : <></>}
            <label className="message">{text}</label>
            <label className="time">{time}</label>
        </div>
      );
}

export default ChatMessage;