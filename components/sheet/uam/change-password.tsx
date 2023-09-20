import { useProfileStore } from '@/hooks';
import { ChangePasswordPayload, ChangePasswordSchema } from '@/lib/validators';
import { useChangePassword } from '@/queries/auth';
import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import {
  Button,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from '../../ui';

interface Props {}

const ChangePassword: React.FC<Props> = ({}) => {
  const { profile } = useProfileStore();

  const form = useForm<ChangePasswordPayload>({
    resolver: zodResolver(ChangePasswordSchema),
    defaultValues: {
      userName: profile?.userName || '',
      currPassword: '',
      newPassword: '',
    },
  });

  const { changePassword, isLoading } = useChangePassword({
    onSuccess(data) {
      toast.success(`Change Password successfully.`);

      setTimeout(() => {
        window.location.reload();
      }, 500);
    },
    onError(error) {
      toast.error(error.message);
    },
  });

  const onSubmit = async (values: ChangePasswordPayload) => {
    changePassword({
      userName: profile?.userName || '',
      currPassword: values.currPassword,
      newPassword: values.newPassword,
    });
  };

  return (
    <SheetContent>
      <SheetHeader>
        <SheetTitle>Change Password</SheetTitle>
      </SheetHeader>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex gap-3 flex-col pt-8">
          <FormField
            control={form.control}
            name="currPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Current Password *</FormLabel>
                <FormControl>
                  <Input placeholder="Current Password" type="password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="newPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>New Password *</FormLabel>
                <FormControl>
                  <Input placeholder="New Password" type="password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" disabled={isLoading}>
            Change
          </Button>
        </form>
      </Form>
    </SheetContent>
  );
};

export default ChangePassword;
