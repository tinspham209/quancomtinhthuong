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
import { ResetPasswordPayload, ResetPasswordSchema } from '@/lib/validators/auth';
import { useResetPassword } from '@/queries/auth/useResetPassword';
import TokenServices from '@/services/token';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useLayoutEffect } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';

export default function Page() {
  useLayoutEffect(() => {
    TokenServices.clearToken();
  }, []);
  const form = useForm<ResetPasswordPayload>({
    resolver: zodResolver(ResetPasswordSchema),
    defaultValues: {
      userName: '',
    },
  });

  const route = useRouter();

  const { resetPassword, isLoading } = useResetPassword({
    onSuccess(data, variables, context) {
      const userName = form.getValues('userName');
      toast.success(`Sent to ${userName}'s email`);

      route.push('sign-in');
    },
  });

  const onSubmit = async (values: ResetPasswordPayload) => {
    resetPassword({
      userName: values.userName,
    });
  };

  return (
    <div className="min-w-[400px]">
      <Card>
        <CardHeader>
          <CardTitle>Reset ur password 🔐</CardTitle>
          <div className="max-w-[350px]">
            <p className="text-sm text-gray-400 mt-2 italic">
              The email will take couple minutes to send. In case you don{"'"}t see the reset
              password email. Please check your spam or junk mail folder. 💌
            </p>
          </div>
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

              <Button type="submit" disabled={isLoading}>
                Request
              </Button>
            </form>
          </Form>
        </CardContent>
        <CardFooter className="flex flex-col">
          <div className="flex flex-row">
            <p className="text-sm mr-2">
              Ur memory is back ? {'\n'}
              <Link
                href={`/sign-in`}
                className="text-sm font-medium transition-colors hover:text-blue-500"
              >
                Sign in
              </Link>{' '}
            </p>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
