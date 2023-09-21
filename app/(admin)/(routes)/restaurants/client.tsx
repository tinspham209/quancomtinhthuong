'use client';

import { CreateRestaurant } from '@/components/sheet';
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
import useCopyToClipboard from '@/hooks/use-copy-to-clipboard';
import { useGetRestaurants } from '@/queries/restaurants';
import { Copy, PlusCircle } from 'lucide-react';
import Link from 'next/link';
import { FC, useState } from 'react';
import toast from 'react-hot-toast';

interface Props {}

const RestaurantsPage: FC<Props> = ({}) => {
  const [value, copy] = useCopyToClipboard();

  const { restaurants } = useGetRestaurants();
  const [openCreateRestaurant, setOpenCreateRestaurant] = useState(false);
  return (
    <div className="p-4">
      <div className="flex flex-col sm:flex-row md:justify-between">
        <h1 className="text-3xl font-bold leading-none tracking-tight">Restaurants</h1>
        <div className="mt-4 sm:mt-0">
          <Sheet open={openCreateRestaurant} onOpenChange={setOpenCreateRestaurant}>
            <SheetTrigger asChild>
              <Button>
                <PlusCircle className="mr-2 h-5 w-5" />
                Create Restaurant
              </Button>
            </SheetTrigger>
            <CreateRestaurant
              onClose={() => {
                setOpenCreateRestaurant(false);
              }}
            />
          </Sheet>
        </div>
      </div>
      <div className="mt-2">
        <div className="justify-center gap-6 rounded-lg p-4 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {restaurants.map((restaurant) => (
            <Card key={restaurant.id}>
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
                  title={restaurant.name}
                >
                  {restaurant.name}
                </CardTitle>
                <CardDescription>{restaurant.description}</CardDescription>
              </CardHeader>
              {/* <CardContent></CardContent> */}
              <CardFooter className="flex justify-end gap-2">
                <Button
                  variant={'outline'}
                  title="Copy Restaurant link"
                  onClick={() => {
                    copy(restaurant.link);
                    toast.success('Copy Restaurant link successfully.');
                  }}
                >
                  <Copy className="w-4 h-4" />
                </Button>
                <Link href={`/restaurants/${restaurant.id}`}>
                  <Button>Go to detail</Button>
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RestaurantsPage;
