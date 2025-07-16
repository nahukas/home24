import styled from '@emotion/styled';
import React, { useState } from 'react';
import { FiShoppingCart, FiTrash2 } from 'react-icons/fi';
import {
  color,
  ColorProps,
  layout,
  LayoutProps,
  space,
  SpaceProps} from 'styled-system';

import { useCart } from '../context/cartContext';

const CartWrapper = styled.div<SpaceProps & ColorProps & LayoutProps>`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
  ${space}
  ${color}
  ${layout}
`;

const CartCount = styled.span<SpaceProps & ColorProps>`
  position: absolute;
  top: -6px;
  right: -10px;
  background-color: ${({ theme }) => theme.colors.primary};
  color: white;
  font-size: 12px;
  font-weight: bold;
  border-radius: 9999px;
  padding: 2px 6px;
  ${space}
  ${color}
`;

const CartDropdown = styled.div<SpaceProps & LayoutProps>`
  position: absolute;
  top: 100%;
  right: 0;
  background: white;
  border: 1px solid #dee2e6;
  border-radius: 4px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  min-width: 250px;
  z-index: 10;
  ${space}
  ${layout}
`;

const CartItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 16px;
  border-bottom: 1px solid #dee2e6;
`;

const QuantityControls = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const QuantityButton = styled.button<SpaceProps & ColorProps>`
  width: 24px;
  height: 24px;
  background-color: ${({ theme }) => theme.colors.secondary};
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  ${space}
  ${color}

  &:hover {
    background-color: ${({ theme }) => theme.colors.primary};
  }
`;

const ClearButton = styled.button<SpaceProps>`
  width: 100%;
  padding: 8px;
  background: #ff4d4f;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-top: 8px;
  ${space}
`;

const CartSummary: React.FC = () => {
  const { cartItems, removeFromCart, clearCart, incrementItem, decrementItem } =
    useCart();
  const [isOpen, setIsOpen] = useState(false);

  const toggleCart = () => setIsOpen(!isOpen);

  const totalQuantity = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const formatter = new Intl.NumberFormat('de-DE', {
    style: 'currency',
    currency: 'EUR',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  });

  return (
    <CartWrapper p={2}>
      <FiShoppingCart size={24} onClick={toggleCart} data-testid='cart-icon' />
      <CartCount>{totalQuantity}</CartCount>
      {isOpen && (
        <CartDropdown p={2}>
          {cartItems.length === 0 ? (
            <p>Cart is empty</p>
          ) : (
            <>
              {cartItems.map((item) => (
                <CartItem key={item.id}>
                  <span>
                    {item.name} (x{item.quantity})
                  </span>
                  <span>
                    {formatter.format(item.price * item.quantity)}
                    <QuantityControls>
                      <QuantityButton onClick={() => decrementItem(item.id)}>
                        -
                      </QuantityButton>
                      <QuantityButton onClick={() => incrementItem(item.id)}>
                        +
                      </QuantityButton>
                      <QuantityButton
                        onClick={() => removeFromCart(item.id)}
                        data-testid={`trash-icon-${item.id}`}
                      >
                        <FiTrash2 size={16} />
                      </QuantityButton>
                    </QuantityControls>
                  </span>
                </CartItem>
              ))}
              <ClearButton onClick={clearCart}>Clear Cart</ClearButton>
            </>
          )}
        </CartDropdown>
      )}
    </CartWrapper>
  );
};

export default CartSummary;
