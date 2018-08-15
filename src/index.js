import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './pages/demo/Life.js';
import Admin from './admin';
import Home from './pages/route_demo/router3/router';

import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<Home />, document.getElementById('root'));
registerServiceWorker();
