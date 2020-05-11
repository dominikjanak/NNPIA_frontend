import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import MainRouter from "./components/mainRouter";

ReactDOM.render(
  <React.StrictMode>
      <MainRouter />
  </React.StrictMode>,
  document.getElementById('root')
);

serviceWorker.unregister();
