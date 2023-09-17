'use client';

import { Callback, Store } from '@/queries/auth/types';
import { useDeleteStore, useGetStoresByUserName } from '@/queries/stores';
import { Trash } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React from 'react';
import { toast } from 'react-hot-toast';
import { Button, SheetContent, SheetHeader, SheetTitle } from '../../ui';

interface Props {
  onClose?: Callback;
  store: Store | undefined;
}

const DeleteStore: React.FC<Props> = ({ onClose, store }) => {
  const router = useRouter();
  const { handleInvalidateStoresByUserName } = useGetStoresByUserName();
  const { deleteStore, isLoading } = useDeleteStore({
    onSuccess() {
      handleInvalidateStoresByUserName();
      toast.success('Delete store successfully.');
      router.push('/dashboard');
      setTimeout(() => {
        window.location.reload();
      }, 500);
    },
    onError(error) {
      toast.error(error.message);
    },
  });

  const handleDelete = () => {
    if (store) {
      deleteStore({ storeId: store.id });
    } else {
      toast.error(`Can't get store id.`);
    }
  };

  return (
    <SheetContent>
      <SheetHeader>
        <SheetTitle className="flex">
          <Trash className="mr-2 h-5 w-5" />
          Delete Store
        </SheetTitle>
      </SheetHeader>

      <p className="text-lg text-muted-foreground my-4">
        Are you sure you want to delete store: <b>{store?.name || 'Unknown'}</b>
      </p>
      <Button onClick={handleDelete} disabled={isLoading}>
        Delete
      </Button>
    </SheetContent>
  );
};

export default DeleteStore;
