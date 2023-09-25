import { ThemeConfig } from '@/services/theme';

export interface AppConfig extends ThemeConfig, Object {}

export interface GetAppConfigResponse {
  configs: AppConfig;
  debtTime: string;
  orderFinalizeTime: string;
  isDebtTimeCalled: boolean;
  isOrderFinalizeTimeCalled: boolean;
  daysRange: string;
}

export interface UpdateAppConfigPayload {
  configs: AppConfig;
}
