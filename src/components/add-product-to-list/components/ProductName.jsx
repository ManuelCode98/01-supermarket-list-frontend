




const ProductName = ( { data } ) => {

  const product_name = data[0]
  const inputProductNameState = data[1]
  const functionValueProductNameState = data[2]
 
  return (
    <>
     { ( product_name === 'Otros' ? 
        <input type="name" placeholder="Nombre del producto..." value={ inputProductNameState } onChange={ functionValueProductNameState } className="input-product-name" name="product-name" />
        :  product_name 
    ) } 
    </>
  )
}

export default ProductName
