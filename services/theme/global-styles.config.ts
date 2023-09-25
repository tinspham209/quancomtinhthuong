import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
  :root {
    --commonBgColor:  ${({ theme }) => theme.common.bgColor};
    --commonColor: ${({ theme }) => theme.common.color};
    --primaryBtnBgColor:  ${({ theme }) => theme.common.primaryBtnBgColor};
    --primaryBtnColor: ${({ theme }) => theme.common.primaryBtnColor};
    --cardBgColor: ${({ theme }) => theme.card.bgColor};
    --cardColor: ${({ theme }) => theme.card.color};
  }

  body {
    color: var(--commonColor);
    background: var(--commonBgColor);
  }

  nav {
    color: var(--commonColor);
    background: var(--commonBgColor);
  }
`;
