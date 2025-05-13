import axios from "axios";
import { uploadProductsAfterDeleting } from './add-product-to-list';
import '../assets/styles/components/remove-crossed-out-product.css';


const urlConnectionBackend = import.meta.env.VITE_URL_CONNECTION_BACKEND;

const RemoveCrossedOutProduct = (  )=>{

    const deleteAll = ( )=>{

       const question = confirm( `Seguro que quieres borrar todos los productos ?` );

       if( question === true ){

        // axios.delete(`http://localhost:3002/api/delete-all-products`)
        axios.delete(`${urlConnectionBackend}api/delete-all-products`)

        .then( ( {data} ) =>{
            
            const products = data.data;
            uploadProductsAfterDeleting( products );
        })

        return
       }
    };

    const deleteCrossedOutProducts = ()=>{
        // axios.get(`http://localhost:3002/api/get-crossed-out-products` )
        axios.get(`${urlConnectionBackend}api/get-crossed-out-products` )

        .then( ( {data} ) =>{

            const products = data.data;
            uploadProductsAfterDeleting( products )
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