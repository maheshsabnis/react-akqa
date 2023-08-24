// import State Schema
import { IAppState } from "../state/state";
// createReducer from ToolKit
import { combineReducers, createReducer } from "@reduxjs/toolkit";
// the ProductInfo class
import { ProductInfo } from "../../models/productinfo";
// actions those are monitored
import {getProducts, getProductsSuccess, addProduct, addProductSuccess} from './../actions/actions';

// 1. define initial state
const initialState:IAppState = {
     product:new ProductInfo(0,'','','','','',0),
     products: new Array<ProductInfo>(),
     message:''
};

export const reducer = createReducer(initialState, (builder)=>{
    builder.addCase(getProducts,(state, action)=>{
        state.products = [];
    }).addCase(getProductsSuccess,(state,action)=>{
        state.products = action.payload.products;
    }).addCase(addProductSuccess,(state,action)=>{
        state.product = action.payload.product; // newly added record
        // mutate the prodiucts state using the newly created product  
        state.products = [...state.products, action.payload.product];
    });
});

/* Multiple Reducer FUnctions */

const reducerCart=(state:IAppState,action:any)=>{
    /* Logic */
    return {
        ...state
    }
}

const reducerUser=(state:IAppState,action:any)=>{
    switch(action.type){
        case 'GET_USERS':
                
    }
    /* Logic */
    return {
        ...state
    }
}

/* Combine Reducer */

const allReducers = combineReducers({
    cart:reducerCart,
    user:reducerUser
});

export default allReducers;













