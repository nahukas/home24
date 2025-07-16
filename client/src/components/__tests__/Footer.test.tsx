import { screen } from '@testing-library/react';
import Footer from '../Footer';
import { renderWithProviders } from '../../test/utils/renderWithProviders';

describe('Footer', () => {
  it('renders footer text', () => {
    renderWithProviders(<Footer />);

    expect(screen.getByText(/Alle Preise sind in Euro/i)).toBeInTheDocument();
  });
});
