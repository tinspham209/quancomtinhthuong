import { useProfileStore } from '@/hooks';
import { CreateStorePayload, CreateStoreSchema } from '@/lib/validators';
import { Callback, Store } from '@/queries/auth/types';
import { useCreateStore, useGetStoresByUserName } from '@/queries/stores';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';
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

interface CreateStoreProps {
  onClose: Callback;
  isEdit?: boolean;
  store?: Store | undefined;
}

const CreateStore: React.FC<CreateStoreProps> = ({ onClose, isEdit, store }) => {
  const router = useRouter();
  const { profile } = useProfileStore();

  const { handleInvalidateStoresByUserName, getStoresByUserName } = useGetStoresByUserName({
    userName: profile?.userName || '',
  });

  const form = useForm<CreateStorePayload>({
    resolver: zodResolver(CreateStoreSchema),
    defaultValues: {
      name: '',
      description: '',
      slackWebhookUrl: '',
      ruleDescription: '',
      imgUrl: '',
      userId: profile?.id,
      storeSlug: '',
      bankInfo: '',
    },
  });

  const { createStore, isLoading } = useCreateStore({
    onSuccess(data) {
      handleInvalidateStoresByUserName();
      onClose();
      toast.success(`Create store (${data.name}) successfully.`);
      router.push(`/stores/${data.id}`);
    },
    onError(error) {
      toast.error(error.message);
    },
    onSettled() {
      getStoresByUserName();
    },
  });

  const onSubmit = async (values: CreateStorePayload) => {
    createStore({
      name: values.name,
      description: values.description,
      ruleDescription: values.ruleDescription,
      slackWebhookUrl: values.slackWebhookUrl,
      imgUrl: values.imgUrl,
      userId: values.userId,
      storeSlug: values.storeSlug,
      bankInfo: values.bankInfo,
    });
  };

  return (
    <SheetContent>
      <SheetHeader>
        <SheetTitle>Create Store</SheetTitle>
      </SheetHeader>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex gap-3 flex-col pt-8">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Store name *</FormLabel>
                <FormControl>
                  <Input placeholder="Store name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="storeSlug"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Store Slug *</FormLabel>
                <FormControl>
                  <Input placeholder="Store Slug" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Store description *</FormLabel>
                <FormControl>
                  <Input placeholder="Store description" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="ruleDescription"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Rule Description</FormLabel>
                <FormControl>
                  <Input multiple placeholder="Rule Description" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="bankInfo"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Bank Information</FormLabel>
                <FormControl>
                  <Input placeholder="Bank Information" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="slackWebhookUrl"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Your Channel Slack webhook url</FormLabel>
                <FormControl>
                  <Input placeholder="Start with https://hooks.slack.com/service...." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="imgUrl"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Store Thumbnail URL</FormLabel>
                <FormControl>
                  <Input placeholder="URL" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" disabled={isLoading}>
            Create
          </Button>
        </form>
      </Form>
    </SheetContent>
  );
};

export default CreateStore;
