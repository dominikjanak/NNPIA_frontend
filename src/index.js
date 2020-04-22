import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import Authentication from "./components/authentication/authentication";

ReactDOM.render(
  <React.StrictMode>
      <Authentication />
  </React.StrictMode>,
  document.getElementById('root')
);

serviceWorker.unregister();
