'use client';

import { UpdateInvoicePayload, UpdateInvoiceSchema } from '@/lib/validators';
import { useGetInvoicesById, useUpdateInvoice } from '@/queries/invoices';
import { Invoice } from '@/queries/invoices/types';
import { zodResolver } from '@hookform/resolvers/zod';
import { Minus, Plus } from 'lucide-react';
import React, { useEffect } from 'react';
import { FieldErrors, useFieldArray, useForm } from 'react-hook-form';
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

interface Props {
  invoice: Invoice;
}

const UpdateInvoice: React.FC<Props> = ({ invoice }) => {
  const form = useForm<UpdateInvoicePayload>({
    resolver: zodResolver(UpdateInvoiceSchema),
    defaultValues: {
      id: invoice.id,
      title: invoice.title,
      description: invoice.description,
      amount: invoice.amount || 1,
      imgUrls: invoice.imgUrls.map((url) => ({ url })),
    },
  });

  const { fields, append, remove } = useFieldArray({ control: form.control, name: 'imgUrls' });

  const { handleInvalidateInvoices } = useGetInvoicesById();

  const { updateInvoice, isLoading: isLoadingUpdate } = useUpdateInvoice({
    onSuccess() {
      handleInvalidateInvoices();
      toast.success(`Update Invoice successfully.`);

      setTimeout(() => {
        window.location.reload();
      }, 500);
    },
    onError(error) {
      toast.error(error.message);
    },
  });

  const onSubmit = async (values: UpdateInvoicePayload) => {
    updateInvoice({
      invoiceId: values.id,
      title: values.title.trim(),
      description: values.description.trim(),
      amount: Number(values.amount),
      imgUrls: values.imgUrls,
    });
  };

  const onInvalidSubmit = (formErrors: FieldErrors<UpdateInvoicePayload>) => {
    console.log('formErrors: ', formErrors);
  };

  return (
    <SheetContent>
      <SheetHeader>
        <SheetTitle>Update Invoice</SheetTitle>
      </SheetHeader>

      <div className="max-h-[90vh] overflow-y-auto">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit, onInvalidSubmit)}
            className="flex gap-3 flex-col pt-8"
          >
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Invoice name *</FormLabel>
                  <FormControl ref={field.ref}>
                    <Input placeholder="Invoice name" {...field} />
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
                  <FormLabel>Invoice description</FormLabel>
                  <FormControl ref={field.ref}>
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
                  <FormLabel>Amount *</FormLabel>
                  <FormControl ref={field.ref}>
                    <Input placeholder="1000" type="number" {...field} />
                  </FormControl>
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

            <Button type="submit" disabled={isLoadingUpdate}>
              {'Update'}
            </Button>
          </form>
        </Form>
      </div>
    </SheetContent>
  );
};

export default UpdateInvoice;
