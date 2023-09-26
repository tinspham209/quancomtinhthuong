import AuthLayout from '@/components/layouts/check-auth-layout';
import NoSsr from '@/components/no-ssr';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <NoSsr>
      <AuthLayout requiredLogin={false}>{children}</AuthLayout>
    </NoSsr>
  );
}
