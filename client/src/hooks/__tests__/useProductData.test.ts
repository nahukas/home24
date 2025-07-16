import { renderHook, waitFor } from '@testing-library/react';

import { Category } from '../../types';
import useProductData from '../useProductData';

describe('useProductData', () => {
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
  });

  it('initializes with loading state', () => {
    (global.fetch as jest.Mock).mockImplementation(() => new Promise(() => {}));

    const { result } = renderHook(() => useProductData());

    expect(result.current).toEqual({
      categories: [],
      loading: true,
      error: null
    });
  });

  it('fetches and sets categories on success', async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => ({ data: { categories: mockCategories } })
    });

    const { result } = renderHook(() => useProductData());

    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(global.fetch).toHaveBeenCalledWith('/graphql', expect.any(Object));
    expect(result.current.error).toBeNull();
    expect(result.current.categories).toEqual(mockCategories);
  });

  it('handles HTTP error', async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
      status: 500
    });

    const { result } = renderHook(() => useProductData());

    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(result.current.error).toBe('Failed to fetch products');
    expect(result.current.categories).toEqual([]);
  });

  it('handles empty list', async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => ({ data: { categories: [] } })
    });

    const { result } = renderHook(() => useProductData());

    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(result.current.error).toBeNull();
    expect(result.current.categories).toEqual([]);
  });

  it('handles network error', async () => {
    (global.fetch as jest.Mock).mockRejectedValueOnce(
      new Error('Network error')
    );

    const { result } = renderHook(() => useProductData());

    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(result.current.error).toBe('Failed to fetch products');
    expect(result.current.categories).toEqual([]);
  });
});
