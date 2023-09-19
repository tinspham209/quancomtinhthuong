import { CreateGroupOrder } from '@/components/sheet';
import { Button, Sheet, SheetTrigger } from '@/components/ui';
import { PlusCircle } from 'lucide-react';
import React from 'react';

interface Props {
  storeId: string;
}

const GroupOrderHeader: React.FC<Props> = ({ storeId }) => {
  return (
    <div className="my-4">
      <div className="flex flex-col md:flex-row justify-between">
        <h1 className="text-3xl font-bold leading-none tracking-tight">Group Orders</h1>
        <div className="mt-2 sm:mt-0">
          <Sheet>
            <SheetTrigger asChild>
              <Button>
                <PlusCircle className="mr-2 h-5 w-5" />
                Create Group Order
              </Button>
            </SheetTrigger>
            <CreateGroupOrder storeId={storeId} />
          </Sheet>
        </div>
      </div>
    </div>
  );
};

export default GroupOrderHeader;
