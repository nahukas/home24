export type Category = {
  name: string;
  categoryArticles: CategoryArticle;
  articleCount: number;
  childrenCategories: ChildCategory;
};

export type Article = {
  name: string;
  variantName: string;
  prices: Prices;
  images: Image[];
};

export type ChildCategory = {
  list: Array<{
    name: string;
    urlPath: string;
  }>;
};

export type Prices = {
  currency: string;
  regular: {
    value: number;
  };
};

export type Image = {
  path: string;
};

export type CategoryArticle = {
  articles: Article[];
};

export interface Theme {
  colors: {
    primary: string;
    secondary: string;
    background: string;
  };
  space: number[];
  fontSizes: number[];
  breakpoints: string[];
}

export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}
