import { addNewProductToTheList } from "./helpers-currentProductAdded/add-new-product-to-the-list";
import { createProductInTheDatabse } from "./helpers-currentProductAdded/create-product-in-the-databse";
import { savePhotoOfTheNewProduct } from "./helpers-currentProductAdded/save-photo-of-the-new-product";


const currentProductAdded = async( helpers )=>{

    const {
        urlConnectionBackend, 
        currentProductSelectionState, 
        setcurrentProductSelectionState, 
        product_amount, product_price, 
        setButtonAddState, 
        setButtonCancelState, 
        productPhotoOtherState, 
        inputProductNameState, 
        receiveProductState, 
        setReceiveProductState
    } = helpers

        let id = parseInt( currentProductSelectionState.id );
        let product_name = currentProductSelectionState.product_name;
        let product_photo = currentProductSelectionState.product_photo;
        setButtonAddState('')
        setButtonCancelState('')

        if( product_name === 'Otros' && productPhotoOtherState ){

            const { success, url } = savePhotoOfTheNewProduct()

            if( success === true ){

                createProductInTheDatabse( inputProductNameState, url );   
            }
        };

        const checkRepeatId = receiveProductState.findIndex( ( product )=> (

            product.id === id

        ));

        if( checkRepeatId != -1 ){
            setButtonAddState('W')
            setButtonCancelState('X')
        }

        if( checkRepeatId === -1 ){

            const helpers = {
                urlConnectionBackend, 
                id, 
                product_name, 
                product_photo, 
                product_amount, 
                product_price, 
                setInputAmountState, 
                setInputPriceState, 
                setReceiveProductState, 
                setcurrentProductSelectionState, 
                setButtonAddState, 
                setButtonCancelState
            }

            addNewProductToTheList( helpers )

            return;
        }
    }

    export {
        currentProductAdded
    }