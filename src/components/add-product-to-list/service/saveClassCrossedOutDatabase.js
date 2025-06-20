import { urlConnectionBackend } from "../../..";
import { http } from "../../..";



const saveClassCrossedOutDatabase = async( productClassName, id, product_name, product_photo, product_amount, product_price, result ) => {

    const product = {   
        id, 
        product_name, 
        product_photo,
        crossed_out:productClassName, 
        product_amount, 
        product_price, 
        result
    }

    try {
        
        await http.post( `${urlConnectionBackend}api/save-crossed-out-products`, product )

    } catch ({ message }) {
        
        swal.fire({
            title:'Oh!',
            text:'Error al tratar de guardar el tachado en la base de datos!',
            icon:'error',
            color: 'red',
            background: '#00000087',
            timer: 3000,
            confirmButtonColor:'#01a503'
        })
        console.log(`Error al tratar de guardar el tachado en la base de datos ${ message }`)

    };

}

export default saveClassCrossedOutDatabase
