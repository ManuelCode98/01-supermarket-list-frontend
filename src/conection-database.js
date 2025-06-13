import axios from "axios";
import { useEffect, useState } from "react";


const useConnectionDatabase = ()=>{

    const [ urlConnectionBackendCondition, setUrlConnectionBackendCondition ] = useState('');

    const urlConnectionBackendOne = import.meta.env.VITE_URL_CONNECTION_BACKEND;
    const urlConnectionBackendTwo = import.meta.env.VITE_URL_CONNECTION_BACKEND_TWO;

    useEffect(()=>{
        
        const getConnectionBackend = async()=>{
            
            await axios.get( urlConnectionBackendOne, {timeout: 1000} ).then( ({ status }) => {

            if( status === 200 ){
                setUrlConnectionBackendCondition( urlConnectionBackendOne );
                return
            }
            
            })
            .catch ( () =>{
                console.log( 'Backend 1 no respondio' );

            });

            await axios.get( urlConnectionBackendTwo, { timeout: 1000 } ).then( ({ status }) => {
                if( status === 200 ){
                    setUrlConnectionBackendCondition( urlConnectionBackendTwo );
                    return
                }
                
            })
            .catch ( () =>{
                console.log( 'Backend 2 no respondio' );

            });       
        }


        getConnectionBackend();
    },[])

    return urlConnectionBackendCondition;

}


export {
    useConnectionDatabase
}