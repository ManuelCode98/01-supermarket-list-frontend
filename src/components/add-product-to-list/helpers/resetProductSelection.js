

const resetProductSelection = ( setEditOrNotEdit, setIndexProduct, setInputAmountState, setInputPriceState, setcurrentProductSelectionState )=>{
        
    setEditOrNotEdit('not-edit');
    setIndexProduct( null );

    setInputAmountState( 1 );
    setInputPriceState( 1 );
    setcurrentProductSelectionState({});

};

export default resetProductSelection
