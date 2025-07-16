import { render, screen } from '@testing-library/react';
import { ArticleCard } from '../ArticleCard';
import { Article } from '../../types';
import { ThemeProvider } from '@emotion/react';
import { theme } from '../../styles/theme';
import { CartProvider } from '../../context/cartContext';

describe('ArticleCard', () => {
  const mockArticle: Article = {
    name: 'Test Product',
    variantName: 'Test Variant',
    prices: {
      currency: 'EUR',
      regular: {
        value: 9999 // 99.99 EUR
      }
    },
    images: [
      {
        path: 'https://example.com/image.jpg'
      }
    ]
  };

  it('renders article details correctly', () => {
    render(
      <ThemeProvider theme={theme}>
        <CartProvider>
          <ArticleCard article={mockArticle} />
        </CartProvider>
      </ThemeProvider>
    );
    expect(screen.getByText('Test Product')).toBeInTheDocument();
    expect(screen.getByText('99,99 €')).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /in den warenkorb/i })
    ).toBeInTheDocument();
    expect(screen.getByRole('img', { name: 'Test Product' })).toHaveAttribute(
      'src',
      'https://example.com/image.jpg'
    );
  });

  it('formats price correctly', () => {
    render(
      <ThemeProvider theme={theme}>
        <CartProvider>
          <ArticleCard article={mockArticle} />
        </CartProvider>
      </ThemeProvider>
    );
    expect(screen.getByText('99,99 €')).toBeInTheDocument();
  });
});
