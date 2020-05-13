import React from 'react';
import ReactDOM from 'react-dom';
import './styles/index.css';
import "./styles/toggle.css"
import * as serviceWorker from './serviceWorker';
import MainRouter from "./components/MainRouter";

ReactDOM.render(
  <React.StrictMode>
      <MainRouter />
  </React.StrictMode>,
  document.getElementById('root')
);

serviceWorker.unregister();
