


const handleProductEdit = ( event, editOrNotEdit, setIndexProduct, index, setProductToEdit, receiveProductState, setInputAmountStateEdit, product_amount, setInputPriceStateEdit, product_price, setEditOrNotEdit ) => {
  
    const { target } = event;
    const { currentTarget } = event;
    const crossed_out = currentTarget.className;
    

    if ( target.innerText !== '&' ) return    
    if ( target.innerText === '&' && crossed_out === 'crossed-out' ) {
        
        swal.fire({
            title:'Oh!',
            text:'No puedes editar un producto si esta tachado en la lista!',
            icon:'error',
            color: 'red',
            background: '#00000087',
            timer: 3000,
            confirmButtonColor:'#01a503'
        })
        return
    }    

    if( crossed_out === 'not-crossed-out' && editOrNotEdit === 'not-edit' ){  

        setIndexProduct( index );
        setProductToEdit( receiveProductState[index] )

        setInputAmountStateEdit( product_amount[1] );
        setInputPriceStateEdit( product_price[1] );

        setEditOrNotEdit('edit');        
    };  

};

export default handleProductEdit
