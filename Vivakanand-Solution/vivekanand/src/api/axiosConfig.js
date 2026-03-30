// src/api.js
import axios from "axios";



export const BASE_URL = "https://api.vivekaanandahometuitions.com"; // backend base URL
//export const BASE_URL = "http://localhost:2021"; // backend base URL


const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
