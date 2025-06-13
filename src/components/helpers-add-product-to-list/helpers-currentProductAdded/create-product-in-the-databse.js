import axios from "axios";

const createProductInTheDatabse = async( inputProductNameState, url )=>{ 

    const product = {
        product_name: inputProductNameState,
        product_photo: url,
        product_amount: 0,
        product_price: 0,
    };

    await axios.post(`${urlConnectionBackend}api/create-product`, product)            
    .then( ({data})=>{
        
        id = parseInt( data.id );

        product_name = inputProductNameState;
        product_photo = url;
    })

};


export {
    createProductInTheDatabse 
}