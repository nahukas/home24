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
  TypographyProps
} from 'styled-system';

import { useCart } from '../context/cartContext';
import { Article, CartItem } from '../types';

interface ArticleCardProps {
  article: Article;
}

const CardContainer = styled.div<SpaceProps & ColorProps & LayoutProps>`
  ${space}
  ${color}
  ${layout}
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 4px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  height: 100%;
`;

const CardImage = styled.img<SpaceProps & LayoutProps>`
  ${space}
  ${layout}
  width: 100%;
  height: auto;
  flex-shrink: 0;
`;

const CardContentWrapper = styled.div<SpaceProps>`
  ${space}
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: ${({ theme }) => theme.space[1]}px;
`;

const CardName = styled.div<TypographyProps>`
  ${typography}
  padding: ${({ theme }) => theme.space[1]}px 0;
  margin: ${({ theme }) => theme.space[1]}px 0;
  width: 100%;
  font-size: ${({ theme }) => theme.fontSizes[2]}px;
`;

const CardPrice = styled.div<TypographyProps>`
  ${typography}
  padding: ${({ theme }) => theme.space[1]}px 0;
  margin: ${({ theme }) => theme.space[1]}px 0;
  width: 100%;
  color: ${({ theme }) => theme.colors.primary};
  font-size: ${({ theme }) => theme.fontSizes[2]}px;
`;

const AddToCartButton = styled.button<SpaceProps & ColorProps>`
  ${space}
  ${color}
  padding: ${({ theme }) => theme.space[2]}px;
  background-color: ${({ theme }) => theme.colors.secondary};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 4px;
  cursor: pointer;
  text-align: center;
  width: 100%;
  height: ${({ theme }) => theme.space[8]}px;
  margin-top: ${({ theme }) => theme.space[1]}px;
  color: ${({ theme }) => theme.colors.background};

  &:hover {
    background-color: ${({ theme }) => theme.colors.primary};
    color: ${({ theme }) => theme.colors.background};
  }
`;

export const ArticleCard: React.FC<ArticleCardProps> = ({ article }) => {
  const { addToCart } = useCart();
  const formatter = new Intl.NumberFormat('de-DE', {
    style: 'currency',
    currency: 'EUR'
  });

  const handleAddToCart = () => {
    const cartItem: CartItem = {
      id: article.variantName,
      name: article.name,
      price: article.prices.regular.value / 100,
      quantity: 1
    };
    addToCart(cartItem);
  };

  return (
    <CardContainer p={2}>
      <CardImage src={article.images[0].path} alt={article.name} />
      <CardContentWrapper>
        <CardName fontSize={2}>{article.name}</CardName>
        <CardPrice fontSize={2}>
          {formatter.format(article.prices.regular.value / 100)}
        </CardPrice>
        <AddToCartButton p={1} type='button' onClick={handleAddToCart}>
          In den Warenkorb
        </AddToCartButton>
      </CardContentWrapper>
    </CardContainer>
  );
};
