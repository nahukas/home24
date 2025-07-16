import { render, screen, waitFor, within } from '@testing-library/react';
import ProductList from './ProductList';
import { Category } from './types';
import { ThemeProvider } from '@emotion/react';
import { theme } from './styles/theme';
import { CartProvider } from './context/cartContext';

jest.mock('./assets/logo.svg', () => 'mocked-logo.svg');

describe('ProductList', () => {
  const mockCategories: Category[] = [
    {
      name: 'Furniture',
      articleCount: 50,
      childrenCategories: { list: [{ name: 'Chairs', urlPath: 'chairs' }] },
      categoryArticles: { articles: [] }
    }
  ];

  beforeEach(() => {
    jest.clearAllMocks();

    (global.fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: async () => ({ data: { categories: mockCategories } })
    });
  });

  it('renders the ProductList with home24 branding', async () => {
    render(
      <ThemeProvider theme={theme}>
        <CartProvider>
          <ProductList />
        </CartProvider>
      </ThemeProvider>
    );
    await waitFor(() =>
      expect(screen.getByAltText('Logo')).toBeInTheDocument()
    );
  });

  it('renders loading state initially', async () => {
    (global.fetch as jest.Mock).mockImplementationOnce(
      () =>
        new Promise((resolve) =>
          setTimeout(
            () =>
              resolve({
                ok: true,
                json: async () => ({ data: { categories: mockCategories } })
              }),
            500
          )
        )
    );

    render(
      <ThemeProvider theme={theme}>
        <CartProvider>
          <ProductList />
        </CartProvider>
      </ThemeProvider>
    );

    const aside = screen.getByRole('complementary');
    await waitFor(() =>
      expect(within(aside).getByText('Loading...')).toBeInTheDocument()
    );
  });

  it('renders categories after fetch', async () => {
    render(
      <ThemeProvider theme={theme}>
        <CartProvider>
          <ProductList />
        </CartProvider>
      </ThemeProvider>
    );
    await waitFor(() =>
      expect(
        screen.getByRole('heading', { name: /Furniture.*\(50\)/ })
      ).toBeInTheDocument()
    );
    expect(screen.getByText('Chairs')).toBeInTheDocument();
  });

  it('renders error state when fetch fails', async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
      status: 500
    });

    render(
      <ThemeProvider theme={theme}>
        <CartProvider>
          <ProductList />
        </CartProvider>
      </ThemeProvider>
    );
    await waitFor(() => {
      const aside = screen.getByRole('complementary');
      expect(
        within(aside).getByText('Error: Failed to fetch products')
      ).toBeInTheDocument();
    });
  });

  it('renders no categories state when categories are empty', async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => ({ data: { categories: [] } })
    });

    render(
      <ThemeProvider theme={theme}>
        <CartProvider>
          <ProductList />
        </CartProvider>
      </ThemeProvider>
    );
    await waitFor(() =>
      expect(screen.getByText('No categories found')).toBeInTheDocument()
    );
  });
});
