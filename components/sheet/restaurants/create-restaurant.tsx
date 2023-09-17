'use client';

import { CreateRestaurantPayload, CreateRestaurantSchema } from '@/lib/validators/restaurants';
import { Callback } from '@/queries/auth/types';
import {
  useCreateRestaurant,
  useGetRestaurantById,
  useGetRestaurants,
  useUpdateRestaurant,
} from '@/queries/restaurants';
import { Restaurant } from '@/queries/restaurants/types';
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

interface CreateRestaurantProps {
  onClose: Callback;
  isEdit?: boolean;
  restaurant?: Restaurant;
}

const CreateRestaurant: React.FC<CreateRestaurantProps> = ({ onClose, isEdit, restaurant }) => {
  const router = useRouter();

  const { handleInvalidateRestaurantById } = useGetRestaurantById();
  const { handleInvalidateRestaurants } = useGetRestaurants();

  const form = useForm<CreateRestaurantPayload>({
    resolver: zodResolver(CreateRestaurantSchema),
    defaultValues: {
      name: '',
      link: '',
      description: '',
    },
  });

  useEffect(() => {
    if (isEdit && restaurant) {
      form.reset({
        name: restaurant.name,
        link: restaurant.link,
        description: restaurant.description,
      });
    }
  }, [form, isEdit, restaurant]);

  const { createRestaurant, isLoading: isLoadingCreate } = useCreateRestaurant({
    onSuccess(data) {
      handleInvalidateRestaurantById();
      handleInvalidateRestaurants();
      onClose();
      toast.success(`Create restaurant (${data.name}) successfully.`);
      router.push(`/dashboard/restaurants/${data.id}`);
    },
    onError(error) {
      toast.error(error.message);
    },
  });

  const { updateRestaurant, isLoading: isLoadingUpdate } = useUpdateRestaurant({
    onSuccess(data) {
      handleInvalidateRestaurantById();
      handleInvalidateRestaurants();
      onClose();
      toast.success(`Update restaurant (${data.name}) successfully.`);
    },
    onError(error) {
      toast.error(error.message);
    },
  });

  const onSubmit = async (values: CreateRestaurantPayload) => {
    if (isEdit && restaurant) {
      updateRestaurant({
        restaurantId: restaurant.id,
        name: values.name.trim(),
        link: values.link.trim(),
        description: values.description.trim(),
      });
    } else {
      createRestaurant({
        name: values.name.trim(),
        link: values.link.trim(),
        description: values.description.trim(),
      });
    }
  };

  return (
    <SheetContent>
      <SheetHeader>
        <SheetTitle>{isEdit ? 'Update' : 'Create'} Restaurant</SheetTitle>
      </SheetHeader>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex gap-3 flex-col pt-8">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Restaurant name *</FormLabel>
                <FormControl>
                  <Input placeholder="Restaurant name" {...field} />
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
                <FormLabel>Restaurant description *</FormLabel>
                <FormControl>
                  <Input placeholder="Restaurant description" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="link"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Restaurant link URL</FormLabel>
                <FormControl>
                  <Input placeholder="Start with https://food.grab.com/...." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" disabled={isLoadingCreate || isLoadingUpdate}>
            {isEdit ? 'Update' : 'Create'}
          </Button>
        </form>
      </Form>
    </SheetContent>
  );
};

export default CreateRestaurant;
