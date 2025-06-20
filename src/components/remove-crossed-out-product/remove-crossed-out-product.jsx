import './remove-crossed-out-product.css';
import deleteAll from './helpers/deleteAll';
import deleteCrossedOutProducts from './services/deleteCrossedOutProducts';



const RemoveCrossedOutProduct = ( { urlConnectionBackend } )=>{

    return (
        <>
            <div className="container-button-delete">
                <button className="buttons-delete all-products" onClick={( )=>{ deleteAll( urlConnectionBackend ) }}>Borrar todos </button>
                <button className="buttons-delete crossed-out-products" onClick={( )=>{ deleteCrossedOutProducts( urlConnectionBackend ) }} >Borrar tachados </button>
            </div>
        </>
    )

}

export {
    RemoveCrossedOutProduct
}