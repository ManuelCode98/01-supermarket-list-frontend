import { useState } from "react";
import axios from 'axios';
import '../assets/styles/components/add-product-to-list.css';

const urlConnectionBackend = import.meta.env.VITE_URL_CONNECTION_BACKEND;

let currentProductSelection;
let uploadProductsAfterDeleting;


const receiveProduct = ( { id , product_name, product_photo, product_amount, product_price } )=>{   

    id && currentProductSelection( { id, product_name, product_photo, product_amount, product_price } );
};

const AddProductToList = (  )=>{

    const [ currentProductSelectionState, setcurrentProductSelectionState ] = useState({});

    const [ idCurrentProductoSelection, setIdCurrentProductSelection ] = useState(0);
    const [ urlProductPhoto, setUrlProductPhoto ] = useState('');
    const [ productPhotoOtherState ,setProductPhotoOtherState ]=useState({});
    const [ inputProductNameState, setInputProductNameState ] = useState('')
    const [ inputAmountState, setInputAmountState ] = useState( 1 );
    const [ inputPriceState, setInputPriceState ] = useState( 1 );
    const [ inputAmountStateEdit, setInputAmountStateEdit ] = useState( 1 );
    const [ inputPriceStateEdit, setInputPriceStateEdit ] = useState( 1 );
    
    const [ receiveProductState, setReceiveProductState ] = useState( [] );

    const [ editOrNotEdit, setEditOrNotEdit ] = useState('not-edit');
    const [ indexProduct, setIndexProduct ] = useState( null );
    const [ productToEdit, setProductToEdit ] = useState({}); 

    // variables hechas para vigilar el cambio de estado de un componente fuera del componente padre
    currentProductSelection = setcurrentProductSelectionState;
    uploadProductsAfterDeleting = setReceiveProductState;

    if( !receiveProductState.length ){

            axios.get( `${urlConnectionBackend}api/show-products` )
            .then( ({ data }) => {
                const { status, success, products } = data;
                        
                if( status === 200 && success === true ) setReceiveProductState( products )      
            })
    };
    
    // Aca cargo la variable con el valor total de cada producto para luego sumarlo 
    let total = [];
    
    for (let i = 0; i < receiveProductState.length; i++) {
        
        total.push( receiveProductState[i].result);                    
    }

    
    
    const { id, product_name, product_photo } = currentProductSelectionState;

    const resetProductSelection = ( )=>{
        
        setEditOrNotEdit('not-edit');
        setIndexProduct( null );

        setInputAmountState( 1 );
        setInputPriceState( 1 );
        setcurrentProductSelectionState({});

    };
 
    const currentProductAdded = async( currentProductSelectionState, product_amount, product_price, )=>{

        setIdCurrentProductSelection( parseInt( currentProductSelectionState.id ) );
        const { product_name, product_photo } = currentProductSelectionState;
        const id = idCurrentProductoSelection;

        // if( product_name != 'Otros' ){
        //     console.log('entre')
        //     setInputProductNameState( product_name );
        //     setUrlProductPhoto( product_photo );

        // }

        if( product_name === 'Otros' && productPhotoOtherState ){

            const formData = new FormData();
                  formData.append( 'image', productPhotoOtherState )
            
            const uploadProductPhoto = await axios.post(`https://api.imgbb.com/1/upload?key=12474afbd8f57b42c6df468c4bcf3cd7`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            });
            
            const { success } = uploadProductPhoto.data;
            const { url } = uploadProductPhoto.data.data;

            if( success === true ){

                console.log(inputProductNameState)
                const product = {
                    product_name: inputProductNameState,
                    product_photo: url,
                    product_amount: 0,
                    product_price: 0,
                };

                await axios.post(`${urlConnectionBackend}api/create-product`, product)            
                .then( ( {data} ) => {
                    const productId = parseInt( data.id );
                    setIdCurrentProductSelection(productId);

                })
            }
        };

        console.log(urlProductPhoto)
        console.log(inputProductNameState)

        const checkRepeatId = receiveProductState.findIndex( ( product )=> (

            product.id === id

        ));

        if( checkRepeatId === -1 ){

            const crossed_out = 'not-crossed-out';
            const result = product_amount * product_price;

            const product = {
            id,
            product_name,
            product_photo,
            crossed_out,
            product_amount,
            product_price,
            result,
            } 
    
            await axios.post( `${urlConnectionBackend}api/add-product-to-list`, product )
            .then( ( ) => {

                setInputAmountState( 1 );
                setInputPriceState( 1 );
                setReceiveProductState( prevArray => [ ...prevArray, product ] );
                setcurrentProductSelectionState({}); 
            })
            return;
        }
    };

    const updateProduct = async( index, id, product_name, product_photo, product_amount, product_price, crossed_out ) => {

        if( indexProduct === index ){

            const result = product_amount * product_price;

            const product = {
                id,
                product_name,
                product_photo,
                product_amount,
                product_price,
                crossed_out,
                result
            };

            await axios.put(`${urlConnectionBackend}api/update-product-list/${id}`, product)
            .then( ({data})=>{

                const { product_amount, product_price, result } = data.productUpdated;

                setReceiveProductState( receiveProductState.map( (item, indiceItem, arr)=> 

                    item.id === id ? { ...item, product_amount, product_price, result } :item
                    )
                )  
            });
            
            setIndexProduct( null );
            setEditOrNotEdit('not-edit');
        }
    };

    const onChangeProductPhoto = ( { target } )=>{

        const productPhotoOther = target.files[0];
        setProductPhotoOtherState( productPhotoOther );
    }
    const functionValueProductNameState = ( { target } )=>{

        const currentValueProductName = target.value;
        setInputProductNameState( currentValueProductName );
    }
    const functionValueAmountState = ( { target } )=>{

        const currentValueInput = parseInt( target.value );
        setInputAmountState( currentValueInput );
    };
    const functionValuePriceState = ( { target } )=>{

        const currentValueInput = parseInt( target.value );
        setInputPriceState( currentValueInput );
    };

    const functionValueAmountStateEdit = ( { target } )=>{

        const currentValueInput = parseInt( target.value );
        setInputAmountStateEdit( currentValueInput );
    };
    const functionValuePriceStateEdit = ( { target } )=>{

        const currentValueInput = parseInt( target.value );
        setInputPriceStateEdit( currentValueInput );
    };

    const clickProductName = async( index, event,id=searchId, class_crossed_out, product_name, product_photo, product_amount, product_price, result )=>{

        const { target } = event;

        let crossed_out = class_crossed_out;

        const product = { 
            id,
            product_name,
            product_photo,
            product_amount,
            product_price,
        };

        if( target.innerText === '&' && crossed_out === 'not-crossed-out' && editOrNotEdit === 'not-edit' ){
            
            setIndexProduct( index );
            setProductToEdit( receiveProductState[index] )

            setInputAmountStateEdit( product_amount );
            setInputPriceStateEdit( product_price );

            setEditOrNotEdit('edit');
            return
        }

        if( editOrNotEdit === 'not-edit' ){ 
            await axios.post( `${urlConnectionBackend}api/save-crossed-out-products`, 
                {   
                    id, 
                    product_name, 
                    product_photo,
                    crossed_out, 
                    product_amount, 
                    product_price, 
                    result
                }
            )
            .then( ( {status} ) => {
    
                if( status === 200 ){
                    
                    axios.get( `${urlConnectionBackend}api/show-products` )
                    .then( async({ data }) => { 
                        
                        const { products } = data;

                        setReceiveProductState( products.map( ( item, index, arr )=> 
                        
                            item.id === id ? { ...item, crossed_out:item.crossed_out } : item

                            )
                        ) 
                    })      
                }
            })
        }
    };

    return (
            <div className="container-products">
                <table className="container-table" >
                    <thead>
                        <tr>
                            <th className="th-photo">Foto</th>
                            <th className="th-product">Producto</th>
                            <th className="th-amount">Cantidad</th>
                            <th className="th-price">Precio</th>
                            <th className="th-total">Total</th>
                        </tr>
                    </thead>
                    <tbody>
                       { currentProductSelectionState.id != undefined ? <tr>
                            <td className="td-photo-container">
                                { ( product_name === 'Otros' ? 
                                    <input type="file" onChange={ onChangeProductPhoto } className="photo-img" name="photo-img" />
                                    : <img className="photo-img" src={ product_photo } id="product-photo-input"/>
                                ) }
                            </td>
                            <td className="td-product-container">
                                { ( product_name === 'Otros' ? 
                                    <input type="name" value={ inputProductNameState } onChange={ functionValueProductNameState } className="input-product-name" name="product-name" />
                                    :  product_name 
                                ) }
                                
                            </td>
                            <td className="td-amount-container">
                                <input className="product-amount-input" type="number" value={ inputAmountState } onChange={ functionValueAmountState } />
                            </td>
                            <td className="td-price-container">
                                <input className="product-price-input" type="number" value={ inputPriceState } onChange={ functionValuePriceState} />
                            </td>
                            <td className="td-buttons-container">
                                <div className="buttons buttons-add-cancel add" onClick={ (()=>{ currentProductAdded( currentProductSelectionState, inputAmountState, inputPriceState ) }) } > W </div>
                                <div className="buttons buttons-add-cancel cancel" onClick={ (()=>{ resetProductSelection() }) }> X </div>
                            </td>
                        </tr> 
                        : 
                        <tr>
                            <td className="td-photo-container"></td>
                            <td className="td-product-container"></td>
                            <td className="td-amount-container"></td>
                            <td className="td-price-container"></td>
                            <td className="td-buttons-container">
                                <div className="buttons buttons-add-cancel add" ></div>
                                <div className="buttons buttons-add-cancel cancel" ></div>
                            </td>
                        </tr> 
                        }

                        { Array.isArray(receiveProductState) && receiveProductState.map(( { id, product_name, product_photo, product_amount, product_price, result, crossed_out }, index ) => (
                                <tr key={id} className={crossed_out} onClick={ ((event) => clickProductName( index, event, id, crossed_out, product_name, product_photo, product_amount, product_price, result )) } >
                                    <td className="td-photo-container">
                                        <img className="photo-img" src={product_photo} />
                                    </td>
                                    <td className="td-product-container">{product_name}</td>

                                    <td className="td-amount-container">
                                       { indexProduct == index ? (
                                        <input className="product-amount-input" type="number" name="product_amount" value={inputAmountStateEdit} onChange={ functionValueAmountStateEdit } />) 
                                        : product_amount } 
                                    </td>
                                   
                                    <td className="td-price-container">
                                       { indexProduct == index ? (
                                        <input className="product-price-input" type="number" name="product_price" value={inputPriceStateEdit} onChange={ functionValuePriceStateEdit } />) 
                                        : product_price } 
                                    </td>

                                    <td className="td-total-container">
                                        { indexProduct === index ? (
                                            <>
                                                <div id='button-update' className="buttons buttons-add-cancel add" onClick={ (event) => updateProduct( index, id, product_name, product_photo, inputAmountStateEdit, inputPriceStateEdit, crossed_out ) } > W </div>
                                                <div id='button-reset' className="buttons buttons-add-cancel cancel" onClick={ () => resetProductSelection() } > X </div>
                                            </>
                                        ) : (
                                            <>
                                                <div className="resul-product">{result}</div>
                                                <div className="buttons button-edit edit" title="Editar" > & </div>
                                            </>
                                        ) }
                                        
                                    </td>                                         
                                </tr>
                                ))
                        }
                    </tbody>
                </table>
                        {
                            receiveProductState && 
                                <div className="row-total-value">
                                    <div className="total-value" >{ total.reduce( ( acc, currentValue ) => acc + currentValue, 0 ) }</div>
                                </div>
                        }
            </div>
    );
}

export {
    AddProductToList,
    receiveProduct,
    uploadProductsAfterDeleting,
};