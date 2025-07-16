import { screen } from '@testing-library/react';

import { renderWithProviders } from '../../test/utils/renderWithProviders';
import { Category } from '../../types';
import Sidebar from '../Sidebar';

const mockCategories: Category[] = [
  {
    name: 'Furniture',
    articleCount: 50,
    childrenCategories: {
      list: [
        { name: 'Chairs', urlPath: 'chairs' },
        { name: 'Tables', urlPath: 'tables' }
      ]
    },
    categoryArticles: { articles: [] }
  }
];

describe('Sidebar', () => {
  it('renders loading state', () => {
    renderWithProviders(
      <Sidebar categories={[]} loading={true} error={null} />
    );

    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('renders error state', () => {
    renderWithProviders(
      <Sidebar categories={[]} loading={false} error='Failed to fetch' />
    );

    expect(screen.getByText('Error: Failed to fetch')).toBeInTheDocument();
  });

  it('renders no categories found when categories are empty', () => {
    renderWithProviders(
      <Sidebar categories={[]} loading={false} error={null} />
    );

    expect(screen.getByText('No categories found')).toBeInTheDocument();
  });

  it('renders category links when categories are provided', () => {
    renderWithProviders(
      <Sidebar categories={mockCategories} loading={false} error={null} />
    );

    expect(screen.getByText('Kategorien')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Chairs' })).toHaveAttribute(
      'href',
      '/chairs'
    );
    expect(screen.getByRole('link', { name: 'Tables' })).toHaveAttribute(
      'href',
      '/tables'
    );
  });
});
