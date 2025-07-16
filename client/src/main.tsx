import './index.css';

import { ThemeProvider } from '@emotion/react';
import React from 'react';
import ReactDOM from 'react-dom/client';

import { CartProvider } from './context/cartContext';
import ProductList from './ProductList';
import { theme } from './styles/theme';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CartProvider>
        <ProductList />
      </CartProvider>
    </ThemeProvider>
  </React.StrictMode>
);
