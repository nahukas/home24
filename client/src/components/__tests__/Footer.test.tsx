import { render, screen } from '@testing-library/react';
import Footer from '../Footer';
import { ThemeProvider } from '@emotion/react';
import { theme } from '../../styles/theme';

describe('Footer', () => {
  it('renders footer text', () => {
    render(
      <ThemeProvider theme={theme}>
        <Footer />
      </ThemeProvider>
    );
    expect(screen.getByText(/Alle Preise sind in Euro/i)).toBeInTheDocument();
  });
});
