'use client';

import { useDeleteOrder } from '@/queries/orders';
import { OrderDetail } from '@/queries/orders/types';
import { Trash } from 'lucide-react';
import React from 'react';
import { toast } from 'react-hot-toast';
import { Button, SheetContent, SheetHeader, SheetTitle } from '../../ui';

interface Props {
  order: OrderDetail;
  isShowUserName?: boolean;
}

const DeleteOrder: React.FC<Props> = ({ order, isShowUserName = false }) => {
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

  return (
    <SheetContent>
      <SheetHeader>
        <SheetTitle className="flex items-center">
          <Trash className="mr-2 h-5 w-5 -translate-y-[2px] text-red-500" />
          Delete Order
        </SheetTitle>
      </SheetHeader>

      <p className="text-lg text-muted-foreground mt-4">Are you sure you want to delete order:</p>
      <p>
        Dish: <b>{order?.Dish.name || 'Unknown'}</b>
      </p>
      <p>
        Amount: <b>{order.amount}</b>
      </p>
      {isShowUserName && (
        <p>
          User: <b>{order.User.name}</b>
        </p>
      )}

      <Button
        onClick={handleDeleteOrder}
        variant={'destructive'}
        disabled={isLoadingDelete}
        className="mt-4"
      >
        Delete
      </Button>
    </SheetContent>
  );
};

export default DeleteOrder;
