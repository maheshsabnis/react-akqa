import React, { useEffect } from 'react'
import { DataContext } from '../../datacontext';
import { ProductInfo } from '../../models/productinfo';
import DataGridComponent from '../../components/reusablecomponents/datagridcontextcomponent';

type dataProps = {
    getData:Function,
    products:Array<ProductInfo>
};


const ProductsListComponent = (props:dataProps) => {

    // in useEffect use the getData callback and mutate the 'products' only for changes
    
    useEffect(()=>{
        props.getData({...props.products})
    },[]);


  return (
    <div className='container'>
        <h3>List of Products</h3>
        <DataContext.Provider value={props.products}>
            <DataGridComponent></DataGridComponent>
        </DataContext.Provider>
    </div>
  )
}

export default ProductsListComponent
