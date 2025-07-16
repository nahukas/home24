import React from 'react';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Content from './components/Content';
import Footer from './components/Footer';
import useProductData from './hooks/useProductData';
import { layout, LayoutProps, space, SpaceProps } from 'styled-system';
import styled from '@emotion/styled';

const PageContainer = styled.div<SpaceProps & LayoutProps>`
  ${space}
  ${layout}
  display: grid;
  grid-gap: ${({ theme }) => theme.space[4]}px;
  grid-template-columns: 160px auto auto;
  grid-template-areas:
    'header header header'
    'sidebar content content'
    'footer footer footer';
  margin: ${({ theme }) => theme.space[1]}px;
`;

const ProductList: React.FC = () => {
  const { categories, loading, error } = useProductData();

  return (
    <PageContainer>
      <Header />
      <Sidebar categories={categories} loading={loading} error={error} />
      <Content categories={categories} loading={loading} error={error} />
      <Footer />
    </PageContainer>
  );
};

export default ProductList;
