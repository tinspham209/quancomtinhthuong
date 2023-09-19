import { Button, SheetContent, SheetHeader, SheetTitle } from '@/components/ui';
import { useTriggerFinalizedGroupOrder } from '@/queries/group-orders';
import { useParams } from 'next/navigation';
import React from 'react';
import { toast } from 'react-hot-toast';

interface Props {}

const TriggerFinalizedGroupOrder: React.FC<Props> = () => {
  const { storeId, groupOrderId } = useParams();

  const { triggerFinalizedGroupOrder, isLoading } = useTriggerFinalizedGroupOrder({
    onSuccess() {
      toast.success('Trigger Finalize Group Order successfully.');
    },
    onError(error) {
      toast.error(error.message);
    },
  });

  const handleTrigger = () => {
    triggerFinalizedGroupOrder({
      storeId,
      groupOrderId,
    });
  };

  return (
    <SheetContent>
      <SheetHeader>
        <SheetTitle>Trigger Finalized Group Order</SheetTitle>
      </SheetHeader>
      <h2 className="my-6 text-xl">Are you sure you want to trigger finalized this group order?</h2>
      <Button type="button" onClick={handleTrigger} disabled={isLoading}>
        Trigger Finalize
      </Button>
    </SheetContent>
  );
};

export default TriggerFinalizedGroupOrder;
