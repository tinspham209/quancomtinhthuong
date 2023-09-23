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
} from '../../ui';
import { noImageUrl } from '@/utils';
import { cn } from '@/lib/utils';
import { useGetDishesByRestaurantId } from '@/queries/dishes';
import { Check, ChevronsUpDown } from 'lucide-react';

interface Props {
  order: OrderDetail;
  restaurantId: string;
}

const UpdateOrder: React.FC<Props> = ({ order, restaurantId }) => {
  const form = useForm<CreateOrderPayload>({
    resolver: zodResolver(CreateOrderSchema),
    defaultValues: {
      status: OrderStatus.NOPE,
      userId: order.userId,
      groupOrderId: order.groupOrderId,
      dishId: '',
      amount: 1,
      note: '',
      orderNumber: order.orderNumber,
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
        orderNumber: order.orderNumber,
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
      orderNumber: values.orderNumber,
    });
  };

  const dishId = form.watch('dishId');
  const amount = form.watch('amount');
  const { dishes } = useGetDishesByRestaurantId({
    restaurantId: restaurantId,
  });

  const currentDish = dishes.find((dish) => dish.id === dishId);

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
            title={currentDish?.name}
          >
            {currentDish?.name}
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="w-[100%] h-[300px] relative border-zinc-300 border border-solid rounded-lg">
            <Image
              unoptimized
              src={currentDish?.imgUrl || noImageUrl}
              alt={`${currentDish?.category}-${currentDish?.name}`}
              fill
              priority
              style={{ objectFit: 'cover', borderRadius: '7px' }}
            />
          </div>
          <p className="text-xl font-semibold mt-2">
            {new Intl.NumberFormat().format(currentDish?.price || 0)}VND
          </p>
        </CardContent>
      </Card>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex gap-3 flex-col pt-8">
          <FormField
            control={form.control}
            name="dishId"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Dish</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant="outline"
                        role="combobox"
                        className={cn(
                          'justify-between',

                          !field.value && 'text-muted-foreground',
                        )}
                      >
                        {field.value
                          ? dishes.find((dish) => dish.id === field.value)?.name
                          : 'Select Restaurant'}
                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="p-0" side="bottom">
                    <Command className="">
                      <CommandInput placeholder="Search Restaurant..." />
                      <CommandEmpty>No dish found.</CommandEmpty>
                      <CommandGroup>
                        <ScrollArea className="max-h-[300px] overflow-y-auto">
                          {dishes
                            .filter((dish) => dish.disable)
                            .map((dish) => (
                              <CommandItem
                                value={dish.id}
                                key={dish.id}
                                onSelect={() => {
                                  form.setValue('dishId', dish.id || '');
                                }}
                                className={cn('cursor-pointer text-left')}
                              >
                                <Check
                                  className={cn(
                                    'mr-2 h-4 w-4',
                                    dish.id === field.value ? 'opacity-100' : 'opacity-0',
                                  )}
                                />
                                {dish.name}
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
