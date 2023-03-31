//------------------------
// AUTHOR: Jan Wittrowski
//------------------------

import axios from 'axios';

const BASE_URL = "https://www2.hs-esslingen.de/~melcher/map/chat/api/"

export default axios.create({
    baseURL: BASE_URL
});