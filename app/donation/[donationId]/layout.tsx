import AuthLayout from '@/components/layouts/check-auth-layout';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <AuthLayout requiredLogin={false}>{children}</AuthLayout>;
}
