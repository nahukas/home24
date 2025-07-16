import { fireEvent, render, screen } from '@testing-library/react';
import Header from '../Header';
import { ThemeProvider } from '@emotion/react';
import { theme } from '../../styles/theme';
import { CartProvider } from '../../context/cartContext';

jest.mock('../../assets/logo.svg', () => 'mocked-logo.svg');

describe('Header', () => {
  test('renders header with logo, search input, and cart', () => {
    render(
      <ThemeProvider theme={theme}>
        <CartProvider>
          <Header />
        </CartProvider>
      </ThemeProvider>
    );

    expect(screen.getByAltText('Logo')).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText('Wonach suchst du?')
    ).toBeInTheDocument();
    expect(screen.getByText('0')).toBeInTheDocument();
  });
});
