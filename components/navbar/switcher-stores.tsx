import { Store } from '@/queries/auth/types';
import { PopoverTriggerProps } from '@radix-ui/react-popover';
import { useParams, useRouter } from 'next/navigation';
import React, { useEffect, useMemo, useState } from 'react';
import {
  Button,
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Sheet,
  SheetTrigger,
} from '../ui';
import { cn } from '@/lib/utils';
import { Check, ChevronsUpDown, PlusCircle, StoreIcon } from 'lucide-react';
import { useProfileStore } from '@/hooks';
import { CreateStore } from '../sheet';
import { useGetStoresByUserName } from '@/queries/stores';

interface StoreSwitcherProps extends PopoverTriggerProps {}

const StoreSwitcher: React.FC<StoreSwitcherProps> = ({ className }) => {
  const params = useParams();
  const router = useRouter();

  const { profile } = useProfileStore();

  const { storesByUserName, loading } = useGetStoresByUserName({
    userName: profile?.userName || '',
  });

  const stores = useMemo(() => {
    if (!storesByUserName) return [];
    return storesByUserName;
  }, [storesByUserName]);

  const formattedItems = React.useMemo(() => {
    if (!stores) return [];
    return stores.map((item) => ({
      label: item.name,
      value: item.id,
    }));
  }, [stores]);

  const currentStore = React.useMemo(() => {
    return formattedItems.find((item) => item.value === params.storeId);
  }, [formattedItems, params.storeId]);

  const [openPopover, setOpenPopover] = useState(false);

  const onStoreSelect = (store: { value: string; label: string }) => {
    setOpenPopover(false);
    router.push(`/stores/${store.value}`);
  };

  const [openCreateStore, setOpenCreateStore] = useState(false);
  const handleOpenCreateStore = (open: boolean) => {
    setOpenCreateStore(open);
  };

  return (
    <Popover open={openPopover} onOpenChange={setOpenPopover}>
      <PopoverTrigger asChild disabled={loading}>
        <Button
          variant={'outline'}
          size={'sm'}
          role="combobox"
          aria-expanded={openPopover}
          aria-label="Select a store"
          className={cn('w-[120px] sm:w-[200px] justify-between', className)}
        >
          <StoreIcon className="mr-2 h-4 w-4" />
          <p className="whitespace-nowrap">{currentStore?.label}</p>
          <ChevronsUpDown className="ml-auto h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandList>
            <CommandInput placeholder="Search store..." />
            <CommandEmpty>No store found</CommandEmpty>
            <CommandGroup heading="Stores">
              {formattedItems.map((store, index) => (
                <CommandItem
                  key={store.value}
                  onSelect={() => onStoreSelect(store)}
                  className="text-sm cursor-pointer"
                >
                  <StoreIcon className="mr-2 h-4 w-4" />
                  {store.label}
                  <Check
                    className={cn(
                      'ml-auto h-4 w-4',
                      currentStore?.value === store.value ? 'opacity-100' : 'opacity-0',
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
          <CommandSeparator />
          <CommandList>
            <CommandGroup>
              <CommandItem
                // onSelect={() => {
                // 	setOpenPopover(false);
                // }}
                className="cursor-pointer"
              >
                <Sheet open={openCreateStore} onOpenChange={setOpenCreateStore}>
                  <SheetTrigger className="flex">
                    <PlusCircle className="mr-2 h-5 w-5" />
                    Create Store
                  </SheetTrigger>
                  <CreateStore
                    onClose={() => {
                      setOpenPopover(false);
                      handleOpenCreateStore(false);
                    }}
                  />
                </Sheet>
              </CommandItem>
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default StoreSwitcher;
