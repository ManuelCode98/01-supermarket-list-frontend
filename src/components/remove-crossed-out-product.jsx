import { http } from '../index';
import { uploadProductsAfterDeleting } from './add-product-to-list/add-product-to-list';
import '../assets/styles/components/remove-crossed-out-product.css';



const RemoveCrossedOutProduct = ( { urlConnectionBackend } )=>{

    const deleteAll = ( )=>{

    //    const question = confirm( `Seguro que quieres borrar todos los productos ?` );
       swal.fire({
            title:'Borrar Productos',
            text:'Seguro que quieres borrar todos los productos ?',
            icon:'warning',
            color: 'red',
            confirmButtonText: 'Si',
            showCancelButton: true,
            cancelButtonColor: '#01a503',
            background: '#00000087',
            confirmButtonColor:'#eb091a'
        })
        .then( async result =>{

            if( result.isConfirmed ){

                swal.fire( 'Si', 'Todos los productos han sido eliminado', 'success' )

                try {

                    const { data } = await http.delete(`${urlConnectionBackend}api/delete-all-products`)

                    const products = data.data;
                    uploadProductsAfterDeleting( products );
                } catch ({ message }) {
                    
                    swal.fire({
                        title:'Oh!',
                        text:'No hay conexion con la base de datos!',
                        icon:'error',
                        color: 'red',
                        background: '#00000087',
                        confirmButtonColor:'#01a503'
                    })
                    console.log(`No hay conexion con el backend ${ message }`)
                }

                return
            }
        })

    };

    const deleteCrossedOutProducts = async()=>{
        
        try {
            const { data } = await http.get(`${urlConnectionBackend}api/get-crossed-out-products` )

            const products = data.data;
            uploadProductsAfterDeleting( products )

        } catch ({ message }) {

            swal.fire({
                title:'Oh!',
                text:'No hay conexion con la base de datos!',
                icon:'error',
                color: 'red',
                background: '#00000087',
                confirmButtonColor:'#01a503'
            })

            console.log(`No hay conexion con la base de datos, ${ message }`)
        }
        
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