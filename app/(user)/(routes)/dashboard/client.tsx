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
import Link from 'next/link';
import React from 'react';

interface Props {}

const Client: React.FC<Props> = ({}: Props) => {
  const { groupLists } = useGetGroupOrders();

  return (
    <div className="p-4">
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
                <CardDescription>Store: {group.Store.name}</CardDescription>
                <CardDescription>Due Time: {group.dueTime}</CardDescription>
                <CardDescription>Limit: {group.limit}</CardDescription>
                <CardDescription>
                  {group._count.Orders} user{group._count.Orders > 1 ? 's' : ''} ordering here
                </CardDescription>
                <div className="flex flex-row gap-1 flex-wrap">
                  {group.Orders.map((order) => (
                    <div key={order.id}>
                      <Avatar className="w-5 h-5">
                        <AvatarImage
                          src={order.User.imgUrl}
                          alt={`${order.User.userName}`}
                          title={order.User.userName}
                        />
                        <AvatarFallback title={order.User.userName}>
                          {order.User.userName.charAt(0)}
                        </AvatarFallback>
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
