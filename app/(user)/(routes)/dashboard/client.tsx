'use client';

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  Button,
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  Heading,
} from '@/components/ui';
import { useGetGroupOrders } from '@/queries/group-orders';
import { GroupOrder } from '@/queries/group-orders/types';
import Link from 'next/link';
import React from 'react';

interface Props {}

const Client: React.FC<Props> = ({}: Props) => {
  const { groupLists } = useGetGroupOrders();

  const getListCurrentUser = (orders: GroupOrder['Orders']) => {
    if (!groupLists) return [];
    const arr: {
      avatarUrl: string;
      title: string;
    }[] = [];
    orders.forEach((order) => {
      arr.push({
        avatarUrl: order.User.imgUrl,
        title: order.User.userName,
      });
    });

    const uniqueArr = Array.from(new Map(arr.map((m) => [m.title, m])).values());

    return uniqueArr;
  };

  return (
    <div className="p-4 pt-8">
      <div className="flex flex-col sm:flex-row md:justify-between">
        <Heading title="Dashboard" />
        <div className="mt-2 sm:mt-0">
          <Link href="/history-orders">
            <Button>Orders History</Button>
          </Link>
        </div>
      </div>

      <div className="mt-4">
        <h3 className="text-xl font-bold">Group Order Available (Today)</h3>
        {groupLists?.length === 0 && (
          <div className="my-10">
            <h3 className="text-xl font-semibold text-gray-500 text-center">
              There is no group order available now.
            </h3>
          </div>
        )}

        <div className="justify-center gap-6 rounded-lg p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {groupLists?.map((group) => (
            <Card key={group.id}>
              <CardHeader>
                <CardTitle
                  style={{
                    height: 24,
                    display: '-webkit-box',
                    overflow: 'hidden',
                    lineHeight: '24px',
                    WebkitBoxOrient: 'vertical',
                    WebkitLineClamp: 1,
                  }}
                  title={group.title}
                >
                  {group.title}
                </CardTitle>
                <CardDescription>Restaurant: {group.restaurant.name}</CardDescription>
                <CardDescription>
                  Store: <strong>{group.Store.name}</strong>
                </CardDescription>
                <CardDescription>
                  Due Time: <strong>{group.dueTime}</strong>
                </CardDescription>
                <CardDescription>
                  Limit: <strong>{group.limit}</strong>
                </CardDescription>
                <CardDescription className="text-md">
                  <strong>{group._count.Orders}</strong> order{group._count.Orders > 1 ? 's' : ''}{' '}
                  being placed here
                </CardDescription>
                <div className="flex flex-row gap-1 flex-wrap">
                  {getListCurrentUser(group.Orders).map((order) => (
                    <div key={order.title}>
                      <Avatar className="w-7 h-7">
                        <AvatarImage
                          src={order.avatarUrl}
                          alt={`${order.title}`}
                          title={order.title}
                        />
                        <AvatarFallback title={order.title}>{order.title.charAt(0)}</AvatarFallback>
                      </Avatar>
                    </div>
                  ))}
                </div>
              </CardHeader>
              <CardFooter className="flex justify-end">
                <Link href={`/order/${group.Store.storeSlug}/group-order/${group.id}`}>
                  <Button>Go to order</Button>
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Client;
