import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import Wrapper from './utils/wrapper';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <Wrapper>
    <App />
    </Wrapper>
    
  </React.StrictMode>
);


reportWebVitals();
