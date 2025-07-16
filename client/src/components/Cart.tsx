import styled from '@emotion/styled';

export const CartWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
`;

export const CartCount = styled.span`
  position: absolute;
  top: -6px;
  right: -10px;
  background-color: ${({ theme }) => theme.colors.primary};
  color: white;
  font-size: 12px;
  font-weight: bold;
  border-radius: 9999px;
  padding: 2px 6px;
`;
