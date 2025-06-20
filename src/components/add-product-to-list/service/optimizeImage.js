import { compressor } from "../../.."




const optimizeImage = async( image ) => {
  
    const imageCompressor = await new Promise( resolv =>{

        new compressor( image, {
            quality: 0.6,
            maxWidth: 500,
            maxHeight: 500,
            success: ( result )=>{
                resolv( result );
            },
            error: ( err )=>{

                swal.fire({
                    text: 'Error al comprimir la imagen!',
                    color: 'red',
                    background: '#00000087',
                    confirmButtonColor:'#01a503'
                })
                console.log(`Error al comprimir la imagen!, ${err}`);
            }
        }) 
    })

    return imageCompressor;

}

export default optimizeImage
