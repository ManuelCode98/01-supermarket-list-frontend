

const totalCostOfAllProducts = ( receiveProductState )=>{ 

    let total = [];
    
    if( receiveProductState ){
        for (let i = 0; i < receiveProductState.length; i++) {
        
        total.push( receiveProductState[i].result);                    
    }
    }

    return total;

}; 


export {
    totalCostOfAllProducts
}