import { http } from "../../../index";
import optimizeImage from "./optimizeImage";

const conexionImgbb = `https://api.imgbb.com/1/upload?key=12474afbd8f57b42c6df468c4bcf3cd7`;

const savePhotoOfTheNewProduct = async( productPhotoOtherState )=>{ 

    swal.fire( {
        text: 'Subiendo imagen por favor espere...',
        color: 'red',
        background: '#00000087',
        confirmButtonColor:'#01a503'
    })
    
    const compressedImage = await optimizeImage(  productPhotoOtherState )

    const formData = new FormData();
    formData.append( 'image', compressedImage )
    
    try {

        const uploadProductPhoto = await http.post( conexionImgbb,formData, {
            headers: {
                "Content-Type": "multipart/form-data"
            }}, { timeout: 3000 })

        const { success } = uploadProductPhoto.data;
        const { url } = uploadProductPhoto.data.data;
    
        swal.fire({
            text: 'Imagen guardada...',
            icon:'success',
            color: 'red',
            background: '#00000087',
            timer: 3000,
            confirmButtonColor:'#01a503'
        })

        return { success, url }
        
    } catch ({ message }) {

        swal.fire({
            title:'Oh!',
            text:'Error al guardar la imagen en ImgBB!',
            icon:'error',
            color: 'red',
            background: '#00000087',
            timer: 3000,
            confirmButtonColor:'#01a503'
        })
        console.log('Error al guardar la imagen en ImgBB, ',message);

    }
    
};

export {
    savePhotoOfTheNewProduct
}