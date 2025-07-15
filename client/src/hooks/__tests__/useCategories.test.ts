import { renderHook, waitFor, act } from '@testing-library/react';
import useCategories from '../useCategories';
import { Category } from '../../types';

describe('useCategories', () => {
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
    const { result } = renderHook(() => useCategories());
    expect(result.current.loading).toBe(true);
    expect(result.current.error).toBe(null);
    expect(result.current.categories).toEqual([]);
  });

  it('fetches and sets categories on success', async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => ({ data: { categories: mockCategories } })
    });

    const { result } = renderHook(() => useCategories());
    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(global.fetch).toHaveBeenCalledWith('/graphql', expect.any(Object));
    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBe(null);
    expect(result.current.categories).toEqual(mockCategories);
  });

  it('handles fetch error', async () => {
    const fetchPromise = Promise.resolve({
      ok: false,
      status: 500
    });

    (global.fetch as jest.Mock).mockImplementationOnce(() => fetchPromise);

    const { result } = renderHook(() => useCategories());

    await act(async () => {
      try {
        await fetchPromise;
      } catch {}
    });

    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBe('Failed to fetch products');
    expect(result.current.categories).toEqual([]);
  });

  it('handles empty categories response', async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => ({ data: { categories: [] } })
    });

    const { result } = renderHook(() => useCategories());
    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBe(null);
    expect(result.current.categories).toEqual([]);
  });

  it('handles network error', async () => {
    const fetchPromise = Promise.reject(new Error('Network error'));

    (global.fetch as jest.Mock).mockImplementationOnce(() => fetchPromise);

    const { result } = renderHook(() => useCategories());

    await act(async () => {
      try {
        await fetchPromise;
      } catch {}
    });

    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBe('Failed to fetch products');
    expect(result.current.categories).toEqual([]);
  });
});
