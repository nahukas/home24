import { useEffect, useState } from 'react';

import { fetchCategories } from '../services/fetchCategories';
import { Category } from '../types';

const useProductData = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        const result = await fetchCategories();
        setCategories(result);
      } catch {
        setError('Failed to fetch products');
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  return { categories, loading, error };
};

export default useProductData;
