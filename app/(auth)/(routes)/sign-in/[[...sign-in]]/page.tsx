'use client';
import {
  Button,
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
} from '@/components/ui';
import { useProfileStore } from '@/hooks';
import { LoginPayload, LoginSchema } from '@/lib/validators/auth';
import { useLogin, useProfile } from '@/queries/auth';
import TokenServices from '@/services/token';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useLayoutEffect } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';

export default function Page() {
  useLayoutEffect(() => {
    TokenServices.clearToken();
  }, []);
  const searchParams = useSearchParams();
  const redirectUrl = searchParams.get('redirect_url');
  const form = useForm<LoginPayload>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      userName: '',
      password: '',
    },
  });

  const { onSetProfile } = useProfileStore();
  const { getMyProfile, loading } = useProfile({
    onSuccess(data) {
      onSetProfile(data);

      if (redirectUrl) {
        route.push(redirectUrl);
      } else {
        if (data.role.name === 'ADMIN') {
          route.push(`/stores`);
        } else {
          route.push('/dashboard');
        }
      }
    },
  });

  const route = useRouter();

  const { login, isLoading } = useLogin({
    onSuccess(data, variables, context) {
      toast.success(`Sign in successfully.`);
      TokenServices.setToken(data.access_token);
      getMyProfile();
    },
  });

  const onSubmit = async (values: LoginPayload) => {
    login({
      userName: values.userName,
      password: values.password,
    });
  };

  return (
    <div className="min-w-[400px]">
      <Card>
        <CardHeader>
          <CardTitle>Sign in</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="gap-4 flex flex-col">
              <FormField
                control={form.control}
                name="userName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <Input placeholder="Username" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="Password" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit" disabled={isLoading || loading}>
                Signin
              </Button>
            </form>
          </Form>
        </CardContent>
        <CardFooter className="flex flex-col">
          <div className="flex flex-row">
            <p className="text-sm mr-2">No account? </p>
            <Link
              href={`/sign-up?${redirectUrl ? `redirect_url=${redirectUrl}` : ''}`}
              className="text-sm font-medium transition-colors hover:text-blue-500"
            >
              Signup
            </Link>
          </div>
          <div className="mt-2">
            <Button
              variant={'ghost'}
              onClick={() => {
                toast.error('Relax and try to remember your password.');
              }}
            >
              Forgot your password?
            </Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
