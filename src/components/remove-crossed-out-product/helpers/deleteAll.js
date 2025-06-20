import deleteAllDatabase from "../services/deleteAllDatabase"




const deleteAll = ( urlConnectionBackend ) => {
  
    swal.fire({
        title:'Borrar Productos',
        text:'Seguro que quieres borrar todos los productos ?',
        icon:'question',
        iconColor:'green',
        color: 'red',
        confirmButtonText: 'Si',
        showCancelButton: true,
        cancelButtonColor: '#01a503',
        background: '#00000087',
        confirmButtonColor:'#eb091a'
    })
    .then( async result =>{

        if( result.isConfirmed ) deleteAllDatabase( urlConnectionBackend );
    });
};

export default deleteAll
