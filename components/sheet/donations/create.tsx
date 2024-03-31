'use client';

import { cn } from '@/lib/utils';
import { CreateGroupDonationPayload, CreateGroupDonationSchema } from '@/lib/validators/donations';
import { useProfile } from '@/queries/auth';
import { Callback } from '@/queries/auth/types';
import {
  useCreateGroupDonation,
  useGetDonationById,
  useGetListDonations,
  useUpdateGroupDonation,
} from '@/queries/donations';
import { Donation } from '@/queries/donations/types';
import { useGetStoresByUserName } from '@/queries/stores';
import { zodResolver } from '@hookform/resolvers/zod';
import { CalendarIcon, Check, ChevronsUpDown, Minus, Plus } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';
import { FieldErrors, useFieldArray, useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import {
  Button,
  Calendar,
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
  Popover,
  PopoverContent,
  PopoverTrigger,
  ScrollArea,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from '@/components/ui';
import dayjs from 'dayjs';

interface CreateGroupDonationProps {
  onClose: Callback;
  isEdit?: boolean;
  donation?: Donation;
}

const CreateGroupDonation: React.FC<CreateGroupDonationProps> = ({ onClose, isEdit, donation }) => {
  const router = useRouter();
  const { profile } = useProfile();
  const { storesByUserName } = useGetStoresByUserName({
    userName: profile?.userName || 'dong_ky',
  });

  const { handleInvalidateDonationById } = useGetDonationById();
  const { handleInvalidateListDonations } = useGetListDonations();

  const form = useForm<CreateGroupDonationPayload>({
    resolver: zodResolver(CreateGroupDonationSchema),
    defaultValues: {
      title: '',
      description: '',
      imgUrls: [
        {
          url: '',
        },
      ],
      userId: profile?.id || '',
      storeSlug: 'dongkyorder',
      donationTarget: 0,
      finalized: false,
      dueDate: 0,
      dueDateTemp: new Date(),
    },
  });

  const { watch } = form;

  const { fields, append, remove } = useFieldArray({ control: form.control, name: 'imgUrls' });

  useEffect(() => {
    if (isEdit && donation) {
      form.reset({
        title: donation.title,
        description: donation.description,
        imgUrls: donation.imgUrls.map((url) => ({ url })),
        userId: donation.Fundraiser.id,
        storeSlug: donation.storeSlug,
        donationTarget: donation.donationTarget,
        finalized: donation.finalized || false,
        dueDate: 0,
        dueDateTemp: dayjs().add(donation.dueDate, 'ms').toDate(),
      });
    }
  }, [donation, form, isEdit]);

  useEffect(() => {
    if (profile && !isEdit) {
      form.setValue('userId', profile.id);
    }
  }, [form, isEdit, profile]);

  const { createGroupDonation, isLoading: isLoadingCreate } = useCreateGroupDonation({
    onSuccess(data) {
      handleInvalidateDonationById();
      handleInvalidateListDonations();
      onClose();
      toast.success(`Create group donation (${data.title}) successfully.`);
      router.push(`/a-donations/${data.id}`);
    },
    onError(error) {
      toast.error(error.message);
    },
  });

  const { updateGroupDonation, isLoading: isLoadingUpdate } = useUpdateGroupDonation({
    onSuccess(data) {
      handleInvalidateDonationById();
      handleInvalidateListDonations();
      onClose();
      toast.success(`Update group donation (${data.title}) successfully.`);

      setTimeout(() => {
        window.location.reload();
      }, 200);
    },
    onError(error) {
      toast.error(error.message);
    },
  });

  const onSubmit = (values: CreateGroupDonationPayload) => {
    if (isEdit && donation) {
      updateGroupDonation({
        title: values.title.trim(),
        description: values.description.trim(),
        imgUrls: values.imgUrls,
        userId: values.userId,
        storeSlug: values.storeSlug,
        donationTarget: values.donationTarget,
        finalized: values.finalized || false,
        dueDate: values.dueDate,
        donationId: donation.id,
      });
    } else {
      createGroupDonation({
        title: values.title.trim(),
        description: values.description.trim(),
        imgUrls: values.imgUrls,
        userId: values.userId,
        storeSlug: values.storeSlug,
        donationTarget: values.donationTarget,
        finalized: values.finalized || false,
        dueDate: values.dueDate,
      });
    }
  };

  const onInvalidSubmit = (formErrors: FieldErrors<CreateGroupDonationPayload>) => {
    console.log('formErrors: ', formErrors);
  };

  return (
    <SheetContent>
      <SheetHeader>
        <SheetTitle>{isEdit ? 'Update' : 'Create'} Group Donation</SheetTitle>
      </SheetHeader>

      <div className="max-h-[90vh] overflow-y-auto">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit, onInvalidSubmit)}
            className="flex gap-3 flex-col"
          >
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Donation Title *</FormLabel>
                  <FormControl>
                    <Input placeholder="Donation Title" {...field} />
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
                  <FormLabel>Donation description *</FormLabel>
                  <FormControl>
                    <Input placeholder="Donation description" {...field} />
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
            <FormField
              control={form.control}
              name="donationTarget"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Donation target *</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Donation target"
                      type="number"
                      min={1000}
                      {...field}
                      onChange={(e) => {
                        form.setValue('donationTarget', Number(e.target.value));
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="storeSlug"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Store *</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant="outline"
                          role="combobox"
                          className={cn('justify-between', !field.value && 'text-muted-foreground')}
                        >
                          {field.value
                            ? storesByUserName?.find((store) => store.storeSlug === field.value)
                                ?.name
                            : 'Select store'}
                          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="p-0">
                      <Command>
                        <CommandInput placeholder="Search store..." />
                        <CommandEmpty>No store found.</CommandEmpty>
                        <CommandGroup>
                          <ScrollArea className="max-h-[300px] overflow-y-auto">
                            {storesByUserName?.map((store) => (
                              <CommandItem
                                value={store.id}
                                key={store.id}
                                onSelect={() => {
                                  form.setValue('storeSlug', store.storeSlug);
                                }}
                                className="cursor-pointer text-left"
                              >
                                <Check
                                  className={cn(
                                    'mr-2 h-4 w-4',
                                    store.id === field.value ? 'opacity-100' : 'opacity-0',
                                  )}
                                />
                                {store.name}
                              </CommandItem>
                            ))}
                          </ScrollArea>
                        </CommandGroup>
                      </Command>
                    </PopoverContent>
                  </Popover>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="dueDateTemp"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Due Date *</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={'outline'}
                          className={cn(
                            'pl-3 text-left font-normal',
                            !field.value && 'text-muted-foreground',
                          )}
                        >
                          {field.value ? (
                            <span>{dayjs(field.value).format('DD/MM/YYYY')}</span>
                          ) : (
                            <span>Pick a date</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value as any}
                        onSelect={(day: any) => {
                          form.setValue('dueDateTemp', day);
                          const diff = dayjs(day).diff(dayjs(), 'milliseconds');
                          form.setValue('dueDate', diff);
                        }}
                        fromDate={dayjs().toDate()}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" disabled={isLoadingCreate || isLoadingUpdate}>
              {isEdit ? 'Update' : 'Create'}
            </Button>
          </form>
        </Form>
      </div>
    </SheetContent>
  );
};

export default CreateGroupDonation;
