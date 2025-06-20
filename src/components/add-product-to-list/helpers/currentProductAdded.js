import { setCurrentProductSelection , setInputAmountStateExport, setInputPriceStateExport } from "../add-product-to-list";
import currentProductAddedDatabase from "../service/currentProductAddedDatabase";


const currentProductAdded = async( currentProduct, inputAmountState, inputPriceState, receiveProductState, setReceiveProductState )=>{

    
    const { id, product_photo, product_name } = currentProduct;
    
    const productExists = receiveProductState?.find( product =>(
        product.id === id
    ))

    if( productExists ) return;
    

    if( product_name === 'Otros' )return
    const product_amount = inputAmountState;
    const product_price = inputPriceState;
    const crossed_out = 'not-crossed-out';
    
    const result = product_amount * product_price;
    
    const product = { id, product_photo, product_name, product_amount:[ 0, product_amount ], product_price:[ 0, product_price ], result:[ 0, result ], crossed_out };
    

    currentProductAddedDatabase( product, receiveProductState, setReceiveProductState );

    setInputAmountStateExport( 1 );
    setInputPriceStateExport( 1 );
    setCurrentProductSelection({});
  
    
    if( !receiveProductState ){
        
        setReceiveProductState( [...[], product] );
        return;
    }
    
    setReceiveProductState( prevArr => [...prevArr, product] );
    
}

export {
    currentProductAdded
}