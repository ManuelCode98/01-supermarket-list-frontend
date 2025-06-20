import { http, urlConnectionBackend } from '../../../index';


const loadProductsWhenReloading = async( )=>{ 

    try {

        const { data } = await http.get( `${urlConnectionBackend}api/show-products`, { timeout: 2500 } )
        
        return data.products

    } catch ({ message }) {

        swal.fire({
            title:'Oh!',
            text:'No hay conexion con la base de datos!',
            icon:'error',
            color: 'red',
            background: '#00000087',
            timer: 3000,
            confirmButtonColor:'#01a503'
        })
        console.log(`No hay conexion con la base de datos, ${ message }`)
    }

};


export {
    loadProductsWhenReloading
}