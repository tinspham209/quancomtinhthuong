import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
  :root {
    --commonBgColor:  ${({ theme }) => theme.global?.common?.bgColor};
    --commonColor: ${({ theme }) => theme.global?.common?.color};
    --primaryBtnBgColor:  ${({ theme }) => theme.global?.common?.primaryBtnBgColor};
    --primaryBtnColor: ${({ theme }) => theme.global?.common?.primaryBtnColor};
    --cardBgColor: ${({ theme }) => theme.global?.card?.bgColor};
    --cardColor: ${({ theme }) => theme.global?.card?.color};
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
