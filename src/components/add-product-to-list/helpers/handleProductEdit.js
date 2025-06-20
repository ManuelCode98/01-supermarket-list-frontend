





const handleProductEdit = ( event, editOrNotEdit, setIndexProduct, index, setProductToEdit, receiveProductState, setInputAmountStateEdit, product_amount, setInputPriceStateEdit, product_price, setEditOrNotEdit, setReceiveProductState ) => {
  
    const { target } = event;
    const { currentTarget } = event;
    const crossed_out = currentTarget.className;
    

    if ( target.innerText !== '&' ) return    

    if( crossed_out === 'not-crossed-out' && editOrNotEdit === 'not-edit' ){ 

        setIndexProduct( index );
        setProductToEdit( receiveProductState[index] )

        setInputAmountStateEdit( product_amount[1] );
        setInputPriceStateEdit( product_price[1] );

        setEditOrNotEdit('edit');        
    };  

};

export default handleProductEdit
