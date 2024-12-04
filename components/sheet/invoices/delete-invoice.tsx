'use client';

import { useProfileStore } from '@/hooks';
import { Callback } from '@/queries/auth/types';
import { useDeleteInvoice, useGetInvoicesById } from '@/queries/invoices';
import { Invoice } from '@/queries/invoices/types';
import { Trash } from 'lucide-react';
import React, { useMemo } from 'react';
import { toast } from 'react-hot-toast';
import { Button, SheetContent, SheetHeader, SheetTitle } from '../../ui';

interface Props {
  onClose?: Callback;
  invoice: Invoice | undefined;
}

const DeleteInvoice: React.FC<Props> = ({ onClose, invoice }) => {
  const { handleInvalidateInvoices } = useGetInvoicesById();
  const { deleteInvoice, isLoading } = useDeleteInvoice({
    onSuccess() {
      handleInvalidateInvoices();
      toast.success('Delete invoice successfully.');

      window.location.reload();
    },
    onError(error) {
      toast.error(error.message);
    },
  });

  const handleInvoiceDish = () => {
    if (invoice) {
      deleteInvoice({ invoiceId: invoice.id || 0 });
    } else {
      toast.error(`Can't get invoice id.`);
    }
  };

  return (
    <SheetContent>
      <SheetHeader>
        <SheetTitle className="flex">
          <Trash className="mr-2 h-5 w-5" />
          Delete Invoice
        </SheetTitle>
      </SheetHeader>

      <p className="text-lg text-muted-foreground my-4">
        Are you sure you want to delete invoice with ID: <b>{invoice?.id || 'Unknown'}</b>
      </p>
      <Button onClick={handleInvoiceDish} disabled={isLoading}>
        Delete
      </Button>
    </SheetContent>
  );
};

export default DeleteInvoice;
