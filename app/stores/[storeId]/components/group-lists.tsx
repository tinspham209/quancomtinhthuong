'use client';
import { DeleteGroupOrder, UpdateGroupOrder } from '@/components/sheet';
import {
  Button,
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  Sheet,
  SheetTrigger,
} from '@/components/ui';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { GroupOrderList } from '@/queries/group-orders/types';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import { Pen, Trash } from 'lucide-react';
import Link from 'next/link';
import React from 'react';
import GroupOrderHeader from './group-order-header';

dayjs.extend(customParseFormat);

interface Props {
  groupLists: GroupOrderList | undefined;
  storeId: string;
}

const GroupLists: React.FC<Props> = ({ groupLists, storeId }) => {
  return (
    <div className="mt-4">
      <GroupOrderHeader storeId={storeId} />
      <Tabs defaultValue={`0`}>
        <TabsList>
          {groupLists?.dateTabs.map((tab, index) => (
            <TabsTrigger value={`${index}`} key={index}>
              {tab ? dayjs(tab, 'MM-DD-YYYY').format('DD-MMM-YYYY') : 'Unknown'}
            </TabsTrigger>
          ))}
        </TabsList>
        {groupLists?.groupOrders.map((group, index) => (
          <TabsContent value={`${index}`} key={index}>
            <div className="justify-center gap-6 rounded-lg p-4 grid grid-cols1 md:grid-cols-3 lg:grid-cols-4">
              {group.map((order, index) => (
                <Card key={order.id}>
                  <CardHeader>
                    <CardTitle
                      style={{
                        height: 48,
                        display: '-webkit-box',
                        overflow: 'hidden',
                        lineHeight: '24px',
                        WebkitBoxOrient: 'vertical',
                        WebkitLineClamp: 2,
                      }}
                      title={order.title}
                    >
                      {order.title}
                    </CardTitle>
                    <CardDescription>
                      {order.description && (
                        <>
                          <b>Description:</b> {order.description}
                          <br />
                        </>
                      )}
                      <b>Restaurant:</b> {order.restaurant.name}
                      <br />
                      <b>Discount:</b> {order.discount}
                      <br />
                      <b>Limit:</b> {order.limit}
                    </CardDescription>
                  </CardHeader>
                  <CardFooter className="flex flex-col sm:flex-row items-start sm:items-center justify-start sm:justify-between">
                    <div className="flex gap-1">
                      <Sheet>
                        <SheetTrigger asChild>
                          <Button variant={'outline'} title="Edit Group Order">
                            <Pen className="w-4 h-4" />
                          </Button>
                        </SheetTrigger>
                        <UpdateGroupOrder order={order} />
                      </Sheet>

                      <Sheet>
                        <SheetTrigger asChild>
                          <Button variant={'destructive'} title="Delete Group Order">
                            <Trash className="w-4 h-4" />
                          </Button>
                        </SheetTrigger>
                        <DeleteGroupOrder order={order} />
                      </Sheet>
                    </div>
                    <Link
                      href={`/stores/${order.storeId}/group-order/${order.id}`}
                      className="mt-2 sm:mt-0 ml-auto"
                    >
                      <Button>Go to detail</Button>
                    </Link>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};

export default GroupLists;
