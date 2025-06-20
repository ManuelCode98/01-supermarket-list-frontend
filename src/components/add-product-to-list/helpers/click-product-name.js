import saveClassCrossedOutDatabase from "../service/saveClassCrossedOutDatabase";



const clickProductName = async( event, id, product_name, product_photo, product_amount, product_price, result, receiveProductState, setReceiveProductState, editOrNotEdit, setEditOrNotEdit )=>{
                                    
    const { currentTarget } = event;
    const { target } = event;
    const crossedOut    = 'crossed-out'
    const notCrossedOut = 'not-crossed-out'
    const WhatClassDoesItHave = currentTarget.className;

    
    if( target.innerText === '&' ) return
        
    if( editOrNotEdit === 'edit' ) return

    if( WhatClassDoesItHave === notCrossedOut ){

        currentTarget.classList.toggle( crossedOut );
        currentTarget.classList.remove( notCrossedOut )

        setReceiveProductState( receiveProductState.map( product =>(
            id === product.id ? { ...product, crossed_out: crossedOut } : product
        )))
        saveClassCrossedOutDatabase( crossedOut, id, product_name, product_photo, product_amount, product_price, result )
        return
    }

    currentTarget.classList.remove( crossedOut )
    currentTarget.classList.toggle( notCrossedOut )

    setReceiveProductState( receiveProductState.map( product =>(
        id === product.id ? { ...product, crossed_out: notCrossedOut } : product
    )))
    saveClassCrossedOutDatabase( notCrossedOut, id, product_name, product_photo, product_amount, product_price, result )

};

export {
    clickProductName
}