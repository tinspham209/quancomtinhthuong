import { useProfileStore } from '@/hooks';
import { CreateOrderPayload, CreateOrderSchema } from '@/lib/validators/orders';
import { Dish } from '@/queries/dishes/types';
import { useCreateOrder, useGetOrdersByGroupOrderId } from '@/queries/orders';
import { OrderStatus } from '@/queries/orders/types';
import { zodResolver } from '@hookform/resolvers/zod';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';
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
import useAuthNavigate from '@/hooks/use-auth-navigate';
import { HttpStatusCode } from 'axios';
import { noImageUrl } from '@/utils';
import { Icons } from '@/components/icons';

interface Props {
  groupOrderId: string;
  dish: Dish;
}
const CreateOrder: React.FC<Props> = ({ groupOrderId, dish }) => {
  const { profile } = useProfileStore();
  const { navigateToLogin } = useAuthNavigate();
  const pathname = usePathname();
  const form = useForm<CreateOrderPayload>({
    resolver: zodResolver(CreateOrderSchema),
    defaultValues: {
      status: OrderStatus.NOPE,
      userId: profile?.id || '',
      groupOrderId: groupOrderId,
      dishId: dish.id,
      amount: 1,
      note: '',
      additionalPrice: 0,
      additionalNote: '',
    },
  });

  const { handleInvalidateOrders } = useGetOrdersByGroupOrderId({
    groupOrderId: groupOrderId,
  });

  const { createOrder, isLoading, isSuccess } = useCreateOrder({
    onSuccess(_data) {
      toast.success(`Create order successfully.`);
      handleInvalidateOrders();
    },
    onError(error) {
      if (
        error.statusCode === HttpStatusCode.Unauthorized ||
        error.status === HttpStatusCode.Unauthorized ||
        error.message[0].includes('userId should not be empty')
      ) {
        navigateToLogin();
      } else {
        toast.error(error.message);
      }
    },
  });

  const onSubmit = async (values: CreateOrderPayload) => {
    createOrder({
      status: values.status,
      userId: values.userId,
      groupOrderId: values.groupOrderId,
      dishId: values.dishId,
      amount: Number(values.amount),
      note: values.note,
      additionalPrice: Number(values.additionalPrice),
      additionalNote: values.additionalNote,
    });
  };

  const amount = form.watch('amount');

  return (
    <SheetContent>
      {isSuccess ? (
        <>
          <SheetHeader>
            <SheetTitle>Create Order Successfully</SheetTitle>
          </SheetHeader>

          <div className="flex flex-col gap-4 mt-24">
            <Link className="w-full" href={`${pathname}/orders`}>
              <Button className="w-full">View all orders</Button>
            </Link>
            <Button
              type="button"
              variant={'outline'}
              onClick={() => {
                window.location.reload();
              }}
            >
              Create new order
            </Button>
          </div>
        </>
      ) : (
        <>
          <SheetHeader>
            <SheetTitle>Create Order</SheetTitle>
          </SheetHeader>

          <div className="max-h-[90vh] overflow-y-auto">
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
                  title={dish.name}
                >
                  {dish.name}
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <div className="w-[150px] h-[150px] relative border-zinc-300 border border-solid rounded-lg">
                  <Image
                    unoptimized
                    src={dish.imgUrl || noImageUrl}
                    alt={`${dish.category}-${dish.name}`}
                    fill
                    priority
                    style={{ objectFit: 'cover', borderRadius: '7px' }}
                  />
                </div>
                <p className="text-xl font-semibold mt-2">
                  {new Intl.NumberFormat().format(dish.price)}đ
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

                <h1>Total: {new Intl.NumberFormat().format(dish.price * amount)}d</h1>
                <Button type="submit" disabled={isLoading}>
                  Create
                </Button>
              </form>
            </Form>
          </div>
        </>
      )}
      <div className="mt-8">
        <Icons.logoFullWithSlogan />
      </div>
    </SheetContent>
  );
};

export default CreateOrder;
