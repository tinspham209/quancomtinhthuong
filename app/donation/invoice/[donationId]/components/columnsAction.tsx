'use client';

import { DeleteInvoice, UpdateInvoice } from '@/components/sheet';
import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  Sheet,
  SheetTrigger,
} from '@/components/ui';
import { useProfileStore } from '@/hooks';
import { Invoice } from '@/queries/invoices/types';
import { MoreHorizontal } from 'lucide-react';
import { useMemo } from 'react';

interface ColumnsActionProps {
  record: Invoice;
}

const ColumnsAction = ({ record }: ColumnsActionProps) => {
  const { profile } = useProfileStore();

  const isAdmin = useMemo(() => profile?.role.name === 'ADMIN', [profile]);
  const isEditable = useMemo(() => profile?.id === record.User.id, [profile, record]);
  const canPerformActions = isAdmin || isEditable;

  return (
    <div>
      {canPerformActions && (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0" title="More">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuSeparator />

            {/* Edit Action */}
            <Sheet>
              <SheetTrigger asChild>
                <DropdownMenuLabel className="cursor-pointer font-normal hover:bg-accent rounded-sm">
                  Edit Invoice
                </DropdownMenuLabel>
              </SheetTrigger>
              <UpdateInvoice invoice={record} />
            </Sheet>

            {/* Delete Action */}
            <Sheet>
              <SheetTrigger asChild>
                <DropdownMenuLabel className="cursor-pointer font-normal text-red-500 hover:bg-accent rounded-sm">
                  Delete Invoice
                </DropdownMenuLabel>
              </SheetTrigger>
              <DeleteInvoice invoice={record} />
            </Sheet>
          </DropdownMenuContent>
        </DropdownMenu>
      )}
    </div>
  );
};

export default ColumnsAction;
