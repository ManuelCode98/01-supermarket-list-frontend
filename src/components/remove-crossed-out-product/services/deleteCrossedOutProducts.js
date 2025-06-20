import { http } from "../../../index";
import { uploadProductsAfterDeleting } from "../../add-product-to-list/add-product-to-list";




const deleteCrossedOutProducts = async( urlConnectionBackend ) => {
  
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

export default deleteCrossedOutProducts
