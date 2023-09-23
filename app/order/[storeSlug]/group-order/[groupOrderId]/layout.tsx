import AuthLayout from '@/components/layouts/check-auth-layout';
import { ThemeLayout } from '@/components/layouts/theme-layout';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <AuthLayout requiredLogin={false}>
      <ThemeLayout>{children}</ThemeLayout>
    </AuthLayout>
  );
}
