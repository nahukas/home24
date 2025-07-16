import { fireEvent, render, screen } from '@testing-library/react';
import Header from '../Header';
import { ThemeProvider } from '@emotion/react';
import { theme } from '../../styles/theme';

jest.mock('../../assets/logo.svg', () => 'mocked-logo.svg');

describe('Header', () => {
  test('renders header with logo, search input, and cart', () => {
    render(
      <ThemeProvider theme={theme}>
        <Header />
      </ThemeProvider>
    );

    expect(screen.getByAltText('Logo')).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText('Wonach suchst du?')
    ).toBeInTheDocument();
    expect(screen.getByText('Warenkorb')).toBeInTheDocument();
    expect(screen.getByText('1')).toBeInTheDocument();
  });
});
