import axios from "axios";

const API_TOKEN = "e05eb5ca356578e9f652d58f443ab993";

const getFilmsFromApiWithSearchedText = (text,page) => {
    const url = 'https://api.themoviedb.org/3/search/movie?api_key=' 
    + API_TOKEN + '&language=fr&query=' + text + "&page" + (page+1)
    console.log(url)
    return axios.get(url);
  }

export default getFilmsFromApiWithSearchedText;