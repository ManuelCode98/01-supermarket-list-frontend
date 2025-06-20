import { useState } from "react";
import './add-product-to-list.css';
import { loadProductsWhenReloading } from "./service/load-products-when-reloading";
import { useEffect } from "react";
import { totalCostOfAllProducts } from "./helpers/total-cost-of-all-products";
import { clickProductName } from "./helpers/click-product-name";
import Thead from "./components/Thead";
import ProductPhoto from "./components/ProductPhoto";
import ProductName from "./components/ProductName";
import EmptyTable from "./components/EmptyTable";
import ButtonAdd from "./components/ButtonAdd";
import handleProductEdit from "./helpers/handleProductEdit";
import resetProductSelection from "./helpers/resetProductSelection";
import updateProductList from './service/updateProductToList';


let setCurrentProductSelection;
let uploadProductsAfterDeleting;

let setInputAmountStateExport;
let setInputPriceStateExport;
let setProductPhotoOtherTemporaryExport;
let setInputProductNameStateExport


const receiveProduct = ( { id , product_name, product_photo, product_amount, product_price } )=>{   

    id && setCurrentProductSelection( { id, product_name, product_photo, product_amount, product_price } );
};

const AddProductToList = ( { urlConnectionBackend } )=>{

    const [ currentProductSelectionState, setCurrentProductSelectionState ] = useState({});

    const [ buttonCancelState, setButtonCancelState ] = useState( 'X' );
    const [ productPhotoOtherState ,setProductPhotoOtherState ]=useState({});
    const [ inputProductNameState, setInputProductNameState ] = useState('')
    const [ inputAmountState, setInputAmountState ] = useState( 1 );
    const [ inputPriceState, setInputPriceState ] = useState( 1 );
    const [ inputAmountStateEdit, setInputAmountStateEdit ] = useState( 1 );
    const [ inputPriceStateEdit, setInputPriceStateEdit ] = useState( 1 );
    
    const [ receiveProductState, setReceiveProductState ] = useState( [] );
    
    const [ resulTotalState, setResulTotalState ] = useState([]);

    const [ editOrNotEdit, setEditOrNotEdit ] = useState('not-edit');
    const [ indexProduct, setIndexProduct ] = useState( null );
    const [ productToEdit, setProductToEdit ] = useState({}); 
    const [ currentPhotoOtherTemporary, setCurrentPhotoOtherTemporary ] = useState('')

    // Variables hechas para vigilar el cambio de estado de un componente fuera del componente padre
    setCurrentProductSelection = setCurrentProductSelectionState;
    uploadProductsAfterDeleting = setReceiveProductState;

    // Variables para exportar estados para recetear los campos a la hora de agregar un producto
    setInputAmountStateExport = setInputAmountState;
    setInputPriceStateExport = setInputPriceState;
    setProductPhotoOtherTemporaryExport = setCurrentPhotoOtherTemporary
    setInputProductNameStateExport = setInputProductNameState  


    useEffect(()=>{

        if( receiveProductState.length === 0 ){

            const getAllProducts = async( )=>{

                const products = await loadProductsWhenReloading(  )
                if( products ){

                    setReceiveProductState( products.map( product =>(
                    { ...product, 
                         product_amount: product.product_amount ,
                         product_price: product.product_price ,
                         result: product.result 
                    }
                )))
                }

            }
            getAllProducts()    
        };
    }, [ ])
    
    useEffect(() => {

        setResulTotalState( totalCostOfAllProducts( receiveProductState ) );
                                        
    }, [receiveProductState]);
    

    const { id, product_name, product_photo } = currentProductSelectionState;

    const updateProduct = async( index, id, product_name, product_photo, product_amount, product_price, crossed_out ) => {

        
        if( indexProduct === index ){

            const result = product_amount * product_price;

            const product = {
                id,
                product_name,
                product_photo,
                product_amount: [ 0, product_amount],
                product_price: [ 0, product_price],
                crossed_out,
                result: [ 0, result]
            };

            setIndexProduct( null );
            setEditOrNotEdit('not-edit');

            setReceiveProductState( receiveProductState.map( item => 

                item.id === id ? { ...item, 
                    product_amount: product.product_amount, 
                    product_price: product.product_price, 
                    result: product.result } 
                : item
            ))  

            updateProductList( product, setReceiveProductState, receiveProductState )
        }
    };

    const onChangeProductPhoto = ( { target } )=>{

        const productPhotoOther = target.files[0];
        const temporaryUrl = URL.createObjectURL( productPhotoOther )
        setCurrentPhotoOtherTemporary( temporaryUrl )
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


    return (
            <div className="container-products">
                <table className="container-table" >
                    <Thead/>
                    <tbody>
                       { currentProductSelectionState.id !== undefined ? 
                       <tr>
                            <td className="td-photo-container">
                                <ProductPhoto data = { [ product_name, onChangeProductPhoto, product_photo, currentPhotoOtherTemporary ] } />
                            </td>
                            <td className="td-product-container">
                                <ProductName 
                                    data = { [ product_name, inputProductNameState, functionValueProductNameState ] } 
                                /> 
                            </td>
                            <td className="td-amount-container">
                                <input className="product-amount-input" type="number" value={ inputAmountState } onChange={ functionValueAmountState } />
                            </td>
                            <td className="td-price-container">
                                <input className="product-price-input" type="number" value={ inputPriceState } onChange={ functionValuePriceState} />
                            </td>
                            <td className="td-buttons-container">
                                <ButtonAdd 
                                    data = { [ currentProductSelectionState, inputAmountState, inputPriceState, receiveProductState, setReceiveProductState, inputProductNameState, productPhotoOtherState ] } 
                                    />
                                <div className="buttons buttons-add-cancel cancel" onClick={ ()=> 
                                    resetProductSelection( setEditOrNotEdit, setIndexProduct, setInputAmountState, setInputPriceState )
                                    }> 
                                    {buttonCancelState} 
                                </div>
                            </td>
                        </tr> 
                        : 
                        <tr>
                            <EmptyTable/>
                        </tr> 
                        }

                        { Array.isArray(receiveProductState) && receiveProductState.map(({ id, product_name, product_photo, product_amount, product_price, result, crossed_out }, index ) => (
                                <tr key={id} className={crossed_out} onClick={ ( event ) => {
                                    clickProductName( event, id, product_name, product_photo, product_amount, product_price, result, receiveProductState, setReceiveProductState, editOrNotEdit, setEditOrNotEdit ) 
                                    handleProductEdit( event, editOrNotEdit, setIndexProduct, index, setProductToEdit, receiveProductState, setInputAmountStateEdit, product_amount, setInputPriceStateEdit, product_price, setEditOrNotEdit )
                                    }} >
                                    <td className="td-photo-container">
                                        <img className="photo-img" src={product_photo} />
                                    </td>
                                    <td className="td-product-container">{product_name}</td>

                                    <td className="td-amount-container">
                                       { indexProduct === index && crossed_out === 'not-crossed-out' ? (
                                        <input className="product-amount-input" type="number" name="product_amount" value={inputAmountStateEdit} onChange={ functionValueAmountStateEdit } />) 
                                            : crossed_out === 'not-crossed-out' 
                                                ? product_amount[1]
                                                : product_amount[0]
                                        } 
                                    </td>
                                   
                                    <td className="td-price-container">
                                       { indexProduct === index && crossed_out === 'not-crossed-out' ? (
                                        <input className="product-price-input" type="number" name="product_price" value={inputPriceStateEdit} onChange={ functionValuePriceStateEdit } />) 
                                            : crossed_out === 'not-crossed-out' 
                                                ? product_price[1]
                                                : product_price[0] 
                                        } 
                                    </td>

                                    <td className="td-total-container">
                                        { indexProduct === index && crossed_out === 'not-crossed-out' ? (
                                            <>
                                                <div id='button-update' className="buttons buttons-add-cancel add" onClick={ () => updateProduct( index, id, product_name, product_photo, inputAmountStateEdit, inputPriceStateEdit, crossed_out ) } > W </div>
                                                <div id='button-reset' className="buttons buttons-add-cancel cancel" onClick={ () => 
                                                    resetProductSelection( setEditOrNotEdit, setIndexProduct, setInputAmountState, setInputPriceState ) 
                                                    } > X 
                                                </div>
                                            </>
                                        ) : (
                                            <>
                                                <div className="resul-product">
                                                    { crossed_out === 'not-crossed-out'
                                                        ? result[1]
                                                        : result[0]
                                                     }
                                                </div>
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
                                    <div className="total-value" >{ resulTotalState.reduce( ( acc, currentValue ) => acc + currentValue, 0 ).toLocaleString() }</div>
                                </div>
                        }
            </div>
    );
}

export {
    AddProductToList,
    receiveProduct,
    uploadProductsAfterDeleting,
    setCurrentProductSelection,
    setInputAmountStateExport,
    setInputPriceStateExport,
    setProductPhotoOtherTemporaryExport,
    setInputProductNameStateExport,
};