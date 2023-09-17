'use client';

import { Callback } from '@/queries/auth/types';
import { useDeleteDish } from '@/queries/dishes';
import { Dish } from '@/queries/dishes/types';
import { useGetRestaurantById } from '@/queries/restaurants';
import { Trash } from 'lucide-react';
import React from 'react';
import { toast } from 'react-hot-toast';
import { Button, SheetContent, SheetHeader, SheetTitle } from '../../ui';

interface Props {
  onClose?: Callback;
  dish: Dish | undefined;
}

const DeleteDish: React.FC<Props> = ({ onClose, dish }) => {
  const { handleInvalidateRestaurantById } = useGetRestaurantById();
  const { deleteDish, isLoading } = useDeleteDish({
    onSuccess() {
      handleInvalidateRestaurantById();

      toast.success('Delete dish successfully.');

      window.location.reload();
    },
    onError(error) {
      toast.error(error.message);
    },
  });

  const handleDeleteDish = () => {
    if (dish) {
      deleteDish({ dishId: dish.id || '' });
    } else {
      toast.error(`Can't get dish id.`);
    }
  };

  return (
    <SheetContent>
      <SheetHeader>
        <SheetTitle className="flex">
          <Trash className="mr-2 h-5 w-5" />
          Delete Dish
        </SheetTitle>
      </SheetHeader>

      <p className="text-lg text-muted-foreground my-4">
        Are you sure you want to delete dish: <b>{dish?.name || 'Unknown'}</b>
      </p>
      <Button onClick={handleDeleteDish} disabled={isLoading}>
        Delete
      </Button>
    </SheetContent>
  );
};

export default DeleteDish;
