import { createContext } from "react";
import { ProductInfo } from "./models/productinfo";

export const DataContext = createContext({});
// The Object with empty data
// define the createContext with the
// typed schema so that components will be able to set its behavior accordingly


// define an interface that will set the 
// type restrictions fopr the data that will be used used by 
// createContext
// x: this will be a property Name whuich is always string
// the 'any' is the datatypes definition for property 
type DataContextTypedInterface = {
    [x:string]:any,
    products:Array<any>,
    // a callback that will be dispatched on child to
    // emit data to parent
    setProduct:React.Dispatch<React.SetStateAction<ProductInfo>> | null
}

// the context is restricted to have properties defined by interface
export const DataContextEvent = createContext<DataContextTypedInterface>({
    products:[],
    setProduct :null
});

 