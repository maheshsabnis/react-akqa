import { ProductInfo } from "../../models/productinfo";

// State Schema
export interface IAppState {
     product:ProductInfo,
     products:Array<ProductInfo>,
     message:string
}