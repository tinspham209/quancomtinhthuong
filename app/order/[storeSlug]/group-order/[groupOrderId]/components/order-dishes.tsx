'use client';

import { CreateOrder } from '@/components/sheet';
import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  Sheet,
  SheetTrigger,
} from '@/components/ui';
import MyTooltip from '@/components/ui/my-tooltip';
import { cn } from '@/lib/utils';
import { Dish } from '@/queries/dishes/types';
import { noImageUrl } from '@/utils';
import { Plus, PlusCircle } from 'lucide-react';
import Image from 'next/image';
import React, { useMemo } from 'react';

interface Props {
  dishes: Dish[] | undefined;
  storeId: string;
  groupOrderId: string;
  isFinalized: boolean;
}

const OrderDishesCtn: React.FC<Props> = ({ dishes, storeId, groupOrderId, isFinalized }) => {
  const dishesByCategory = useMemo(() => {
    if (!dishes) return [];

    const groupedItems: {
      groupTitle: string;
      data: Dish[];
    }[] = [];

    dishes.forEach((dish: Dish) => {
      const category = dish.category || 'No Category';
      let group = groupedItems.find((group) => group.groupTitle === category);

      if (!group) {
        group = { groupTitle: category, data: [] };
        groupedItems.push(group);
      }

      group.data.push(dish);
    });

    const groupCategory = groupedItems.map((group) => group.groupTitle);

    return groupedItems;
  }, [dishes]);

  return (
    <div className="flex flex-col mt-4">
      <div className="justify-center gap-6 rounded-lg p-1 sm:p-4">
        {dishesByCategory.map((category) => {
          return (
            <div key={category.groupTitle}>
              <h2 className="text-2xl font-bold leading-none tracking-tight my-4">
                {category.groupTitle}
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-6 gap-3 sm:gap-6 rounded-lg">
                {category.data.map((dish) => (
                  <Card
                    key={dish.id}
                    className={cn('', {
                      'opacity-50': dish.disable || isFinalized,
                    })}
                  >
                    <CardHeader className="p-2 sm:p-4 sm:pb-2">
                      <MyTooltip title={dish.name}>
                        <CardTitle
                          style={{
                            height: 48,
                            display: '-webkit-box',
                            overflow: 'hidden',
                            lineHeight: '24px',
                            WebkitBoxOrient: 'vertical',
                            WebkitLineClamp: 2,
                          }}
                        >
                          {dish.name}
                        </CardTitle>
                      </MyTooltip>
                      <CardDescription>
                        {dish?.description && (
                          <>
                            <b>Description:</b> {dish.description} <br />
                          </>
                        )}

                        {dish.additional && (
                          <>
                            <b>Additional:</b> true <br />
                          </>
                        )}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="p-2 sm:p-4 sm:pb-0">
                      <div className="w-[100%] h-[150px] sm:h-[200px] relative border-zinc-300 border border-solid rounded-lg">
                        <Image
                          unoptimized
                          src={dish.imgUrl || noImageUrl}
                          alt={`${dish.category}-${dish.name}`}
                          fill
                          priority
                          style={{ objectFit: 'cover', borderRadius: '7px' }}
                        />
                      </div>
                      <p className="text-xl font-semibold mt-2">
                        {new Intl.NumberFormat().format(dish.price)}đ
                      </p>
                    </CardContent>
                    <CardFooter className="flex justify-between gap-2 p-2 sm:p-4">
                      <div>{dish?.disable && <b>Disabled</b>}</div>
                      <div>
                        <Sheet>
                          <SheetTrigger asChild>
                            <Button disabled={dish?.disable || isFinalized}>
                              <PlusCircle className="h-4 w-4" />
                            </Button>
                          </SheetTrigger>
                          <CreateOrder dish={dish} groupOrderId={groupOrderId} />
                        </Sheet>
                      </div>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default OrderDishesCtn;
