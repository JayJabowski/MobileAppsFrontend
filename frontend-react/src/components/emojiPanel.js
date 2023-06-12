import React,  {useState, useEffect} from 'react';
import { getAllEmojis } from '../api/emojiFetcher';

function EmojiPanel({ callback }) {
    const [emojiList, setEmojiList] = useState([]);
    const [emojiSearchList, setEmojiSearchList] = useState([]);
    const [searchString, setSearchString] = useState("");

    const updateEmojiList = (arr) => {
        setEmojiList(arr);
    }
    const updateEmojiSearchList = (arr) => {
        setEmojiSearchList(arr);
    }
    const updateSearchString = (e) => {
        setSearchString(e.target.value);
    }

    useEffect(() => {
        fetchEmojis();
    }, [])

    useEffect(() => {
        getSearchResults(searchString)
    }, [searchString]);

    const fetchEmojis = async () => {
        const response = await getAllEmojis();

        console.dir(response);
        updateEmojiList([...response.data]);
    }

    const renderEmoji = (emoji) => {
        return (
            <label onClick={() => callback(emoji.character)}>{emoji.character}</label>
        )
    }

    const getSearchResults = (string) => {
        const tmpResults = emojiList.filter((emoji) => {
            return emoji.unicodeName.includes(string);
        })

        updateEmojiSearchList([...tmpResults]);
    }


    return ( 
        <>
            <div className='emojiWrapper'>
                <input type="text" onChange={updateSearchString} ></input>
                <div className='emojiResultBox'>
                    {
                        emojiSearchList.length != emojiList.length && !emojiSearchList.length
                        ?
                        <>
                        {
                            emojiSearchList.map(renderEmoji)
                        }
                        </>
                        :
                        <>
                        {
                            emojiList.map(renderEmoji)
                        }
                        </>

                    }
                </div>
            </div>
        
        </>
     );
}

export default EmojiPanel;