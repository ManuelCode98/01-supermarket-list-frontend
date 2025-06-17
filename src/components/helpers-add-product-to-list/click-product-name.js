import axios from "axios";


const clickProductName = async( {target}, index, id , crossed_out, product_name, product_photo, product_amount, product_price, result, helpers )=>{

    const searchId = id;
    // let changeCrossedOut = '';
        const { 
            urlConnectionBackend,
            editOrNotEdit, 
            setEditOrNotEdit,
            setIndexProduct,
            setProductToEdit,
            setInputAmountStateEdit,
            setInputPriceStateEdit,
            receiveProductState,
            setReceiveProductState
        } = helpers;

        if( target.innerHTML === '&' && crossed_out === 'not-crossed-out' && editOrNotEdit === 'not-edit' ){
            
            setIndexProduct( index );
            setProductToEdit( receiveProductState[index] )

            setInputAmountStateEdit( product_amount );
            setInputPriceStateEdit( product_price );

            setEditOrNotEdit('edit');
            return
        }

        if( editOrNotEdit === 'not-edit' ){ 

            await axios.post( `${urlConnectionBackend}api/save-crossed-out-products`, 
                {   
                    id, 
                    product_name, 
                    product_photo,
                    crossed_out, 
                    product_amount, 
                    product_price, 
                    result
                }
            )
            .then( ( {status} ) => {
    
                if( status === 200 ){

                    axios.get( `${urlConnectionBackend}api/show-products` )
                    .then( async({ data }) => { 
                        
                        const { products } = data;

                        if( products ){
                            
                            const allProductDatabase = products.find( product => (
                                product.id === id
                            ))
                        
                            setReceiveProductState( receiveProductState.map( ( product, index, arr )=>
                        
                                product.id === id ? { ...allProductDatabase, crossed_out:allProductDatabase.crossed_out } : product
                            )
                        )}
                        
                    })      
                }
            })
            .catch( ( { message } ) =>{

                console.log(`No hay conexion con el backend ${ message }`)
            } )
        } 
    };

export {
    clickProductName
}