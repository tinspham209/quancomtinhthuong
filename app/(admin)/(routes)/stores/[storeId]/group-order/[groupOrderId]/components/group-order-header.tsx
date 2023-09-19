import {
  FinalizedGroupOrder,
  TriggerFinalizedGroupOrder,
  TriggerDebtGroupOrder,
} from '@/components/sheet';
import { Button, Sheet, SheetTrigger } from '@/components/ui';
import { useOrigin } from '@/hooks';
import useCopyToClipboard from '@/hooks/use-copy-to-clipboard';
import { Store } from '@/queries/auth/types';
import { GroupOrderDetail } from '@/queries/group-orders/types';
import dayjs from 'dayjs';
import Link from 'next/link';
import React from 'react';
import toast from 'react-hot-toast';

interface Props {
  order: GroupOrderDetail | undefined;
  store: Store | undefined;
}

const GroupOrderHeader: React.FC<Props> = ({ order, store }) => {
  const origin = useOrigin();
  const [value, copy] = useCopyToClipboard();

  const handleGetLinkOrder = () => {
    const url = `${origin}/order/${store?.storeSlug}/group-order/${order?.id}`;
    copy(url);
    toast.success(
      'Copy Order URL to clipboard successfully. You can post it in your slack channel to start ordering',
    );
  };

  const isFinalizedOrder = order?.finalized;

  return (
    <div className="mb-4">
      <div className="flex flex-col md:flex-row justify-between">
        <div className="flex flex-col">
          <h1 className="text-3xl font-bold leading-none tracking-tight mb-1">
            {order?.title || 'Unknown'}
          </h1>
          {order?.description && (
            <p className="text-xl text-muted-foreground mb-1">{order.description}</p>
          )}
          <p className="text-xl text-muted-foreground">
            Date: {dayjs(order?.createdAt).format('DD-MMM-YYYY')}
          </p>

          <p className="text-xl text-muted-foreground">
            Finalized: {isFinalizedOrder ? 'Yes' : 'No'}
          </p>
        </div>
        <div className="flex flex-row gap-2">
          {isFinalizedOrder && (
            <div>
              <Button
                variant={'outline'}
                onClick={() => {
                  toast.error('On Develop');
                }}
              >
                View Order Summary
              </Button>
            </div>
          )}
          <div>
            <Button variant={'secondary'} onClick={handleGetLinkOrder}>
              Get Link Order
            </Button>
          </div>

          <div>
            <Link href={`/stores/${order?.storeId}/group-order/${order?.id}/orders`}>
              <Button>View All Orders</Button>
            </Link>
          </div>
        </div>
      </div>
      <div className="flex flex-row mt-4 md:mt-0 justify-end gap-2">
        <div>
          <Sheet>
            <SheetTrigger asChild>
              <Button>Finalize</Button>
            </SheetTrigger>
            <FinalizedGroupOrder order={order as GroupOrderDetail} />
          </Sheet>
        </div>
        {isFinalizedOrder && (
          <>
            <div>
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant={'secondary'}>Trigger Finalize</Button>
                </SheetTrigger>
                <TriggerFinalizedGroupOrder />
              </Sheet>
            </div>
          </>
        )}
        {isFinalizedOrder && (
          <>
            <div>
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant={'outline'}>Trigger Debt</Button>
                </SheetTrigger>
                <TriggerDebtGroupOrder />
              </Sheet>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default GroupOrderHeader;
