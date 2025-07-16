import React, { ReactElement } from 'react';
import { render, RenderOptions } from '@testing-library/react';
import { ThemeProvider } from '@emotion/react';
import { theme } from '../../styles/theme';
import { CartProvider } from '../../context/cartContext';

const AllProviders = ({ children }: { children: React.ReactNode }) => {
  return (
    <ThemeProvider theme={theme}>
      <CartProvider>{children}</CartProvider>
    </ThemeProvider>
  );
};

export const renderWithProviders = (
  ui: ReactElement,
  options?: RenderOptions
) => render(ui, { wrapper: AllProviders, ...options });
