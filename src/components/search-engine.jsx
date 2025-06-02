
import { useState } from 'react';
import axios from 'axios';
import '../assets/styles/components/search-engine.css';
import { receiveProduct } from './add-product-to-list';


const urlConnectionBackend = import.meta.env.VITE_URL_CONNECTION_BACKEND;

const SeachEngine = ( { urlConnectionBackend } )=>{
    
    const [ searchingProduct, setSearchingProduct ] = useState('');
    const [ productFoundByNameArr, setProductFoundByNameArr ] = useState([]);
    
    const onInputChange = ( { target } )=>{
        
        let letterSearch = target.value;

        setSearchingProduct( letterSearch );

        if( letterSearch ){
            
            axios.post(`${urlConnectionBackend}api/search-product`)
            .then( ( { data } )=>{

                const resProductArr = data.data;

                const searchingProductName = resProductArr.filter( 
                    searchingProduct => searchingProduct.product_name.toLowerCase().startsWith( letterSearch.toLowerCase() )
                    
                );

                // Le agregamos todos los atributos de un producto encontrado por su nombre
                setProductFoundByNameArr( searchingProductName );
                
                return;
            })
            .catch( ( { message } ) =>{

                console.log(`No hay conexion con el backend ${ message }`)
            } )
            
        } if( !letterSearch ){

            setProductFoundByNameArr( [] );
            return;
        }  
    }

    const resultFieldSelection = async( { target } )=>{

        const inputSearch = document.querySelector('.input-search');
        const { id } = target;

            const product_name = target.innerText;
            const product_photo = target.querySelector('img').src;
            const product_amount = target.querySelectorAll('data')[0].value;
            const product_price = target.querySelectorAll('data')[1].value;
    
            const productFullOfAttributes = {
                id,
                product_name,
                product_photo,
                product_amount,
                product_price,
            }    

            receiveProduct( productFullOfAttributes );
            inputSearch.value = '';
            setProductFoundByNameArr( [] );
    };

    const takeMeToTheInput = ( )=>{

        const inputSearch = document.querySelector('.input-search').focus();

    };

    return (

        <div className='search-bar-container'>
            <div className='search-bar'>
                <input className='input-search' type="search" onChange={ onInputChange } placeholder="Que producto buscas?" />
                <div className='button-search' onClick={ (event)=> takeMeToTheInput(event) } >L</div>
            </div>
            <div id='container-input-search'>
                {
                   productFoundByNameArr.map( ( productFound )=>{

                        const { id ,product_name, product_photo, product_amount, product_price } = productFound;

                        return ( 
                            <div key={id} id={id} className='container-product-found' onClick={ resultFieldSelection }> 
                                <img className='img-product' src={product_photo} /> 
                                    {product_name}
                                <data value={product_amount}></data>
                                <data value={product_price}></data> 
                            </div>
                        )
                    })
                }
            </div>
        </div>    
    );
};

export {
    SeachEngine,
}
