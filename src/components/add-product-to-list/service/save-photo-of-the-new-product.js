import { http } from "../../../index";

const conexionImgbb = `https://api.imgbb.com/1/upload?key=12474afbd8f57b42c6df468c4bcf3cd7`;

const savePhotoOfTheNewProduct = async( productPhotoOtherState )=>{ 

    const formData = new FormData();
    formData.append( 'image', productPhotoOtherState )
    
    try {

        const uploadProductPhoto = await http.post( conexionImgbb,formData, {
            headers: {
                "Content-Type": "multipart/form-data"
            }}, { timeout: 3000 })

        const { success } = uploadProductPhoto.data;
        const { url } = uploadProductPhoto.data.data;
    
        return { success, url }
        
    } catch ({ message }) {

        swal.fire({
            title:'Oh!',
            text:'Error al guardar la imagen en ImgBB!',
            icon:'error',
            color: 'red',
            background: '#00000087',
            timer: 1500,
            confirmButtonColor:'#01a503'
        })
        console.log('Error al guardar la imagen en ImgBB, ',message);

    }
    
};

export {
    savePhotoOfTheNewProduct
}