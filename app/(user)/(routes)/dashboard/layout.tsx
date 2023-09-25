import AuthLayout from '@/components/layouts/check-auth-layout';
import { ThemeLayout } from '@/components/layouts/theme-layout';
import NoSsr from '@/components/no-ssr';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <NoSsr>
      <AuthLayout requiredLogin={false}>
        <ThemeLayout>{children}</ThemeLayout>
      </AuthLayout>
    </NoSsr>
  );
}
