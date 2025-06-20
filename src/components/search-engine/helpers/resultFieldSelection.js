import { receiveProduct } from "../../add-product-to-list/add-product-to-list";





const resultFieldSelection = async( { currentTarget }, inputSearch, setProductFoundByNameArr )=>{

    const { id, innerText,  } = currentTarget;

    const product_name = innerText;
    const product_photo = currentTarget.querySelector('img').src;
    const product_amount = currentTarget.querySelectorAll('data')[0].value;
    const product_price = currentTarget.querySelectorAll('data')[1].value;

    const productFullOfAttributes = {
        id,
        product_name,
        product_photo,
        product_amount,
        product_price,
    }    

    receiveProduct( productFullOfAttributes );
    inputSearch.current.value = '';
    setProductFoundByNameArr( [] );
};


export default resultFieldSelection;