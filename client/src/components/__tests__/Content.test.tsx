import { screen } from '@testing-library/react';

import { renderWithProviders } from '../../test/utils/renderWithProviders';
import { Category } from '../../types';
import Content from '../Content';

const mockCategories: Category[] = [
  {
    name: 'Furniture',
    articleCount: 50,
    childrenCategories: { list: [] },
    categoryArticles: {
      articles: [
        {
          name: 'Test Product',
          variantName: 'Test Variant',
          prices: { currency: 'EUR', regular: { value: 9999 } },
          images: [{ path: 'https://example.com/image.jpg' }]
        }
      ]
    }
  }
];

describe('Content', () => {
  it('renders loading state', () => {
    renderWithProviders(
      <Content categories={[]} loading={true} error={null} />
    );

    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('renders error state', () => {
    renderWithProviders(
      <Content categories={[]} loading={false} error='Failed to load' />
    );
    expect(screen.getByText('Error: Failed to load')).toBeInTheDocument();
  });

  it('renders articles from categories', () => {
    renderWithProviders(
      <Content categories={mockCategories} loading={false} error={null} />
    );

    expect(screen.getByText('Test Product')).toBeInTheDocument();
    expect(screen.getByText('99,99 €')).toBeInTheDocument();
  });

  it('renders empty state when no articles', () => {
    renderWithProviders(
      <Content
        categories={[
          { ...mockCategories[0], categoryArticles: { articles: [] } }
        ]}
        loading={false}
        error={null}
      />
    );

    expect(
      screen.getByRole('heading', { name: /Furniture.*\(50\)/ })
    ).toBeInTheDocument();
    expect(screen.queryByText('Test Product')).not.toBeInTheDocument();
  });
});
