import { CreateOrderPayload, CreateOrderSchema } from '@/lib/validators/orders';
import { useCreateOrder, useDeleteOrder } from '@/queries/orders';
import { OrderDetail, OrderStatus } from '@/queries/orders/types';
import { zodResolver } from '@hookform/resolvers/zod';
import Image from 'next/image';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
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
  SheetContent,
  SheetHeader,
  SheetTitle,
} from '../../ui';
import { noImageUrl } from '@/utils';

interface Props {
  order: OrderDetail;
}

const UpdateOrder: React.FC<Props> = ({ order }) => {
  const form = useForm<CreateOrderPayload>({
    resolver: zodResolver(CreateOrderSchema),
    defaultValues: {
      status: OrderStatus.NOPE,
      userId: order.userId,
      groupOrderId: order.groupOrderId,
      dishId: '',
      amount: 1,
      note: '',
    },
  });

  useEffect(() => {
    if (order) {
      form.reset({
        status: order.status,
        userId: order.userId,
        groupOrderId: order.groupOrderId,
        dishId: order.dishId,
        amount: order.amount,
        note: order.note || '',
      });
    }
  }, [form, order]);

  const { createOrder, isLoading } = useCreateOrder({
    onSuccess(data) {
      toast.success(`Update order successfully.`);
      setTimeout(() => {
        window.location.reload();
      }, 500);
    },
    onError(error) {
      toast.error(error.message);
    },
  });

  const { deleteOrder, isLoading: isLoadingDelete } = useDeleteOrder({
    onSuccess() {
      toast.success(`Delete order successfully.`);
      setTimeout(() => {
        window.location.reload();
      }, 500);
    },
    onError(error) {
      toast.error(error.message);
    },
  });

  const handleDeleteOrder = () => {
    deleteOrder({
      orderId: order.id,
    });
  };

  const onSubmit = async (values: CreateOrderPayload) => {
    createOrder({
      status: values.status,
      userId: values.userId,
      groupOrderId: values.groupOrderId,
      dishId: values.dishId,
      amount: values.amount,
      note: values.note,
    });
  };

  const amount = form.watch('amount');

  return (
    <SheetContent>
      <SheetHeader>
        <SheetTitle>Update Order</SheetTitle>
      </SheetHeader>

      <Card className="border-0 shadow-none">
        <CardHeader className="py-2 px-0">
          <CardTitle
            style={{
              height: 24,
              display: '-webkit-box',
              overflow: 'hidden',
              lineHeight: '24px',
              WebkitBoxOrient: 'vertical',
              WebkitLineClamp: 1,
            }}
          >
            {order.Dish.name}
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="w-[100%] h-[300px] relative border-zinc-300 border border-solid rounded-lg">
            <Image
              unoptimized
              src={order.Dish.imgUrl || noImageUrl}
              alt={`${order.Dish.category}-${order.Dish.name}`}
              fill
              priority
              style={{ objectFit: 'cover', borderRadius: '7px' }}
            />
          </div>
          <p className="text-xl font-semibold mt-2">
            {new Intl.NumberFormat().format(order.Dish.price)}VND
          </p>
        </CardContent>
      </Card>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex gap-3 flex-col pt-8">
          <FormField
            control={form.control}
            name="amount"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Amount *</FormLabel>
                <FormControl>
                  <Input placeholder="Amount" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="note"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Note</FormLabel>
                <FormControl>
                  <Input placeholder="Note" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <h1>Total: {new Intl.NumberFormat().format(order.Dish.price * amount)}d</h1>
          <Button type="submit" disabled={isLoadingDelete || isLoading}>
            Update
          </Button>
          <Button
            type="button"
            variant={'destructive'}
            onClick={() => handleDeleteOrder()}
            disabled={isLoadingDelete || isLoading}
          >
            Delete
          </Button>
        </form>
      </Form>
    </SheetContent>
  );
};

export default UpdateOrder;
