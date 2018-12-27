import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import "../node_modules/video-react/dist/video-react.css"; // import css
import DHPlayer from './DHPlayer';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(<DHPlayer />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
