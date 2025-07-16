import React from 'react';
import ReactDOM from 'react-dom/client';
import ProductList from './ProductList';

import './index.css';
import { ThemeProvider } from '@emotion/react';
import { theme } from './styles/theme';
import { CartProvider } from './context/cartContext';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CartProvider>
        <ProductList />
      </CartProvider>
    </ThemeProvider>
  </React.StrictMode>
);
