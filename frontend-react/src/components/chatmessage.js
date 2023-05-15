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
        <div className={`${userhash === auth.hash ? "self" : ""} wrapper`}>
            <div className="messageCard" >
                <label className="name">{usernickname || user}</label>
                { photoid && image ? <img src={URL.createObjectURL(image)} alt="photo" /> : <></>}
                <label className="text">{text}</label>
                <label className="time">{time}</label>
            </div>
        </div>
      );
}

export default ChatMessage;