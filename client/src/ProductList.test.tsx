import { render, screen, waitFor } from '@testing-library/react';
import ProductList from './ProductList';
import { Category } from './types';

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
    render(<ProductList />);
    await waitFor(() =>
      expect(screen.getByText(/home24/i)).toBeInTheDocument()
    );
  });

  it('renders loading state initially', async () => {
    render(<ProductList />);
    await waitFor(() =>
      expect(
        screen.getByRole('heading', { name: 'Loading...' })
      ).toBeInTheDocument()
    );
  });

  it('renders categories after fetch', async () => {
    render(<ProductList />);
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

    render(<ProductList />);
    await waitFor(() =>
      expect(
        screen.getByText('Error: Failed to fetch products')
      ).toBeInTheDocument()
    );
  });

  it('renders no categories state when categories are empty', async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => ({ data: { categories: [] } })
    });

    render(<ProductList />);
    await waitFor(() =>
      expect(screen.getByText('No categories found')).toBeInTheDocument()
    );
  });
});
