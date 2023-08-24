import React, { useState } from 'react'

// useMutation: Mutate the remote data
// Resiliency, retries to perform mutation
import { useMutation } from 'react-query'
import { ProductHttpService } from '../../service/producthttpservice'
import { ProductInfo } from '../../models/productinfo';


const UseMutationComponent = () => {
    const serv = new ProductHttpService();
    const [message, setMessage] = useState('');

    // use useMutation
    //p1: Async method that will request the Mutation Operations
    // p2: Retry 

    // mutate: the request that will be dispatched 
    // by the Component to mutate data using useMutation()
    // in short execute the 'saveProdfuct()' method
    const { 
      isLoading, isError,error,mutate

    } = useMutation(saveProduct, {retry:3});

    let product = new ProductInfo(0, 'Prod-9654', 'My Product', 'My Cateogry', 'MS','Test123', 11111);

    async function saveProduct(){
        const response = await serv.postProduct(product);
        setMessage(JSON.stringify(response));
    }

    if(isLoading){
        return (<div className='container'>
            <strong>Data is yet Load</strong>
        </div>)
      }
      if(isError) {
        return (<div className='container'>
              
    </div>)
      }

  return (
    <div className='container'>
        <h2> Use Mutation</h2>
        <button onClick={()=>{mutate()}} >Save</button>
        <hr/>
        <div>
            <strong>
                {
                    message
                }
            </strong>
        </div>
    </div>
  )
}

export default UseMutationComponent
