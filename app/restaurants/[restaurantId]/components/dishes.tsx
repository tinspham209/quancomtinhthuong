'use client';

import { CreateDishes, DeleteDish, UpdateDish } from '@/components/sheet';
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
import { cn } from '@/lib/utils';
import { Dish } from '@/queries/dishes/types';
import { noImageUrl } from '@/utils';
import { Pen, PlusCircle, Trash } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import React, { useMemo, useState } from 'react';

interface Props {
  dishes: Dish[] | undefined;
  restaurantId: string;
  isShowEdit?: boolean;
}

const DishesCtn: React.FC<Props> = ({ dishes, restaurantId, isShowEdit = true }) => {
  const [categories, setCategories] = useState<string[]>([]);
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
    setCategories(groupCategory);

    return groupedItems;
  }, [dishes]);

  const [openCreateDishes, setOpenCreateDishes] = useState(false);

  return (
    <div className="flex flex-col mt-4">
      <div className="flex flex-row justify-between">
        <h3 className="text-3xl font-bold leading-none tracking-tight"></h3>
        <div className="flex gap-2 mt-4 sm:mt-0">
          <div>
            {isShowEdit ? (
              <Sheet open={openCreateDishes} onOpenChange={setOpenCreateDishes}>
                <SheetTrigger asChild>
                  <Button>
                    <PlusCircle className="mr-2 h-5 w-5" />
                    Create Dish
                  </Button>
                </SheetTrigger>
                <CreateDishes
                  onClose={() => {
                    setOpenCreateDishes(false);
                  }}
                  categories={categories}
                  restaurantId={restaurantId}
                />
              </Sheet>
            ) : (
              <Link href={`/restaurants/${restaurantId}`}>
                <Button>Edit Restaurant</Button>
              </Link>
            )}
          </div>
        </div>
      </div>
      <div className="justify-center gap-6 rounded-lg p-1 sm:p-4">
        {dishesByCategory.map((category) => {
          return (
            <div key={category.groupTitle}>
              <h2 className="text-2xl font-bold leading-none tracking-tight my-4">
                {category.groupTitle}
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-6 gap-3 sm:gap-6 rounded-lg">
                {category.data.map((dish) => (
                  <Card key={dish.id} className="">
                    <CardHeader className="p-2 sm:p-4 sm:pb-2">
                      <CardTitle
                        style={{
                          height: 48,
                          display: '-webkit-box',
                          overflow: 'hidden',
                          lineHeight: '24px',
                          WebkitBoxOrient: 'vertical',
                          WebkitLineClamp: 2,
                          opacity: dish.disable ? '0.5' : 1,
                        }}
                        title={dish.name}
                      >
                        {dish.name}
                      </CardTitle>
                      <CardDescription>
                        {dish?.description && (
                          <>
                            <b>Description:</b> {dish.description} <br />
                          </>
                        )}
                        {dish?.disable && (
                          <>
                            <b>Disable:</b> true <br />
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
                      <div
                        className={cn(
                          'w-[100%] h-[150px] sm:h-[200px] relative border-zinc-300 border border-solid rounded-lg',
                          {
                            'opacity-50': dish.disable,
                          },
                        )}
                      >
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
                        {new Intl.NumberFormat().format(dish.price)}VND
                      </p>
                    </CardContent>
                    <CardFooter className="flex justify-end gap-2 p-2 sm:p-4">
                      {isShowEdit && (
                        <>
                          <div>
                            <Sheet>
                              <SheetTrigger asChild>
                                <Button title="Edit">
                                  <Pen className="h-4 w-4" />
                                </Button>
                              </SheetTrigger>
                              <UpdateDish dish={dish} />
                            </Sheet>
                          </div>
                          <div>
                            <Sheet>
                              <SheetTrigger asChild>
                                <Button title="Delete" variant={'destructive'}>
                                  <Trash className="h-4 w-4" />
                                </Button>
                              </SheetTrigger>
                              <DeleteDish dish={dish} />
                            </Sheet>
                          </div>
                        </>
                      )}
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

export default DishesCtn;
