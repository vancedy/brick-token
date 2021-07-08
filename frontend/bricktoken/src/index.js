import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { StoreProvider } from './scripts/store';
import { ThemeProvider } from 'theme-ui'
import theme from './theme'


ReactDOM.render(


<React.StrictMode>

<ThemeProvider theme={theme}>
    <StoreProvider>
    <App />
    </StoreProvider>    
    </ThemeProvider>
  </React.StrictMode>

,
  document.getElementById('root')
);
