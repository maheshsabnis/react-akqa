import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import './../node_modules/bootstrap/dist/css/bootstrap.min.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import ProductInfoComponent from './components/productcomponent/productinfocomponent';
import ProductStateUpdatorComponent from './components/cusomhooks/reducerhookcustom';
// 17+ 
// the createRoot()
// Inform the renderer that 
// the 'HTMLElemennt' is root 
// that is used for mounting
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <ProductStateUpdatorComponent></ProductStateUpdatorComponent>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
