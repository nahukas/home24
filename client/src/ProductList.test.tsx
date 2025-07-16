import { screen, waitFor, within } from '@testing-library/react';
import ProductList from './ProductList';
import { Category } from './types';
import { renderWithProviders } from './test/utils/renderWithProviders';

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
    renderWithProviders(<ProductList />);

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

    renderWithProviders(<ProductList />);

    const aside = screen.getByRole('complementary');
    await waitFor(() =>
      expect(within(aside).getByText('Loading...')).toBeInTheDocument()
    );
  });

  it('renders categories after fetch', async () => {
    renderWithProviders(<ProductList />);
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

    renderWithProviders(<ProductList />);

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

    renderWithProviders(<ProductList />);

    await waitFor(() =>
      expect(screen.getByText('No categories found')).toBeInTheDocument()
    );
  });
});
