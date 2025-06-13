import axios from "axios";

const conexionImgbb = `https://api.imgbb.com/1/upload?key=12474afbd8f57b42c6df468c4bcf3cd7`;

const savePhotoOfTheNewProduct = async()=>{ 

    const formData = new FormData();
    formData.append( 'image', productPhotoOtherState )
    
    const uploadProductPhoto = await axios.post( conexionImgbb, formData, {
        headers: {
            "Content-Type": "multipart/form-data"
        }
    });
    
    const { success } = uploadProductPhoto.data;
    const { url } = uploadProductPhoto.data.data;
    
    return { success, url }
};

export {
    savePhotoOfTheNewProduct
}