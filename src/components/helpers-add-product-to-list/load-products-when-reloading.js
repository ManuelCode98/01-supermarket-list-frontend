import axios from "axios";


const loadProductsWhenReloading = async( urlConnectionBackend )=>{ 

    const getAllProduct = await axios.get( `${urlConnectionBackend}api/show-products` )
    .then( ({ data }) => {
        const { products } = data;
        
        return products
    })
    .catch( ( { message } ) =>{

        console.log(`No hay conexion con el backend ${ message }`)
    })

    return getAllProduct;
};


export {
    loadProductsWhenReloading
}