'use client';

import { useDeleteGroupOrder } from '@/queries/group-orders';
import { GroupOrderDetail } from '@/queries/group-orders/types';
import { useGetRestaurantById } from '@/queries/restaurants';
import dayjs from 'dayjs';
import { Trash } from 'lucide-react';
import React from 'react';
import { toast } from 'react-hot-toast';
import { Button, SheetContent, SheetHeader, SheetTitle } from '../../ui';

interface Props {
  order: GroupOrderDetail;
}

const DeleteGroupOrder: React.FC<Props> = ({ order }) => {
  const { handleInvalidateRestaurantById } = useGetRestaurantById();
  const { deleteGroupOrder, isLoading } = useDeleteGroupOrder({
    onSuccess() {
      handleInvalidateRestaurantById();

      toast.success('Delete dish successfully.');

      setTimeout(() => {
        window.location.reload();
      }, 500);
    },
    onError(error) {
      toast.error(error.message);
    },
  });

  const handleDeleteDish = () => {
    if (order) {
      deleteGroupOrder({ groupOrderId: order.id || '' });
    } else {
      toast.error(`Can't get group order id.`);
    }
  };

  return (
    <SheetContent>
      <SheetHeader>
        <SheetTitle className="flex">
          <Trash className="mr-2 h-5 w-5" />
          Delete Group Order
        </SheetTitle>
      </SheetHeader>

      <div className="max-h-[90vh] overflow-y-auto">
        <p className="text-lg text-muted-foreground mt-4">
          Are you sure you want to delete Group Order:
        </p>
        <p>
          Name: <b>{order?.title || 'Unknown'}</b>
        </p>
        <p>
          Restaurant: <b>{order.restaurant.name}</b>
        </p>
        <p>
          Date: <b>{dayjs(order.createdAt).format('DD-MMM-YYYY')}</b>
        </p>
        <Button onClick={handleDeleteDish} disabled={isLoading} className="mt-4">
          Delete
        </Button>
      </div>
    </SheetContent>
  );
};

export default DeleteGroupOrder;
