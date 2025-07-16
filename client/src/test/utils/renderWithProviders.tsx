import { ThemeProvider } from '@emotion/react';
import { render, RenderOptions } from '@testing-library/react';
import React, { ReactElement } from 'react';

import { CartProvider } from '../../context/cartContext';
import { theme } from '../../styles/theme';

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
