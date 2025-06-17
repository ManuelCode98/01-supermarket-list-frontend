import { http } from '../../../index';  

const getProductNames = async( urlConnectionBackend, letterSearch ) => {

    if( letterSearch.length === 0 ) return;

    return await http.post(`${urlConnectionBackend}api/search-product`)
        .then( ( { data } )=>{

            const resProductArr = data.data;

            const searchingProductName = resProductArr.filter( 
                searchingProduct => searchingProduct.product_name.toLowerCase().startsWith( letterSearch.toLowerCase() )
                
            );

            // Le agregamos todos los atributos de un producto encontrado por su nombre
            return searchingProductName ;
        })
        .catch( ( { message } ) =>{

            console.log(`No hay conexion con el backend ${ message }`)
        } )
}

export default getProductNames
