import axios from "axios";

const urlConnectionBackend = import.meta.env.VITE_URL_CONNECTION_BACKEND;


export {
    axios as http,
    urlConnectionBackend,
}