import { Button, SheetContent, SheetHeader, SheetTitle } from '@/components/ui';
import { useTriggerDebtGroupOrder } from '@/queries/group-orders';
import { useParams } from 'next/navigation';
import React from 'react';
import { toast } from 'react-hot-toast';

interface Props {
  slackWebhookId: string | null;
}

const TriggerDebtGroupOrder: React.FC<Props> = ({ slackWebhookId }) => {
  const { storeId, groupOrderId } = useParams();

  const { triggerDebtGroupOrder, isLoading } = useTriggerDebtGroupOrder({
    onSuccess() {
      toast.success('Trigger Debt Group Order successfully.');
    },
    onError(error) {
      toast.error(error.message);
    },
  });

  const handleTrigger = () => {
    triggerDebtGroupOrder({
      storeId,
      groupOrderId,
      slackWebhookId,
    });
  };

  return (
    <SheetContent>
      <SheetHeader>
        <SheetTitle>Trigger Debt Group Order</SheetTitle>
      </SheetHeader>
      <h2 className="my-6 text-xl">Are you sure you want to trigger debt this group order?</h2>
      <Button type="button" onClick={handleTrigger} disabled={isLoading}>
        Trigger Debt
      </Button>
    </SheetContent>
  );
};

export default TriggerDebtGroupOrder;
