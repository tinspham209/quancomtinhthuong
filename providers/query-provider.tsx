'use client';

import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { FC, ReactNode } from 'react';

interface LayoutProps {
  children: ReactNode;
}

const QueryProvider: FC<LayoutProps> = ({ children }) => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
        refetchOnReconnect: false,
        retry: false,
        staleTime: 60 * 60 * 1000,
      },
    },
  });

  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
};

export default QueryProvider;
