import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './pages/demo/Life.js';
import Admin from './admin';
import Router from './router';

import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<Router />, document.getElementById('root'));
registerServiceWorker();
