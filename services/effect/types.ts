import { ReactNode } from 'react';

export interface EffectProps {
  content: ReactNode;
  amount?: number;
  isImgUrl?: boolean;
}

// export interface EffectConfigProps {
//   global: Array<Partial<EffectProps>>;
//   profile: Array<Partial<EffectProps>>;
// }

export interface EffectConfig {
  name?: string;
  enable: boolean;
  config: Array<EffectProps>;
}
