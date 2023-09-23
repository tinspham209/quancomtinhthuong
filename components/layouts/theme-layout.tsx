'use client';

import { ThemeContextProvider } from '@/providers/theme-provider';

export function ThemeLayout({ children }: { children: React.ReactNode }) {
  return <ThemeContextProvider>{children}</ThemeContextProvider>;
}
