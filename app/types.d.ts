import { ThemeConfig } from '@/services/theme';
import 'styled-components';

type AxiosError = import('axios').AxiosError;

declare type ErrorResponse = AxiosError & {
  error: string;
  message: string;
  statusCode: number;
};

declare module 'styled-components' {
  export interface DefaultTheme extends ThemeConfig {}
}
