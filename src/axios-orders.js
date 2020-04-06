import axios from "axios";

const instance = axios.create({
  baseURL: "https://burger-builder-d6aa8.firebaseio.com/"
});

export default instance;
