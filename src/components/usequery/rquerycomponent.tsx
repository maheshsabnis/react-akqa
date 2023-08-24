import React from 'react'
import { ProductHttpService } from '../../service/producthttpservice'
import { useQuery, useMutation } from 'react-query'
import { ProductInfo } from '../../models/productinfo'
const RQueryComponent = () => {
  const serv  =new ProductHttpService();
  const getProducts=async()=>{
    const products = await serv.getProducts();
    return products;
  }

  // use the useQuery Hook
 // data: the data taht will be received
 // error: any error that occures
 // isError: If the error occureed
 // isLoading: State of execution
  const {data,error,isError,isLoading}  = useQuery<ProductInfo[],Error>('products',getProducts);

  if(isLoading){
    return (<div className='container'>
        <strong>Data is yet Load</strong>
    </div>)
  }
  if(isError) {
    return (<div className='container'>
    <strong>Error Occurred : {error.message}</strong>
</div>)
  }


  return (
    <div className='container'>
       {
          JSON.stringify(data as ProductInfo[])
       }
       <hr/>
       
    </div>
  )
}

export default RQueryComponent
