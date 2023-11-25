'use client';
import {
  Button,
  Card,
  CardContent,
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
import { UpdateResetPasswordPayload, UpdateResetPasswordSchema } from '@/lib/validators/auth';
import { useChangePassword, useLogin, useProfile } from '@/queries/auth';
import TokenServices from '@/services/token';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useLayoutEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';

export default function Page() {
  useLayoutEffect(() => {
    TokenServices.clearToken();
  }, []);
  const searchParams = useSearchParams();
  const redirectUrl = searchParams.get('redirect_url');
  const token = decodeURIComponent(searchParams.get('token')!);
  const userName = searchParams.get('username');
  const [accessToken, setAccessToken] = useState('');
  const [invalid, setInvalid] = useState(true);

  const route = useRouter();

  const { login, isLoading: isLoadingLogin } = useLogin({
    onSuccess(data, variables, context) {
      setAccessToken(data.access_token);
      setInvalid(false);
    },
    onError() {
      toast.error('Seems like your reset password url is invalid. Try again !');
      setInvalid(true);
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

  const form = useForm<UpdateResetPasswordPayload>({
    resolver: zodResolver(UpdateResetPasswordSchema),
    defaultValues: {
      newPassword: '',
      confirmPassword: '',
    },
  });

  const { changePassword, isLoading: isLoadingResetPassword } = useChangePassword({
    onSuccess(data) {
      toast.success(`Change Password successfully.`);
      TokenServices.setToken(accessToken);
      setTimeout(() => {
        const toastLoading = toast.loading(`Logging in`);
        setTimeout(() => {
          toast.remove(toastLoading);
          toast.success(`Sign in successfully.`);
          getMyProfile();
        }, 2000);
      }, 2000);
    },
    onError(error) {
      toast.error(error.message);
    },
  });

  const onSubmit = async (values: UpdateResetPasswordPayload) => {
    if (values.newPassword !== values.confirmPassword) {
      toast.error('Passwords not match');
      return;
    }

    changePassword({
      userName: userName!,
      currPassword: token!,
      newPassword: values.newPassword,
    });
  };

  useEffect(() => {
    login({
      userName: userName!,
      password: token!,
    });
  }, []);

  return (
    <div className="min-w-[400px]">
      <Card>
        <CardHeader>
          <CardTitle>Reset Password</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="gap-4 flex flex-col">
              <FormField
                control={form.control}
                name="newPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>New Password *</FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="New Password" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirm Password *</FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="Confirm Password" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button
                type="submit"
                disabled={isLoadingLogin || isLoadingResetPassword || loading || invalid}
              >
                Reset Password
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
