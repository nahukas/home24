import React from 'react';
import styled from '@emotion/styled';
import {
  space,
  layout,
  SpaceProps,
  ColorProps,
  LayoutProps,
  color
} from 'styled-system';
import LogoIcon from '../assets/logo.svg';
import { SearchWrapper, SearchInput, SearchButton } from './Search';
import { FiSearch, FiShoppingCart } from 'react-icons/fi';
import { CartWrapper, CartCount } from './Cart';

const LogoSVG = styled.img`
  height: 32px;
  width: auto;
`;

const HeaderContainer = styled.header<SpaceProps & ColorProps & LayoutProps>`
  ${space}
  ${color}
  ${layout}
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${({ theme }) => theme.space[3]}px;
  grid-area: header;
  background-color: ${({ theme }) => theme.colors.background};
  border-bottom: 1px solid #dee2e6;
`;

const LogoContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin: ${({ theme }) => theme.space[2]}px;
  cursor: pointer;
`;

const CartLabel = styled.span`
  font-size: 12px;
  color: #444;
  margin-top: 4px;
`;

const handleLogoClick = () => {
  window.location.assign('/');
};

const Header: React.FC = () => {
  return (
    <HeaderContainer p={3}>
      <LogoContainer onClick={handleLogoClick}>
        <LogoSVG src={LogoIcon} alt='Logo' />
      </LogoContainer>
      <SearchWrapper>
        <SearchInput
          placeholder='Wonach suchst du?'
          aria-label='Suchfeld'
          p={2}
          fontSize={2}
        />
        <SearchButton>
          <FiSearch size={16} />
        </SearchButton>
      </SearchWrapper>
      <CartWrapper>
        <FiShoppingCart size={24} />
        <CartCount>1</CartCount>
        <CartLabel>Warenkorb</CartLabel>
      </CartWrapper>
    </HeaderContainer>
  );
};

export default Header;
