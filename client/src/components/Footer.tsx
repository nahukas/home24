import styled from '@emotion/styled';
import React from 'react';
import {
  color,
  ColorProps,
  layout,
  LayoutProps,
  space,
  SpaceProps} from 'styled-system';

const FooterContainer = styled.footer<SpaceProps & ColorProps & LayoutProps>`
  ${space}
  ${color}
  ${layout}
  grid-area: footer;
  background-color: ${({ theme }) => theme.colors.background};
  text-align: center;
  color: ${({ theme }) => theme.colors.text};
  padding: ${({ theme }) => theme.space[2]}px;
`;

const Footer: React.FC = () => {
  return (
    <FooterContainer>
      Alle Preise sind in Euro (€) inkl. gesetzlicher Umsatzsteuer und
      Versandkosten.
    </FooterContainer>
  );
};

export default Footer;
