import { http, urlConnectionBackend } from '../../../index';  



const currentProductAddedDatabase = async( product, receiveProductState, setReceiveProductState )=>{ 

    try {

        await http.post(`${urlConnectionBackend}api/add-product-to-list`, product, { timeout: 2500 } )

    } catch ({ message }) {

        const newArray = receiveProductState;
        newArray.pop();
        setReceiveProductState( newArray )

        swal.fire({
            title:'Oh!',
            text:'Error al guardar el producto en la base de datos!',
            icon:'error',
            color: 'red',
            background: '#00000087',
            timer: 3000,
            confirmButtonColor:'#01a503'
        })
        console.log('Error al guardar el producto en la base de datos, ', message);
    }

};

export default currentProductAddedDatabase
