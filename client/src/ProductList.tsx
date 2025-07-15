import React from 'react';
import './ProductList.css';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Content from './components/Content';
import Footer from './components/Footer';
import useCategories from './hooks/useCategories';

const ProductList: React.FC = () => {
  const { categories, loading, error } = useCategories();

  return (
    <div className='page'>
      <Header />
      <Sidebar categories={categories} loading={loading} error={error} />
      <Content categories={categories} loading={loading} error={error} />
      <Footer />
    </div>
  );
};

export default ProductList;
