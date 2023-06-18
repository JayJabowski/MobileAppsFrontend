import React,  {useState, useEffect} from 'react';
import { getAllEmojis } from '../api/emojiFetcher';

import useActiveTheme from '../hooks/useActiveTheme';

function EmojiPanel({ callback, visible, updateVisible }) {

    const { isLight } = useActiveTheme();
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
        updateEmojiList([...response.data]);
        console.log("emojis loaded");
    }

    const renderEmoji = (emoji) => {
      console.log("render emoji called");
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
        {visible ? (
          <div className="emojiWrapper">
            <div className="emojiContainer">
              {emojiList.map((em) =>renderEmoji(em))}

            </div>
          </div>
        ) : (
          <></>
        )}
      </>
    );
}

export default EmojiPanel;