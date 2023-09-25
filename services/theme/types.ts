interface ThemeProps {
  bgColor: string;
  color: string;
  primaryBtnBgColor: string;
  primaryBtnColor: string;
}

export interface ThemeConfigProps {
  common: ThemeProps;
  card: Partial<ThemeProps>;
}

export interface ThemeConfig extends ThemeConfigProps {
  name: string;
}
