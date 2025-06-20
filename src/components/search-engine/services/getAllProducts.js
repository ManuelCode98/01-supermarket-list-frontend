import { http } from '../../../index';



const getAllProducts = async( urlConnectionBackend ) => {
  
    try {
        const products = await http.get( `${ urlConnectionBackend }api/get-all-products`, { timeout: 3500 } )

        return products.data;

    } catch ({ message }) {

        swal.fire({
            title: 'Oh!',
            text: 'No pudimos hacer la conexion con la base de datos!',
            icon:'error',
            color: 'red',
            background: '#00000087',
            timer: 3000,
            confirmButtonColor:'#01a503'
        })

        console.log(`No pudimos hacer la conexion con la base de datos, ${ message }`);
    }
}

export default getAllProducts
