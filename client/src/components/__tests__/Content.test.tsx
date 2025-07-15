import { render, screen } from '@testing-library/react';
import Content from '../Content';
import { Category } from '../../types';

describe('Content', () => {
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

  it('renders loading state', () => {
    render(<Content categories={[]} loading={true} error={null} />);
    expect(
      screen.getByRole('heading', { name: 'Loading...' })
    ).toBeInTheDocument();
  });

  it('renders error state', () => {
    render(
      <Content
        categories={[]}
        loading={false}
        error='Failed to fetch products'
      />
    );
    expect(
      screen.getByRole('heading', { name: 'Loading...' })
    ).toBeInTheDocument();
  });

  it('renders articles from categories', () => {
    render(
      <Content categories={mockCategories} loading={false} error={null} />
    );
    expect(screen.getByText('Test Product')).toBeInTheDocument();
    expect(screen.getByText('99,99 €')).toBeInTheDocument();
  });

  it('renders empty state when no articles', () => {
    render(
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
