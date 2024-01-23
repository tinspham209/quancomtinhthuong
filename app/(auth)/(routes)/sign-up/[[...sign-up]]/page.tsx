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
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
} from '@/components/ui';
import { SignupPayload, SignupSchema } from '@/lib/validators/auth';
import { useSignup } from '@/queries/auth';
import TokenServices from '@/services/token';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useLayoutEffect } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';

export default function Page() {
  const searchParams = useSearchParams();
  const redirectUrl = searchParams.get('redirect_url');
  useLayoutEffect(() => {
    TokenServices.clearToken();
  }, []);
  const form = useForm<SignupPayload>({
    resolver: zodResolver(SignupSchema),
    defaultValues: {
      userName: '',
      password: '',
      name: '',
      email: '',
      phoneNumber: '',
      slackId: '',
      roleId: 2,
    },
  });

  const route = useRouter();

  const { signUp, isLoading } = useSignup({
    onSuccess() {
      toast.success(`Sign up successfully.`);

      route.push(`/sign-in?${redirectUrl ? `redirect_url=${redirectUrl}` : ''}`);
    },
  });

  const onSubmit = async (values: SignupPayload) => {
    signUp({
      name: values.name,
      userName: values.userName,
      password: values.password,
      email: values.email,
      phoneNumber: values.phoneNumber,
      slackId: values.slackId,
      roleId: values.roleId,
    });
  };

  return (
    <div className="min-w-[360px] max-w-[460px]">
      <Card>
        <CardHeader>
          <CardTitle>Sign up</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              autoComplete={'off'}
              className="gap-2 flex flex-col"
            >
              <FormField
                control={form.control}
                name="userName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Username *</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter your username ha" {...field} />
                    </FormControl>
                    <FormDescription>
                      Characters lowercase, number, underscore (_), dot (.), hyphen (-),
                      <br /> length: 3-20
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password *</FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="Enter your password ha" {...field} />
                    </FormControl>
                    <FormDescription>
                      Don&apos;t reuse your bank password, <br />
                      We didn&apos;t spend a lot on security for this app. <br />
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Your name *</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter your name ha" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email *</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter your email ha" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <p className="text-md font-semibold mt-2">Additional Information</p>
              <p className="text-sm text-muted-foreground">
                You can skip this step,
                <br />
                But If u get correct value, We will appreciate for your effort ha
              </p>
              <FormField
                control={form.control}
                name="phoneNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone number</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter your phone number ha" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="slackId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Your Slack ID</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter your Slack ID ha" {...field} />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit" disabled={isLoading} className="mt-2">
                Sign Up
              </Button>
            </form>
          </Form>
        </CardContent>
        <CardFooter>
          <p className="text-sm mr-2">Already have account? </p>
          <Link
            href={`/sign-in?${redirectUrl ? `redirect_url=${redirectUrl}` : ''}`}
            className="text-sm font-medium transition-colors hover:text-blue-500"
          >
            Sign In
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
}
