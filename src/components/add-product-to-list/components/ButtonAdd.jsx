import { useState } from "react";
import { currentProductAdded } from "../helpers/currentProductAdded";
import currentProductAddedOther from "../helpers/currentProductAddedOther";




const ButtonAdd = ( { data } ) => {

    const [ buttonAddState, setButtonAddState ] = useState( 'W' );

    const currentProductSelectionState  = data[0];
    const inputAmountState              = data[1]; 
    const inputPriceState               = data[2];
    const receiveProductState           = data[3] 
    const setReceiveProductState        = data[4];
    const inputProductNameState         = data[5];
    const productPhotoOtherState        = data[6];

    const { product_name } = currentProductSelectionState;
   
  return (
    <>
        {
        product_name !== 'Otros' ?
            <div className="buttons buttons-add-cancel add" onClick={ ()=> currentProductAdded( currentProductSelectionState, inputAmountState, inputPriceState, receiveProductState, setReceiveProductState ) } > {buttonAddState} </div>
            :
            <div className="buttons buttons-add-cancel add" onClick={ ()=> currentProductAddedOther( inputAmountState, inputPriceState, receiveProductState, setReceiveProductState, inputProductNameState, productPhotoOtherState ) } > {buttonAddState} </div>
        }
        
    </>
  )
}

export default ButtonAdd
