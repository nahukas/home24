import styled from '@emotion/styled';
import {
  color,
  ColorProps,
  space,
  SpaceProps,
  typography,
  TypographyProps
} from 'styled-system';

export const SearchWrapper = styled.div`
  position: relative;
  flex: 1;
  display: flex;
  max-width: 600px;
`;

export const SearchInput = styled.input<
  SpaceProps & ColorProps & TypographyProps
>`
  ${space}
  ${color}
  ${typography}
  width: 100%;
  border: 1px solid ${(props) => props.theme.colors.secondary};
  background-color: ${(props) => props.theme.colors.inputBackground};
  border-radius: 9999px;
  padding: 8px 48px 8px 16px;
  outline: none;
  font-size: 16px;

  &:focus {
    border-color: ${(props) => props.theme.colors.primary};
    box-shadow: 0 0 0 2px ${(props) => props.theme.colors.primary}30;
  }

  @media (max-width: ${(props) => props.theme.breakpoints[0]}) {
    width: 100%;
    margin-top: ${(props) => props.theme.space[2]}px;
  }
`;

export const SearchButton = styled.button`
  position: absolute;
  right: 8px;
  top: 50%;
  transform: translateY(-50%);
  background-color: ${({ theme }) => theme.colors.primary};
  border: none;
  border-radius: 9999px;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  cursor: pointer;
  padding: 0;
`;
