import React, {Fragment, useEffect, useReducer, useState} from 'react';
import axios from 'axios';

import { DataContext } from '../../datacontext';

import DataGridComponent from '../reusablecomponents/datagridcontextcomponent';

interface IAppState {
    data:[], // state that will be available to the comoponent
    loading:string, // state transition for initiating the Dispatch 
    error:string // if any error occur while the action is executed
}
// the state that will be updated
// based on actions and this will be notified to the
// component
const initialState = {
    loading:'', 
    error: '', 
    data: []  
};
// custom hook
// this will encaosulate the useReducer and this will also
// manage and async call to REST API
// the 'url' is external REST API that will provide data
const useStateUpdater=(url:string)=>{
    // use the useReducer that will
    // encapsulate  the Reducer that monitored the dispatched action and will as track the changes in initial State
    // extarnalData: The data aka payload
    // dispatch: the action that is dispatched
    // dispatch returns an object literal
    // with 2 properties
    // 1. The ACTION_TYPE_DISPATCHED
    // 2. The Payload, the data that will be mutated 
    // in the state  
    const [extarnalData, dispatch] = useReducer(reducer, initialState);
    //useEffect(()=>{ /* MOUNTING */ return()=>{/* UnMounting */}},[/*DEPENDECY PARAMETER*/]);

    // Dispatch actions based on Execution state 
    // inside the useEffect
  
    useEffect(()=>{
        dispatch({type: 'DATA_FETCH_STARTED'});
        // make call
        axios(url)
            .then((response)=>{
                // resolve the received promise object 
                return response.data;
            })
            .then((jsonData)=>{
                  // If Success
                  // The Custom Logic is here
                dispatch({
                    type: 'DATA_FETCH_SUCCESS',
                    payload: jsonData
                });
            })
            .catch((error)=>{
                // Else Failed
                // Custom Logic Here
                dispatch({
                    type:'DATA_FETCH_FAILED',
                    payload:error.message
                });    
            });
    },[]);
    // for the first load of Hook in COmponent
    // this will be the initialState
    // the useReducer() hook will update it
    // based on actions those are dispatched 
    // by the useEffect() based on AJAX call
    return extarnalData;

};

// define a reducer object
// state and action
const reducer=(state:IAppState, action:any)=>{
  // monitoring actions and accordingly updating the state
  switch(action.type){
    case 'DATA_FETCH_STARTED':
          return {...state, loading: 'Call is initiated', error:''};
    case 'DATA_FETCH_SUCCESS':
        return {
            ...state,
            loading: 'Call completed sucessfully',
            error:'',
            data:action.payload
        };
    case 'DATA_FETCH_FAILED':
        return {
            ...state,
            loading: 'Data fetched is failed', 
            error: action.payload
        };            
    default:
        return {...state};     
  }  
};

// create a component that will use the Custom Hook

const ProductStateUpdatorComponent=()=>{
    // use the custom hook 
    const receivedState = useStateUpdater('https://productapiserv.azurewebsites.net/api/ProductsAPI');

    
    return (
        <div className='container'>
            <strong>
                {receivedState.loading}
            </strong>
            <hr/>
            <strong>
                {receivedState.error}
            </strong>
            <hr/>
            <DataContext.Provider value={receivedState.data}>
              <DataGridComponent></DataGridComponent>    
            </DataContext.Provider>    
            {
                JSON.stringify(receivedState)
            }
        </div>
    );
};

export default ProductStateUpdatorComponent;
