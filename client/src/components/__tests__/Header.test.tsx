import { render, screen } from '@testing-library/react';
import Header from '../Header';

describe('Header', () => {
  it('renders home24 branding and search input', () => {
    render(<Header />);
    expect(screen.getByText('home24')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Search')).toBeInTheDocument();
    expect(
      screen.getByRole('textbox', { name: /search products/i })
    ).toBeInTheDocument();
  });
});
