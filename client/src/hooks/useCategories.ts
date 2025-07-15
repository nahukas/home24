import { useEffect, useState } from 'react';
import { Category } from '../types';

const useCategories = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('/graphql', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            query: `
              {
                categories: productLists(ids: "156126", locale: de_DE) {
                  name
                  articleCount
                  childrenCategories: childrenProductLists {
                    list {
                      name
                      urlPath
                    }
                  }
                  categoryArticles: articlesList(first: 50) {
                    articles {
                      name
                      variantName
                      prices {
                        currency
                        regular {
                          value
                        }
                      }
                      images(
                        format: WEBP
                        maxWidth: 200
                        maxHeight: 200
                        limit: 1
                      ) {
                        path
                      }
                    }
                  }
                }
              }
            `
          })
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const { data } = await response.json();
        setCategories(data.categories);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch products');
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  return { categories, loading, error };
};

export default useCategories;
