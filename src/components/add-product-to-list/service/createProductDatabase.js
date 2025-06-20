import { http, urlConnectionBackend } from '../../../index';


const createProductDatabase = async( product ) => {

    try {
        const { data }= await http.post(`${urlConnectionBackend}api/create-product`, product)

        const id = data.id
        return id
    } catch ({ message }) {
        swal.fire({
            title:'Oh!',
            text:'No se pudo guardar el nuevo producto en la base de datos!',
            icon:'error',
            color: 'red',
            background: '#00000087',
            timer: 3000,
            confirmButtonColor:'#01a503'
        })
        console.log( 'No se pudo guardar el nuevo producto en la base de datos, ', message );
    }

    return productCreated.id
}

export default createProductDatabase
