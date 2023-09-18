'use client';

import { CreateRestaurant, DeleteRestaurant } from '@/components/sheet';
import { Button, Sheet, SheetTrigger } from '@/components/ui';
import { Restaurant } from '@/queries/restaurants/types';
import { Pen, Trash } from 'lucide-react';
import React, { useState } from 'react';

interface Props {
  restaurant: Restaurant | undefined;
}

const RestaurantHeader: React.FC<Props> = ({ restaurant }) => {
  const [openUpdateRestaurant, setOpenUpdateRestaurant] = useState(false);

  return (
    <div className="flex flex-col md:flex-row justify-between">
      <div className="flex flex-col">
        <h3 className="text-3xl font-bold leading-none tracking-tight">
          {restaurant?.name || 'Restaurant Detail'}
        </h3>
        {restaurant?.description && (
          <p className="text-xl text-muted-foreground">{restaurant.description}</p>
        )}
      </div>
      <div className="flex gap-2 mt-4 sm:mt-0">
        <div>
          <Sheet open={openUpdateRestaurant} onOpenChange={setOpenUpdateRestaurant}>
            <SheetTrigger asChild>
              <Button>
                <Pen className="mr-2 h-4 w-4" />
                Update Restaurant
              </Button>
            </SheetTrigger>
            <CreateRestaurant
              onClose={() => {
                setOpenUpdateRestaurant(false);
              }}
              isEdit
              restaurant={restaurant}
            />
          </Sheet>
        </div>
        <div>
          <Sheet>
            <SheetTrigger asChild>
              <Button variant={'destructive'}>
                <Trash className="mr-2 h-4 w-4" />
                Delete Restaurant
              </Button>
            </SheetTrigger>
            <DeleteRestaurant restaurant={restaurant} />
          </Sheet>
        </div>
      </div>
    </div>
  );
};

export default RestaurantHeader;
