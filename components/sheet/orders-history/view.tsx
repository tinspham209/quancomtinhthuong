import { OrderStatus } from '@/queries/orders/types';
import { OrdersHistoryDetail } from '@/queries/ordersHistory/type';
import { formatMoney, noImageUrl } from '@/utils';
import { ExternalLink } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import React, { useMemo } from 'react';
import { Button, SheetContent, SheetHeader, SheetTitle } from '../../ui';

interface Props {
  order: OrdersHistoryDetail;
}
const ViewOrder: React.FC<Props> = ({ order }) => {
  const { subTotal, showPaymentLink } = useMemo(() => {
    const showPaymentLink = order.status === OrderStatus.NOPE && !!order.paymentLink;
    const subTotal = order.Orders.reduce((total, curr) => total + curr.Dish.price, 0);
    return { subTotal, showPaymentLink };
  }, [order]);

  return (
    <SheetContent>
      <SheetHeader>
        <SheetTitle>Order Detail</SheetTitle>
      </SheetHeader>

      <div className="max-h-[90vh] overflow-y-auto">
        {order.Orders.map((item, index) => {
          return (
            <div className="border-0 shadow-none mt-2" key={`${item.Dish.name}-${index}`}>
              <div className="p-2 mt-2 flex align-middle gap-2 border rounded-lg">
                <div className="min-w-[90px] max-w-[90px] h-auto relative border-zinc-300 border border-solid rounded-lg ">
                  <Image
                    unoptimized
                    src={item.Dish.imgUrl || noImageUrl}
                    alt={`${item.Dish.name}`}
                    fill
                    priority
                    style={{ objectFit: 'cover', borderRadius: '7px' }}
                  />
                </div>
                <div>
                  <p
                    title={item.Dish.name}
                    className="font-bold"
                    style={{
                      display: '-webkit-box',
                      overflow: 'hidden',
                      WebkitBoxOrient: 'vertical',
                      WebkitLineClamp: 2,
                    }}
                  >
                    {item.Dish.name}
                  </p>
                  <p className="mt-1 text-sm">
                    {formatMoney(item.Dish.price)}VND <span className="ml-2">x</span> {item.amount}
                  </p>
                  <p className="text-xl font-semibold mt-3">
                    {formatMoney(item.Dish.price * (item.amount ?? 1))}đ
                  </p>
                </div>
              </div>
            </div>
          );
        })}

        <div className="my-8 grid grid-cols-[1fr_2fr] gap-2">
          <div className="font-semibold">Sub Total</div>
          <div>{formatMoney(subTotal)}đ</div>
          <div className="font-semibold">Discount</div>
          <div>{formatMoney(order.discount)}đ</div>
          <div className="font-semibold text-xl">Total</div>
          <div className="font-semibold text-xl">{formatMoney(order.total)}đ</div>
        </div>

        <div className="flex justify-center mt-4 gap-4">
          <Link
            href={`/order/${order.Store.storeSlug}/group-order/${order.id}/orders?viewOnlyMe=true`}
            target="_blank"
          >
            <Button>
              Go to Orders <ExternalLink className="w-4 h-4 ml-2 mb-1" />
            </Button>
          </Link>
          {showPaymentLink && (
            <Link href={`${order.paymentLink}`} target="_blank">
              <Button>
                Payment <ExternalLink className="w-4 h-4 ml-2 mb-1" />
              </Button>
            </Link>
          )}
        </div>
      </div>
    </SheetContent>
  );
};

export default ViewOrder;
