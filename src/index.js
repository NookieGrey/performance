import React from 'react';
import Routes from "./routes/Routes";
import {createRoot} from 'react-dom/client';
import {Home} from "./Home";

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Routes />
  </React.StrictMode>,
  document.getElementById('root')
);

