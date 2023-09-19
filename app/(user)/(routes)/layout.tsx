'use client';
import CheckAuthLayout from '@/components/layouts/check-auth-layout';

export default function UserLayout({ children }: { children: React.ReactNode }) {
  return <CheckAuthLayout>{children}</CheckAuthLayout>;
}
