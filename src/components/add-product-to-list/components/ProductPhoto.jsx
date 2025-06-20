


const ProductPhoto = ( { data } ) => {

  const product_name           = data[0];
  const onChangeProductPhoto   = data[1];
  const product_photo          = data[2];
  const currentPhotoOther = data[3];
  

  return (
    <>
      { ( product_name === 'Otros' ?
        <>
            <label htmlFor='input-file' className="label-file" >
              { 
                currentPhotoOther.length > 0 ? 
                  <img className="img-temporary-url" src={ currentPhotoOther } />
                  :
                  'D'
              }
            </label> 
            <input type="file" accept='image/*' id='input-file' onChange={ onChangeProductPhoto } className="photo-img input-file" name="photo-img" />
        </>
        :   <img className="photo-img" src={ product_photo } id="product-photo-input"/>
    ) }
    </>
  )
}

export default ProductPhoto
