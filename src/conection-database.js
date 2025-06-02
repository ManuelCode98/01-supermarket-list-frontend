import axios from "axios";
import { useEffect, useState } from "react";


const connectionDatabase = ()=>{

    const [ urlConnectionBackend, setUrlConnectionBackend ] = useState('');

    const urlConnectionBackendOne = import.meta.env.VITE_URL_CONNECTION_BACKEND;
    const urlConnectionBackendTwo = import.meta.env.VITE_URL_CONNECTION_BACKEND_TWO;

    useEffect(()=>{
        
        const getConnectionBackend = async()=>{
            await axios.get( urlConnectionBackendOne ).then( ({ status }) => {

            if( status === 200 ) return setUrlConnectionBackend( urlConnectionBackendOne );
            
            })
            .catch ( () =>{
                console.log( 'Error al intentar conectar con el backend' );

            });

            await axios.get( urlConnectionBackendTwo ).then( ({ status }) => {
                if( status === 200 ) return setUrlConnectionBackend( urlConnectionBackendTwo );
                
            })
            .catch ( () =>{
                console.log( 'Error al intentar conectar con el backend' );

            });       
        }


        getConnectionBackend();
    },[])

    return urlConnectionBackend;

}


export {
    connectionDatabase
}