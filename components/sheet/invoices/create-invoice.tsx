'use client';

import { Callback } from '@/queries/auth/types';

import { CreateInvoicePayload, CreateInvoiceSchema } from '@/lib/validators';
import { useCreateInvoice, useGetInvoicesById } from '@/queries/invoices';
import { zodResolver } from '@hookform/resolvers/zod';
import { Minus, Plus } from 'lucide-react';
import React from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import {
  Button,
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
  SheetContent,
  SheetHeader,
  SheetTitle
} from '../../ui';

interface Props {
  onClose: Callback;
  donationItemId: string;
}

const CreateInvoice: React.FC<Props> = ({ onClose, donationItemId }) => {
  const form = useForm<CreateInvoicePayload>({
    resolver: zodResolver(CreateInvoiceSchema),
    defaultValues: {
      amount: 0,
      description: '',
      imgUrls: [
        {
          url: '',
        },
      ],
      title: '',
    },
  });

  const { handleInvalidateInvoices } = useGetInvoicesById();

  const { createInvoice, isLoading: isLoadingCreate } = useCreateInvoice({
    onSuccess(data) {
      handleInvalidateInvoices();
      toast.success(`Create invoice successfully.`);

      setTimeout(() => {
        window.location.reload();
      }, 500);
    },
    onError(error) {
      toast.error(error.message);
    },
  });

  const onSubmit = async (values: CreateInvoicePayload) => {
    createInvoice({
      donationItemId,
      amount: Number(values.amount),
      title: values.title,
      description: values.description,
      imgUrls: values.imgUrls,
    });
  };

  const { fields, append, remove } = useFieldArray({ control: form.control, name: 'imgUrls' });

  return (
    <SheetContent>
      <SheetHeader>
        <SheetTitle>Create Invoice</SheetTitle>
      </SheetHeader>

      <div className="max-h-[90vh] overflow-y-auto">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="flex gap-3 flex-col pt-8">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Chi cho cai gi: </FormLabel>
                  <FormControl>
                    <Input placeholder="Chi cho: " {...field} />
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
                  <FormLabel>Chi tiet: </FormLabel>
                  <FormControl>
                    <Input placeholder="Invoice description" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="amount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>So tien *</FormLabel>
                  <FormControl>
                    <Input placeholder="1000" type="number" {...field} />
                  </FormControl>
                  <FormDescription>Example: 20000</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {fields.map((field, index) => (
              <div key={field.id} className="flex gap-3 items-end">
                <FormField
                  control={form.control}
                  name={`imgUrls.${index}.url`}
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>Image Url *</FormLabel>
                      <FormControl>
                        <Input placeholder="Image Url" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button
                  variant="outline"
                  onClick={() => {
                    if (index !== 0) {
                      remove(index);
                    }
                  }}
                >
                  <Minus />
                </Button>
              </div>
            ))}
            <Button
              onClick={() => {
                append({ url: '' });
              }}
              variant="ghost"
            >
              <Plus />
            </Button>

            <Button type="submit" disabled={isLoadingCreate}>
              {'Create'}
            </Button>
          </form>
        </Form>
      </div>
    </SheetContent>
  );
};

export default CreateInvoice;
