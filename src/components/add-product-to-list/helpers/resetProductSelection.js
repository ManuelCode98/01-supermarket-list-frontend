import { setCurrentProductSelection } from "../add-product-to-list";


const resetProductSelection = ( setEditOrNotEdit, setIndexProduct, setInputAmountState, setInputPriceState )=>{
        
    setEditOrNotEdit('not-edit');
    setIndexProduct( null );

    setInputAmountState( 1 );
    setInputPriceState( 1 );
    setCurrentProductSelection({});

};

export default resetProductSelection
