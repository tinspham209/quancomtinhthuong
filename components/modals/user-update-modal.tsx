'use client';

import {
  Button,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
} from '@/components/ui';
import Modal from '@/components/ui/modal';
import { useProfileStore, useUserUpdateModal } from '@/hooks';
import { UpdateUserPayload, UpdateUserSchema } from '@/lib/validators';
import { useUpdateUser } from '@/queries/user';
import { zodResolver } from '@hookform/resolvers/zod';
import { AxiosError } from 'axios';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';

export const UserUpdateModal = () => {
  const userUpdateModal = useUserUpdateModal();
  const { profile, onSetProfile } = useProfileStore();

  userUpdateModal.isOpen =
    (!!profile && (!profile?.email || !profile?.phoneNumber)) || userUpdateModal.isOpen;

  const { updateUser, isLoading } = useUpdateUser({
    onSuccess(data, variables) {
      onSetProfile({ ...profile, email: data.email, phoneNumber: data.phoneNumber });
      toast.success('Update successfully');
      userUpdateModal.onClose();
    },
    onError(error) {
      if (error instanceof AxiosError) {
        toast.error(`${JSON.stringify(error?.response?.data)}`);
      } else {
        toast.error(error?.message || error?.message[0]);
      }
    },
  });

  const form = useForm<UpdateUserPayload>({
    resolver: zodResolver(UpdateUserSchema),
    defaultValues: {
      email: '',
      phoneNumber: '',
    },
  });

  const onSubmit = async (values: UpdateUserPayload) => {
    updateUser(values);
  };

  useEffect(() => {
    if (profile) {
      form.reset({
        email: profile?.email || '',
        phoneNumber: profile?.phoneNumber || '',
      });
    }
  }, [form, profile]);

  return (
    <Modal
      title="Update User"
      description={
        !profile?.email || !profile?.phoneNumber
          ? 'Required missing email and phone number'
          : `Update your user's infos`
      }
      isOpen={userUpdateModal.isOpen}
      onClose={userUpdateModal.onClose}
    >
      <div>
        <div className="space-y-4 py-2 pb-4">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input disabled={isLoading} placeholder="Email" type="email" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="phoneNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone number</FormLabel>
                    <FormControl>
                      <Input disabled={isLoading} placeholder="Phone number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="pt-6 space-x-2 flex items-center justify-end w-full">
                {!(!profile?.email || !profile?.phoneNumber) && (
                  <Button
                    disabled={isLoading}
                    variant={'outline'}
                    onClick={userUpdateModal.onClose}
                    type="button"
                  >
                    Cancel
                  </Button>
                )}
                <Button disabled={isLoading} type="submit">
                  Continue
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </Modal>
  );
};
