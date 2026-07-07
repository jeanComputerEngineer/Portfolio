import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { RequestLimitProvider } from './Utils/RequestLimitProvider';

const reportWebVitals = (onPerfEntry) => {
  if (onPerfEntry && onPerfEntry instanceof Function) {
    import('web-vitals').then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
      getCLS(onPerfEntry);
      getFID(onPerfEntry);
      getFCP(onPerfEntry);
      getLCP(onPerfEntry);
      getTTFB(onPerfEntry);
    });
  }
};

export default reportWebVitals;

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RequestLimitProvider>
      <App />
    </RequestLimitProvider>
    ,
  </React.StrictMode>,
);

reportWebVitals();
