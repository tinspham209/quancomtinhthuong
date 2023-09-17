import FinalizedGroupOrder from '@/components/sheet/group-orders/finalized';
import { Button, Sheet, SheetTrigger } from '@/components/ui';
import { GroupOrderDetail } from '@/queries/group-orders/types';
import { useGetOrdersByGroupOrderId } from '@/queries/orders';
import dayjs from 'dayjs';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { useMemo } from 'react';
import { toast } from 'react-hot-toast';

interface Props {
  groupOrder: GroupOrderDetail | undefined;
}

const OrdersHeader: React.FC<Props> = ({ groupOrder }) => {
  const { handleInvalidateOrders, loading } = useGetOrdersByGroupOrderId({
    groupOrderId: groupOrder?.id,
  });
  const pathname = usePathname();

  const createNewOrderUrl = useMemo(() => {
    if (pathname.endsWith('/orders')) {
      const lastIndex = pathname.lastIndexOf('/orders');

      return pathname.slice(0, lastIndex).replace(/\/+$/, '');
    }

    return pathname;
  }, [pathname]);

  return (
    <div className="mb-4">
      <div className="flex flex-col md:flex-row justify-between">
        <div className="flex flex-col">
          <h1 className="text-3xl font-bold leading-none tracking-tight mb-1">
            {groupOrder?.title || 'Unknown'}
          </h1>
          {groupOrder?.description && (
            <p className="text-xl text-muted-foreground mb-1">{groupOrder.description}</p>
          )}
          <p className="text-md text-muted-foreground">
            Date: {dayjs(groupOrder?.createdAt).format('DD-MMM-YYYY')}
          </p>
          <p className="text-md text-muted-foreground">Limit: {groupOrder?.limit || 'Unlimited'}</p>
          <p className="text-md text-muted-foreground">
            Finalized: {groupOrder?.finalized ? 'Yes' : 'No'}
          </p>
        </div>
        <div className="flex flex-row gap-2 mt-2 sm:mt-0">
          <div>
            <Button
              variant={'secondary'}
              onClick={() => {
                window.location.reload();
              }}
              disabled={loading}
            >
              Refresh
            </Button>
          </div>
          <div>
            <Link href={createNewOrderUrl}>
              <Button>Create new order</Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrdersHeader;
