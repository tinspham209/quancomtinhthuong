import 'styled-components';
import { OrderThemeConfig } from './order/[storeSlug]/group-order/[groupOrderId]/layout';

type AxiosError = import('axios').AxiosError;

declare type ErrorResponse = AxiosError & {
  error: string;
  message: string;
  statusCode: number;
};

declare module 'styled-components' {
  export interface DefaultTheme extends OrderThemeConfig {}
}
