import {
  FinalizedGroupOrder,
  TriggerDebtGroupOrder,
  TriggerFinalizedGroupOrder,
} from '@/components/sheet';
import {
  Button,
  Heading,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Sheet,
  SheetTrigger,
} from '@/components/ui';
import { useOrigin } from '@/hooks';
import useCopyToClipboard from '@/hooks/use-copy-to-clipboard';
import { Store } from '@/queries/auth/types';
import { GroupOrderDetail } from '@/queries/group-orders/types';
import { SlackWebhook } from '@/queries/slack/types';
import dayjs from 'dayjs';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import React, { useCallback, useState } from 'react';
import toast from 'react-hot-toast';
interface Props {
  order: GroupOrderDetail | undefined;
  store: Store | undefined;
  slackWebhooks: SlackWebhook[];
}

const GroupOrderHeader: React.FC<Props> = ({ order, store, slackWebhooks }) => {
  const origin = useOrigin();
  const [slackWebhookId, setSlackWebhookId] = useState<string | null>(null);
  const [value, copy] = useCopyToClipboard();

  const handleGetLinkOrder = () => {
    const url = `${origin}/order/${store?.storeSlug}/group-order/${order?.id}`;
    copy(url);
    toast.success(
      'Copy Order URL to clipboard successfully. You can post it in your slack channel to start ordering',
    );
  };

  const handleChangeSlackWebhook = useCallback(
    (value: string) => {
      setSlackWebhookId(value);
    },
    [setSlackWebhookId],
  );

  const isFinalizedOrder = order?.finalized;

  return (
    <div className="mb-4">
      <div className="flex flex-col md:flex-row justify-between">
        <div className="flex flex-col">
          <h1 className="text-3xl font-bold leading-none tracking-tight mb-1">
            {order?.title || 'Unknown'}
          </h1>
          {order?.description && (
            <p className="text-xl text-muted-foreground mb-1">{order.description}</p>
          )}
          <p className="text-xl text-muted-foreground">
            Date: {dayjs(order?.createdAt).format('DD-MMM-YYYY')}
          </p>

          <p className="text-xl text-muted-foreground">
            Finalized: {isFinalizedOrder ? 'Yes' : 'No'}
          </p>
        </div>
        <div className="flex flex-row gap-2">
          <div>
            <Link href={`/stores/${order?.storeId}/group-order/${order?.id}/summary`}>
              <Button variant={'outline'}>View Order Summary</Button>
            </Link>
          </div>
          <div>
            <Button variant={'secondary'} onClick={handleGetLinkOrder}>
              Get Link Order
            </Button>
          </div>

          <div>
            <Link href={`/stores/${order?.storeId}/group-order/${order?.id}/orders`}>
              <Button>View All Orders</Button>
            </Link>
          </div>
        </div>
      </div>
      <div className="flex flex-row mt-4 md:mt-0 justify-end gap-2">
        <div>
          <Sheet>
            <SheetTrigger asChild>
              <Button>Finalize</Button>
            </SheetTrigger>
            <FinalizedGroupOrder order={order as GroupOrderDetail} />
          </Sheet>
        </div>
        {isFinalizedOrder && (
          <>
            <div>
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant={'secondary'}>Trigger Finalize</Button>
                </SheetTrigger>
                <TriggerFinalizedGroupOrder slackWebhookId={slackWebhookId} />
              </Sheet>
            </div>
          </>
        )}
        {isFinalizedOrder && (
          <>
            <div>
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant={'outline'}>Trigger Debt</Button>
                </SheetTrigger>
                <TriggerDebtGroupOrder slackWebhookId={slackWebhookId} />
              </Sheet>
            </div>
          </>
        )}
        {isFinalizedOrder && (
          <div className="mt-2 sm:mt-0">
            <div>
              <Select onValueChange={(value: string) => handleChangeSlackWebhook(value)}>
                <SelectTrigger className="w-[200px]">
                  <SelectValue placeholder="Select channel to post *" />
                </SelectTrigger>
                <SelectContent>
                  {slackWebhooks.map((slackWebhook) => (
                    <SelectItem key={slackWebhook.id} value={slackWebhook.id}>
                      {slackWebhook.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default GroupOrderHeader;
