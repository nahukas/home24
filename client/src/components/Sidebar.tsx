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

import { Category } from '../types';

interface SidebarProps {
  categories: Category[];
  loading: boolean;
  error: string | null;
}

const SidebarContainer = styled.aside<SpaceProps & ColorProps & LayoutProps>`
  ${space}
  ${color}
  ${layout}
  grid-area: sidebar;
  background-color: ${({ theme }) => theme.colors.background};
`;

const SidebarTitle = styled.h3<TypographyProps>`
  ${typography}
  margin: 0;
  padding: ${({ theme }) => theme.space[2]}px;
  color: ${({ theme }) => theme.colors.text};
`;

const CategoryList = styled.ul`
  ${space}
  list-style-type: none;
  margin: 0;
  padding: 0;
`;

const CategoryItem = styled.li<SpaceProps>`
  ${space}
  margin-left: ${({ theme }) => theme.space[1]}px;
  padding: ${({ theme }) => theme.space[2]}px 0;
`;

const CategoryLink = styled.a<TypographyProps>`
  ${typography}
  color: ${({ theme }) => theme.colors.text};
  text-decoration: none;

  &:hover {
    color: ${({ theme }) => theme.colors.primary};
  }
`;

const Sidebar: React.FC<SidebarProps> = ({ categories, loading, error }) => {
  const renderCategories = () => {
    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;
    if (!categories.length) return <div>No categories found</div>;

    return (
      <CategoryList>
        {categories[0].childrenCategories.list.map(({ name, urlPath }) => (
          <CategoryItem key={urlPath}>
            <CategoryLink href={`/${urlPath}`} fontSize={2}>
              {name}
            </CategoryLink>
          </CategoryItem>
        ))}
      </CategoryList>
    );
  };

  return (
    <SidebarContainer p={3}>
      <SidebarTitle>Kategorien</SidebarTitle>
      {renderCategories()}
    </SidebarContainer>
  );
};

export default Sidebar;
