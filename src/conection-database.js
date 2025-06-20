import { http } from './index';
import { useEffect, useState } from "react";


const UseConnectionDatabase = async()=>{

    // const [ urlConnectionBackendCondition, setUrlConnectionBackendCondition ] = useState('');
    let urlConnectionBackendCondition = '';

    const urlConnectionBackendOne = import.meta.env.VITE_URL_CONNECTION_BACKEND;
    const urlConnectionBackendTwo = import.meta.env.VITE_URL_CONNECTION_BACKEND_TWO;

    // useEffect(()=>{
        
        const getConnectionBackend = async()=>{
            
            await http.get( urlConnectionBackendOne, {timeout: 1000} ).then( ({ status }) => {

            if( status === 200 ){
                urlConnectionBackendCondition = urlConnectionBackendOne;
                return
            }
            
            })
            .catch ( () =>{
                console.log( 'Backend 1 no respondio' );

            });

            await http.get( urlConnectionBackendTwo, { timeout: 1000 } ).then( ({ status }) => {
                if( status === 200 ){
                    urlConnectionBackendCondition = urlConnectionBackendTwo;
                    return
                }
                
            })
            .catch ( () =>{
                console.log( 'Backend 2 no respondio' );

            });       
        }


        await getConnectionBackend();
    // },[])
// console.log(urlConnectionBackendCondition);
    return urlConnectionBackendCondition;

}


export {
    UseConnectionDatabase
}