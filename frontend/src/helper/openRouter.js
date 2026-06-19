import axios from "axios";
import {ROUTER_URL,CHATKEY,BASE_URL} from "../config/config.js";


const openrouter = axios.create({
  baseURL: ROUTER_URL,
  headers: {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${CHATKEY}`,
    "HTTP-Referer": BASE_URL,
    "X-Title": "Braini AI",
  }
});

export default openrouter;