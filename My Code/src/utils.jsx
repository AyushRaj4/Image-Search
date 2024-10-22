import axios from "axios";

const url =
  "https://api.unsplash.com";
const customFetch = axios.create({
  baseURL: url,
});

export default customFetch;
