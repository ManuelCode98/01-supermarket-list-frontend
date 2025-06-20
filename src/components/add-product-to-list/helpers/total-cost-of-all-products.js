

const totalCostOfAllProducts = ( receiveProductState )=>{ 

    let total = [];
    
    if( receiveProductState ){
        for (let i = 0; i < receiveProductState.length; i++) {
        
            receiveProductState[i].crossed_out === 'not-crossed-out'
            ? total.push( receiveProductState[i].result[1])
            : total.push( receiveProductState[i].result[0])
                           
        }
    }

    return total;

}; 


export {
    totalCostOfAllProducts
}