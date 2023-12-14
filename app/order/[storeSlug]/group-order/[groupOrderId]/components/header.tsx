import { Button, Skeleton } from '@/components/ui';
import { GroupOrderDetail } from '@/queries/group-orders/types';
import dayjs from 'dayjs';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';

interface Props {
  order: GroupOrderDetail | undefined;
}

const OrderHeader: React.FC<Props> = ({ order }) => {
  const pathname = usePathname();
  return (
    <div>
      <div className="flex flex-col md:flex-row justify-between">
        <div className="flex flex-col">
          <h1 className="text-3xl font-bold leading-none tracking-tight mb-1">
            {order?.title || 'Unknown'}
          </h1>
          {order?.description && (
            <p className="text-xl text-yellow-100 mb-1">{order.description}</p>
          )}
          <p className="text-md text-yellow-100">
            Date: {dayjs(order?.createdAt).format('DD-MMM-YYYY')}
          </p>
          <p className="text-md text-yellow-100">Limit: {order?.limit || 'Unlimited'}</p>
          <p className="text-md text-yellow-100">Finalized: {order?.finalized ? 'Yes' : 'No'}</p>

          <h2 className="text-2xl font-bold leading-none tracking-tight mt-4">
            {order?.restaurant.name || 'Restaurant'}
          </h2>
        </div>
        <div className="flex flex-row gap-2 mt-2 sm:mt-0">
          <div>
            <Link className="w-full" href={`${pathname}/orders`}>
              <Button className="w-full">View all orders</Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderHeader;
