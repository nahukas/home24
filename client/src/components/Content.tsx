import styled from '@emotion/styled';
import React from 'react';
import {
  color,
  ColorProps,
  layout,
  LayoutProps,
  space,
  SpaceProps,
  typography,
  TypographyProps} from 'styled-system';

import { Category } from '../types';
import { ArticleCard } from './ArticleCard';

interface ContentProps {
  categories: Category[];
  loading: boolean;
  error: string | null;
}

const ContentContainer = styled.main<SpaceProps & LayoutProps & ColorProps>`
  ${space}
  ${layout}
  ${color}
  grid-area: content;
  grid-column: span 2;
  padding: ${({ theme }) => theme.space[2]}px;
`;

const ArticlesGrid = styled.div<SpaceProps & LayoutProps>`
  ${space}
  ${layout}
  display: grid;
  grid-gap: ${({ theme }) => theme.space[4]}px;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
`;

const CategoryTitle = styled.h1<TypographyProps>`
  ${typography}
  margin: 0;
  padding: ${({ theme }) => theme.space[2]}px 0;
  color: ${({ theme }) => theme.colors.text};
`;

const LoadingMessage = styled.div<TypographyProps>`
  ${typography}
  text-align: center;
  padding: ${({ theme }) => theme.space[3]}px;
`;

const ErrorMessage = styled.div<TypographyProps>`
  ${typography}
  color: ${({ theme }) => theme.colors.secondary};
  text-align: center;
  padding: ${({ theme }) => theme.space[3]}px;
`;

const Content: React.FC<ContentProps> = ({ categories, loading, error }) => {
  if (loading) return <LoadingMessage>Loading...</LoadingMessage>;
  if (error) return <ErrorMessage>Error: {error}</ErrorMessage>;

  return (
    <ContentContainer>
      {categories.length > 0 && (
        <CategoryTitle>
          {categories[0].name} <small>({categories[0].articleCount})</small>
        </CategoryTitle>
      )}
      <ArticlesGrid>
        {categories.flatMap((category) =>
          category.categoryArticles.articles.map((article) => (
            <ArticleCard
              key={`${article.name}-${article.variantName}`}
              article={article}
            />
          ))
        )}
      </ArticlesGrid>
    </ContentContainer>
  );
};

export default Content;
