import axios from "axios";

const instance = axios.create({
  baseURL: "https://ezyservices.herokuapp",
});

export default instance;
