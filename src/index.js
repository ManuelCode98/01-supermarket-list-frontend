import axios from "axios";
import Compressor from 'compressorjs'

const urlConnectionBackend = import.meta.env.VITE_URL_CONNECTION_BACKEND;


export {
    axios as http,
    urlConnectionBackend,
    Compressor as compressor
}