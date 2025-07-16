import { render, screen } from '@testing-library/react';
import Content from '../Content';
import { Category } from '../../types';
import { ThemeProvider } from '@emotion/react';
import { theme } from '../../styles/theme';
import { CartProvider } from '../../context/cartContext';

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
    render(
      <ThemeProvider theme={theme}>
        <CartProvider>
          <Content categories={[]} loading={true} error={null} />
        </CartProvider>
      </ThemeProvider>
    );
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('renders error state', () => {
    render(
      <ThemeProvider theme={theme}>
        <CartProvider>
          <Content categories={[]} loading={false} error='Failed to load' />
        </CartProvider>
      </ThemeProvider>
    );
    expect(screen.getByText('Error: Failed to load')).toBeInTheDocument();
  });

  it('renders articles from categories', () => {
    render(
      <ThemeProvider theme={theme}>
        <CartProvider>
          <Content categories={mockCategories} loading={false} error={null} />
        </CartProvider>
      </ThemeProvider>
    );
    expect(screen.getByText('Test Product')).toBeInTheDocument();
    expect(screen.getByText('99,99 €')).toBeInTheDocument();
  });

  it('renders empty state when no articles', () => {
    render(
      <ThemeProvider theme={theme}>
        <CartProvider>
          <Content
            categories={[
              { ...mockCategories[0], categoryArticles: { articles: [] } }
            ]}
            loading={false}
            error={null}
          />
        </CartProvider>
      </ThemeProvider>
    );
    expect(
      screen.getByRole('heading', { name: /Furniture.*\(50\)/ })
    ).toBeInTheDocument();
    expect(screen.queryByText('Test Product')).not.toBeInTheDocument();
  });
});
