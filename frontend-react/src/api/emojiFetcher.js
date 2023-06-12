//------------------------
// AUTHOR: Jan Wittrowski
//------------------------

import axios from "./axios"

const API_KEY = "cfaec093100ff958b7bd588826eec2282bdfa7df"

const emojiAxios = axios.create({
    baseURL: "https://emoji-api.com"
})

const getAllEmojis = async () => {
    const response = await emojiAxios.get(`emojis?access_key=${API_KEY}`)

    return response;
}

export {
    getAllEmojis
}