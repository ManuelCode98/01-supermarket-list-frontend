
import { useEffect, useRef, useState } from 'react';
import resultFieldSelection from './helpers/resultFieldSelection';
import getAllProducts from './services/getAllProducts';
import './search-engine.css';

const SearchEngine = ( { urlConnectionBackend } )=>{
    
    const inputSearch = useRef(null);
    const contentProduct = useRef( null );
    const [ searchingProduct, setSearchingProduct ] = useState('');
    const [ productFoundByNameArr, setProductFoundByNameArr ] = useState([]);
    const [ allProductsState, setAllProductsState ] = useState([]);

    useEffect(()=>{

        const functionSetAllproducts = async()=>{
            const allProducts = await getAllProducts( urlConnectionBackend )
            setAllProductsState( allProducts )
        }

        functionSetAllproducts();

    },[])

    
    const onInputChange = ( { target } )=>{
        
        const letterSearch = target.value;
        setSearchingProduct( letterSearch );
        
        const setProductNames = async(  )=>{

            const productNames = allProductsState.filter( 
                searchingProduct => searchingProduct.product_name.toLowerCase().startsWith( letterSearch.toLowerCase() )
                
            );
            setProductFoundByNameArr( productNames )
        }
        setProductNames()

        if( letterSearch.length === 0  ) setProductFoundByNameArr( [] );

    }

    const takeMeToTheInput = ( )=> inputSearch.current.focus();

    return (

        <div className='search-bar-container'>
            <div className='search-bar'>
                <input ref={ inputSearch } className='input-search' type="search" onChange={ onInputChange } placeholder="Que producto buscas?" />
                <div className='button-search' onClick={ takeMeToTheInput } >L</div>
            </div>
            <div id='container-input-search'>
                {
                   Array.isArray( productFoundByNameArr )&& productFoundByNameArr.map( ( productFound )=>{

                        const { id ,product_name, product_photo, product_amount, product_price } = productFound;

                        return ( 
                            <div ref={ contentProduct } key={id} id={id} className='container-product-found' 
                                 onClick={ ( e )=>resultFieldSelection( e, inputSearch, setProductFoundByNameArr ) }> 
                                 
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
    SearchEngine,
}
