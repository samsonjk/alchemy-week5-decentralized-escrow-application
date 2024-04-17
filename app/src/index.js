import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.css';
// Put any other imports below so that CSS from your
// components takes precedence over default styles.

const root = ReactDOM.createRoot(document.getElementById('root'));

if (!window.ethereum) {
  root.render(
    <React.StrictMode>
      You need to install a browser wallet to build the escrow dapp
    </React.StrictMode>
  );
} else {
  root.render(
    <React.StrictMode>

      <nav class="navbar navbar-dark bg-dark">
        <a class="navbar-brand" href="#">
          <img src="app/assets/images/logo.jpg" width="30" height="30" class="d-inline-block align-top" alt="" />
          Decentralized Escrow Application
        </a>
      </nav>
      <App />
    </React.StrictMode>
  );
}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
