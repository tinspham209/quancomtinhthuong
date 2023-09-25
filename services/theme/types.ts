export interface ThemeProps {
  bgColor: string;
  color: string;
  imageUrl: string;
  hoverColor: string;
  titleColor: string;
  descriptionColor: string;
  borderColor: string;
  boxShadowColor: string;

  primaryBtnBgColor: string;
  primaryBtnColor: string;
}

export interface ThemeConfigSection {
  common: Partial<ThemeProps>;
  card: Partial<ThemeProps>;
}

export interface ThemeConfigProps {
  global: Partial<ThemeConfigSection>;
  profile: Partial<ThemeConfigSection>;
}

export interface ThemeConfig extends Partial<ThemeConfigProps> {
  name?: string;
}
