import { http, urlConnectionBackend } from '../../../index';




const updateProductToList = async( product, setReceiveProductState, receiveProductState ) => {

    const { id } = product;

    try {
        await http.put(`${urlConnectionBackend}api/update-product-list/${id}`, product)
    } catch ({ message }) {
        setReceiveProductState( receiveProductState )

        swal.fire({
            title:'Oh!',
            text:'No se puedo actualizar el producto de la lista!',
            icon:'error',
            color: 'red',
            background: '#00000087',
            timer: 3000,
            confirmButtonColor:'#01a503'
        })
        
        console.log(`No se puedo actualizar el producto de la lista, ${ message }`)
    }    
    
}

export default updateProductToList
