import './globals.css';
import { Roboto } from 'next/font/google';
import ModalProvider from '@/providers/modal-provider';
import { Toaster } from 'react-hot-toast';
import QueryProvider from '@/providers/query-provider';
import Navbar from '@/components/navbar';

import { getMetaData } from '@/utils/metaData';
import { ThemeLayout } from '@/components/layouts/theme-layout';

export const font = Roboto({
  weight: ['300', '400', '500', '700'],
  style: ['normal', 'italic'],
  subsets: ['latin'],
});

export const metadata = getMetaData({
  title: 'Quán Ăn Tình Thương - Ăn không ngon thì cook',
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={font.className}>
      <body className="min-h-[90vh]" suppressHydrationWarning={true}>
        <QueryProvider>
          <ThemeLayout>
            <ModalProvider />
            <Toaster />
            <Navbar />
            <main style={{ marginTop: '60px' }}>{children}</main>
          </ThemeLayout>
        </QueryProvider>
      </body>
    </html>
  );
}
