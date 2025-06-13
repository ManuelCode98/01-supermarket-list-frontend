import axios from "axios";

const addNewProductToTheList = async( helpers )=>{ 

    const {
        urlConnectionBackend, 
        id, 
        product_name, 
        product_photo, 
        product_amount, 
        product_price, 
        setInputAmountState, 
        setInputPriceState, 
        setReceiveProductState, 
        setcurrentProductSelectionState, 
        setButtonAddState, 
        setButtonCancelState
        } = helpers

    const crossed_out = 'not-crossed-out';
    const result = product_amount * product_price;

    const product = {
    id,
    product_name,
    product_photo,
    crossed_out,
    product_amount,
    product_price,
    result,
    } 

    await axios.post( `${urlConnectionBackend}api/add-product-to-list`, product )
    .then( ( ) => {

        setInputAmountState( 1 );
        setInputPriceState( 1 );
        setReceiveProductState( prevArray => [ ...prevArray, product ] );
        setcurrentProductSelectionState({});
        setButtonAddState('W');
        setButtonCancelState('X'); 
    })

};

export {
    addNewProductToTheList
}
