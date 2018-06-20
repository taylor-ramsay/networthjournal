import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import {Router, Route} from 'react-router';
import { HashRouter } from 'react-router-dom'


ReactDOM.render(<HashRouter><Route path="/" component={App} /></HashRouter>, document.getElementById('root'));
registerServiceWorker();
