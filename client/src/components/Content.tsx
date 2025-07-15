import React from 'react';
import { Category } from '../types';
import { ArticleCard } from './ArticleCard';

interface ContentProps {
  categories: Category[];
  loading: boolean;
  error: string | null;
}

const Content: React.FC<ContentProps> = ({ categories, loading, error }) => {
  const renderArticles = () => {
    if (loading || error || !categories.length) return null;

    return categories.map((category) =>
      category.categoryArticles.articles.map((article) => (
        <ArticleCard
          key={`${article.name}-${article.variantName}`}
          article={article}
        />
      ))
    );
  };

  return (
    <main className='content'>
      {categories.length ? (
        <h1>
          {categories[0].name}
          <small> ({categories[0].articleCount})</small>
        </h1>
      ) : (
        <h1>Loading...</h1>
      )}
      <div className='articles'>{renderArticles()}</div>
    </main>
  );
};

export default Content;
