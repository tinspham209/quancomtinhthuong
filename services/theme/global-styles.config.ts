import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
  :root {
    --commonBgColor:  ${({ theme }) => {
      return theme.common.bgColor;
    }};
    --commonColor: ${({ theme }) => theme.common.color};
    --cardBgColor: ${({ theme }) => theme.card.bgColor};
    --cardColor: ${({ theme }) => theme.card.color};
  }

  body {
    color: ${({ theme }) => theme.common.color};
    background: var(--commonBgColor);
  }
`;
