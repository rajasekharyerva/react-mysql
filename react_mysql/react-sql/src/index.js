import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
//import { Provider } from 'react-redux';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import './index.css';
//import thunk from 'redux-thunk';
//import { createStore, applyMiddleware, compose, combineReducers } from 'redux';

const app = (
    <BrowserRouter>
    <App />
    </BrowserRouter>
);

ReactDOM.render(app, document.getElementById('root'));
registerServiceWorker();
