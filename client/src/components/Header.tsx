import React from 'react';

const Header: React.FC = () => {
  return (
    <header className='header'>
      <strong>home24</strong>
      <input placeholder='Search' aria-label='Search products' />
    </header>
  );
};

export default Header;
