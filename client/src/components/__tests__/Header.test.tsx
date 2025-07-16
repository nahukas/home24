import {screen} from '@testing-library/react';

import { renderWithProviders } from '../../test/utils/renderWithProviders';
import Header from '../Header';

jest.mock('../../assets/logo.svg', () => 'mocked-logo.svg');

describe('Header', () => {
  test('renders header with logo, search input, and cart', () => {
    renderWithProviders(<Header />);

    expect(screen.getByAltText('Logo')).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText('Wonach suchst du?')
    ).toBeInTheDocument();
    expect(screen.getByText('0')).toBeInTheDocument();
  });
});
