import React, { useCallback } from 'react'
import CreateProductComponent from './views/createproductcomponent'
import ProductsListComponent from './views/productslistcomponent'

// import the useDispatch() to dispatch action to fetch products data
// import the useSelector() to subscribe to the store so that data can be read from it
// the 'shallowEqual' to verify the state change so that
// changes can be notified to the subscriber
import {useDispatch,useSelector, shallowEqual} from 'react-redux';
import { ProductInfo } from '../models/productinfo';
import { IAppState } from './state/state';
import { Dispatch } from 'redux';
import { getProducts } from './actions/actions';

const MainReduxComponent = () => {
 // 1. sunscribe to the store
 const products:ProductInfo[] = useSelector(
    (state:IAppState)=>state.products,
    shallowEqual
 );
// 2. dispatch action
const dispatch:Dispatch<any> = useDispatch();

 // 3. use the useCallback() hook to dispatch action to get data
 // and accordingly pass it to the ProductsList component

 const getData = useCallback(
    (state:IAppState)=>dispatch(getProducts('initiing call')),
    [dispatch] // this will make sure that after the first dispatch, the update will be stopped
 );


  return (
    <div className='container'>
        <CreateProductComponent></CreateProductComponent>
        <hr/>
        {/* This will be passed data always from Parent and this 
        will be updated  for the change in store */}
        <ProductsListComponent
          products={products} getData={getData}
        ></ProductsListComponent>
    </div>
  )
}

export default MainReduxComponent;
