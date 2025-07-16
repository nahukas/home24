import GET_PRODUCT_CATEGORIES from '../graphql/queries/getProductCategories';

export const fetchCategories = async () => {
  const response = await fetch('/graphql', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ query: GET_PRODUCT_CATEGORIES })
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const { data } = await response.json();
  return data.categories;
};
