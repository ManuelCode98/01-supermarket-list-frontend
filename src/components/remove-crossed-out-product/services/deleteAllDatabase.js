import { http } from "../../../index";
import { uploadProductsAfterDeleting } from "../../add-product-to-list/add-product-to-list";



const deleteAllDatabase = async( urlConnectionBackend ) => {
    try {
  
        const { data } = await http.delete(`${urlConnectionBackend}api/delete-all-products`)

        const products = data.data;
        uploadProductsAfterDeleting( products );
        swal.fire({
            text:'Todos los productos han sido eliminado', 
            icon:'success',
            iconColor: 'green',
            color: 'red', 
            confirmButtonColor:'#01a503',
            background: '#00000087',
        })

    } catch ({ message }) {
        
        swal.fire({
            title:'Oh!',
            text:'No hay conexion con la base de datos!',
            icon:'error',
            color: 'red',
            timer: 3000,
            background: '#00000087',
            confirmButtonColor:'#01a503'
        })
        console.log(`No hay conexion en la base de datos, ${ message }`)
        
    };
};

export default deleteAllDatabase
