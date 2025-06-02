import axios from "axios";
import { uploadProductsAfterDeleting } from './add-product-to-list';
import '../assets/styles/components/remove-crossed-out-product.css';



const RemoveCrossedOutProduct = ( { urlConnectionBackend } )=>{

    const deleteAll = ( )=>{

       const question = confirm( `Seguro que quieres borrar todos los productos ?` );

       if( question === true ){

        axios.delete(`${urlConnectionBackend}api/delete-all-products`)

        .then( ( {data} ) =>{
            
            const products = data.data;
            uploadProductsAfterDeleting( products );
        })
        .catch( ( { message } ) =>{

            console.log(`No hay conexion con el backend ${ message }`)
        } )

        return
       }
    };

    const deleteCrossedOutProducts = ()=>{
        axios.get(`${urlConnectionBackend}api/get-crossed-out-products` )

        .then( ( {data} ) =>{

            const products = data.data;
            uploadProductsAfterDeleting( products )
        } )
        .catch( ( { message } ) =>{

             console.log(`No hay conexion con el backend ${ message }`)
        } )
    }

    return (
        <>
            <div className="container-button-delete">
                <button className="buttons-delete all-products" onClick={( )=>{ deleteAll( ) }}>Borrar todos </button>
                <button className="buttons-delete crossed-out-products" onClick={()=>{ deleteCrossedOutProducts() }} >Borrar tachados </button>
            </div>
        </>
    )

}

export {
    RemoveCrossedOutProduct
}