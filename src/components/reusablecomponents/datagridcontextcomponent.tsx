import React, {useContext} from 'react'
import { DataContext } from './../../datacontext'

export default function DataGridComponent() {
  let dataSource = useContext(DataContext) as Array<object>;
 
 
  
  if(dataSource === undefined || dataSource === null || dataSource.length === 0){
    return (<div>The Object is undefined</div>);
  }
  if(Array.isArray(dataSource)){
    let columns =   Object.keys(dataSource[0]);
 
    return (
        <div className='container'>
            <table className='table table-bordered table-striped'>
              <thead>
                 <tr>
                   {
                    columns.map((col,idx)=>(
                        <th key={idx}>{col}</th>
                     ))
                   }
                 </tr>  
              </thead> 
              <tbody>
                 {
                    dataSource.map((record:object,i:number)=>(
                       <tr key={i}>
                         {
                            columns.map((col,idx)=>{
                               return <td key={idx}>
                                     {record[col as keyof typeof record]}
                                </td>
                             })
                         }
                       </tr>     
                    ))
                 }
              </tbody>
            </table>
        </div>
      )
  }
  return (
    <div className='container'>No Records</div>
  ); 
  
}
