import React, {useState} from 'react'
import { ProductInfo } from '../../models/productinfo';

import SelectComponent from '../reusablecomponents/selectcomponent';

import { DataContextEvent } from '../../datacontext';
import DataGridContextComponent from '../reusablecomponents/datagridcontextcompnent';

const ProductInfoComponent = () => {
  const [product, setProduct] = useState<ProductInfo>({
    ProductRowId:0,
    ProductId:'',
    ProductName:'',
    CategoryName:'',
    Manufacturer:'',
    Description:'',
    BasePrice:0,
    isDeletable: true

  });  
  const [products, setProducts] = useState<ProductInfo[]>([]);
  const [sorting, setSorting] = useState({active: false ,column: '', order:''});
  const [collection, setDataCollection] = useState<any[]>([]);

  const categories = ['Electronics', 'Electrical', 'Food', 'Fashion'];
  const manufacturers = ['MS-ECT', 'MS-ECL', 'MS-FOOD', 'MS-FASHION'];
  const clear=()=>{
    setProduct({
        ProductRowId:0,
        ProductId:'',
        ProductName:'',
        CategoryName:'',
        Manufacturer:'',
        Description:'',
        BasePrice:0,
        isDeletable: true
      });
  }
  const save=()=>{
    setProducts([...products, product]);
    // setDataCollection([...products, product]);
    // console.log(JSON.stringify(collection));

  }

  const deleteProduct = (product:ProductInfo) =>{
    let filteredList = products.filter((i)=>i.ProductId !== product.ProductId);
    setProducts(filteredList);
  }

  const sortProducts = (column:string, order:string) =>{
    //utility function to handle sorting logic
    let sortedArr;

    sortedArr = [...products].sort((a:any, b:any) => {
      let fa = a[column].toLowerCase(),
      fb = b[column].toLowerCase();

      if(order === 'ASC') {
        if (fa < fb) return -1;
        if (fa > fb) return 1;
      } else if(order === 'DESC'){
        if (fa < fb) return 1;
        if (fa > fb) return -1;
      }
      return 0;
    });

    return sortedArr;

  }

  const sortBy = (header: string) => {
  //HANDLES ASCENDING/DESCENDING SORTING AND TOGGLES SORTING ON/OFF ON ANY COLUMN
  //NPM START TO SEE THE BEAUTY

    let sortedProducts;
    if (!sorting.active) {
      //sort by ascending order
      sortedProducts = sortProducts(header, "ASC");
      setProducts(sortedProducts);
      setSorting({ active: true, column: header, order: "ASC" });
    } else if (sorting.active) {
      if (sorting.column === header) {
        // sorting already applied to the column clicked
        if (sorting.order === "ASC") {
          //toggle sort by to descending order
          sortedProducts = sortProducts(header, "DESC");
          setProducts(sortedProducts);
          //update sorting state
          setSorting({ active: true, column: header, order: "DESC" });
        } else {
          //remove sorting (back to default/ProductId)
          sortedProducts = sortProducts("ProductId", "ASC");
          setProducts(sortedProducts);
          //update sorting state
          setSorting({ active: false, column: "", order: "" });
        }
      } else {
        //sort by ascending order on new column
        sortedProducts = sortProducts(header, "ASC");
        setProducts(sortedProducts);
        //update sorting state
        setSorting({ active: true, column: header, order: "ASC" });
      }
    }
  };

  return (
    <div className='container'>
       <div className='form-group'>
          <label>Product Id</label>
          <input type='text' className='form-control'
          value={product.ProductId}
            onChange={(evt)=>setProduct({...product, ProductId:evt.target.value})}
            placeholder='Enter Product Id'/>
       </div>
       <div className='form-group'>
          <label>Product Name</label>
          <input type='text' className='form-control'
           value={product.ProductName}
           onChange={(evt)=>setProduct({...product, ProductName:evt.target.value})}
            placeholder='Enter Product Id'/>
       </div>
       <div className='form-group'>
          <label>Category Name</label>
          <SelectComponent
            dataSource={categories}
            selectedData={(value:string)=>setProduct({...product, CategoryName:value})}
            bindableProperty={product.CategoryName}
          ></SelectComponent>
          {/* <select className='form-control'
             value={product.CategoryName}
             onChange={(evt)=>setProduct({...product, CategoryName:evt.target.value})}
            title='catname'>
                <option>Select Category</option>
                {
                    categories.map((c,i)=>(
                        <option key={i} value={c}>{c}</option>
                    ))
                }
            </select> */}
       </div>
       <div className='form-group'>
          <label>Manufacturer Name</label>
          <SelectComponent
            dataSource={manufacturers}
            bindableProperty={product.Manufacturer}
            selectedData={(value:string)=>setProduct({...product, Manufacturer:value})}
          ></SelectComponent>
          {/* <select className='form-control'
           value={product.Manufacturer}
           onChange={(evt)=>setProduct({...product, Manufacturer:evt.target.value})}
             title='manuname'>

                <option>Select Manufacturer</option>
                {
                    manufacturers.map((m,i)=>(
                        <option key={i} value={m}>{m}</option>
                    ))
                }
             </select> */}
       </div>
       <div className='form-group'>
          <label>Description</label>
          <textarea  className='form-control'
           value={product.Description}
           onChange={(evt)=>setProduct({...product, Description:evt.target.value})}
            placeholder='Enter Product Id'></textarea>
       </div>
       <div className='form-group'>
          <label>Base Price</label>
          <input type='text' className='form-control'
           value={product.BasePrice}
           onChange={(evt)=>setProduct({...product, BasePrice:parseInt(evt.target.value)})}
            placeholder='Enter Price'/>
       </div>
       <div className='form-group'>
           <button className='btn btn-warning'
             onClick={clear}
           >New</button>
           <button className='btn btn-success'
             onClick={save}
           >Save</button>
       </div>
       <div className="form-group">
          <input
            className="form-check-input"
            type="checkbox"
            checked={product.isDeletable}
            onChange={(evt) =>
              setProduct({ ...product, isDeletable: evt.target.checked })
            }
            id="isDeletable"
          />
          <label className="form-check-label" htmlFor="isDeletable">
            Is Deletable?
          </label>
      </div>
       <hr/>
       {/* {
        JSON.stringify(products)
       } */}
       <DataContextEvent.Provider value={{products,setProduct,deleteProduct,sortBy,sorting}}>
          <DataGridContextComponent></DataGridContextComponent>
       </DataContextEvent.Provider>
    </div>
  )
}

export default ProductInfoComponent
