'use client';

import { DishPayload } from '@/lib/validators';
import { Callback } from '@/queries/auth/types';
import { useEnableDisableDishes, useUpdateDish } from '@/queries/dishes';
import { Dish } from '@/queries/dishes/types';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import { Button, SheetClose, SheetContent, SheetHeader, SheetTitle } from '../../ui';
import * as Switch from '@radix-ui/react-switch';
import { useFetchCache } from '@/queries/cache';
import './styles.css';
const NAME_LENGTH = 25;
const getDishName = (name: string) => {
  const length = name.length;
  return length > NAME_LENGTH ? `${name.substring(0, NAME_LENGTH)}...` : name;
};

interface Props {
  onClose: Callback;
  dishes: Dish[];
  restaurantId: string;
}

const UpdateDishes: React.FC<Props> = ({ dishes: data, restaurantId }) => {
  const [dishes, setDishes] = useState<Props['dishes']>([]);
  const [disableAll, setDisableAll] = useState(false);

  const { fetchCache, loading } = useFetchCache({
    onSuccess() {
      toast.success(`Update dishes successfully.`);

      setTimeout(() => {
        window.location.reload();
      }, 500);
    },
    onError(error) {
      toast.error(error.message);
    },
  });

  const { enableDisableDishes, isLoading } = useEnableDisableDishes({
    onSuccess() {
      fetchCache();
    },
    onError(error) {
      toast.error(error.message);
    },
  });

  const onSubmit = async () => {
    const disableIds = dishes.filter((dish) => dish.disable).map((dish) => dish.id!);
    return await enableDisableDishes({ restaurantId, ids: disableIds });
  };

  const onChange = (checked: boolean, dish: Dish) => {
    const newDishes = dishes.map((d) => (d.id === dish.id ? { ...d, disable: !checked } : d));
    setDishes(newDishes);
  };

  const onDisableAll = (e: boolean) => {
    const newDishes = dishes.map((dish) => ({ ...dish, disable: e }));
    const sorted = newDishes?.sort((a, b) => (a.name > b.name ? 1 : b.name > a.name ? -1 : 0));
    setDishes(sorted);
    setDisableAll(e);
  };

  useEffect(() => {
    const sorted = data?.sort((a, b) => (a.name > b.name ? 1 : b.name > a.name ? -1 : 0));
    setDishes(sorted);
  }, [data]);

  return (
    <SheetContent>
      <SheetHeader>
        <div>
          <SheetTitle>Enable/Disable dishes</SheetTitle>
          <div className="flex flex-row space-x-2 py-2">
            <div>
              <Switch.Root
                className="SwitchRoot"
                onCheckedChange={(e) => onDisableAll(e)}
                checked={disableAll}
              >
                <Switch.Thumb className="SwitchThumb" />
              </Switch.Root>
            </div>
            <div>
              <label className="Label font-medium">Disable all</label>
            </div>
          </div>
        </div>
      </SheetHeader>

      <div className="max-h-[75vh] overflow-y-auto">
        <div className="flex flex-col space-y-2 pt-2">
          {dishes?.map((dish) => (
            <div key={dish.id} className="flex flex-row space-x-2 max-w-[100vw]">
              <div>
                <Switch.Root
                  className="SwitchRoot"
                  onCheckedChange={(e) => onChange(e, dish)}
                  checked={!dish.disable}
                >
                  <Switch.Thumb className="SwitchThumb" />
                </Switch.Root>
              </div>
              <div>
                <label className="Label">
                  {getDishName(dish.name)}, {dish.price}
                </label>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="pt-3">
        <Button className="w-11/12" onClick={() => onSubmit()} disabled={loading || isLoading}>
          Update
        </Button>
      </div>
    </SheetContent>
  );
};

export default UpdateDishes;
