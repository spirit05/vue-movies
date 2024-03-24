import axios from "axios";
import interceptions from "./interseptions";

const instance = axios.create({
  baseURL: process.env.VUE_APP_API_URL,
});

interceptions(instance);

export default instance;
