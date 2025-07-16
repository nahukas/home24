import {screen } from '@testing-library/react';

import { renderWithProviders } from '../../test/utils/renderWithProviders';
import Footer from '../Footer';

describe('Footer', () => {
  it('renders footer text', () => {
    renderWithProviders(<Footer />);

    expect(screen.getByText(/Alle Preise sind in Euro/i)).toBeInTheDocument();
  });
});
