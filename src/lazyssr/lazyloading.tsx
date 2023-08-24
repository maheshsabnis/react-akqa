import React, {Suspense} from 'react';

const ProductComponent = React.lazy(()=> import('./../components/productcomponent/productinfocomponent')); 

const LazyloadingComponent = () => {
  return (
    <div className='container'>
        <Suspense fallback={
            <div className='alert alert-danger'>
                <strong>
                    Waiting for the Component to Load
                </strong>
            </div>
        }>
            {/* Children */}
            <ProductComponent></ProductComponent>
        </Suspense>
    </div>
  )
}

export default LazyloadingComponent;
