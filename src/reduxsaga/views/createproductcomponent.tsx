import React from 'react'
import {useDispatch} from 'react-redux';
import { addProduct } from '../actions/actions';
import { ProductInfo } from '../../models/productinfo'
import { Dispatch } from 'redux';

const CreateProductComponent = () => {

    const product:ProductInfo = new ProductInfo(
        0,
        'Prod-2003',
        'Biscuts',
        'Food',
        'Parle',
        'Energy',
        160
    );

    // import useDispatch() to dispatch action
     const dispatch:Dispatch<any> = useDispatch();   

    const addClick=()=>{
        // dispatch the action
        dispatch(addProduct(product));
    };

  return (
    <div className='container'>
         <button onClick={addClick} className='btn btn-warning'>Create New Product</button>
    </div>
  )
}

export default CreateProductComponent
