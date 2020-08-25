import axios from "axios";

const instance = axios.create({
    baseURL: "https://burger-builder-d4b37.firebaseio.com/"
});

export default instance;