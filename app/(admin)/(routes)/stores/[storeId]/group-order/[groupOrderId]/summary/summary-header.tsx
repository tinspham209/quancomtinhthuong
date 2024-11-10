import { TriggerDebtGroupOrder, TriggerFinalizedGroupOrder } from '@/components/sheet';
import {
  Button, Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue, Sheet, SheetTrigger
} from '@/components/ui';
import { GroupOrderSummary } from '@/queries/group-orders/types';
import { SlackWebhook } from '@/queries/slack/types';
import Link from 'next/link';
import React, { useCallback, useState } from 'react';
interface Props {
  summary: GroupOrderSummary | undefined;
  slackWebhooks: SlackWebhook[];
}

const SummaryHeader: React.FC<Props> = ({ summary, slackWebhooks }) => {
  const [slackWebhookId, setSlackWebhookId] = useState<string | null>(null);
  const handleChangeSlackWebhook = useCallback(
    (value: string) => {
      setSlackWebhookId(value);
    },
    [setSlackWebhookId],
  );
  const isFinalizedOrder = summary?.finalized;

  return (
    <div className="mb-4">
      <div className="flex flex-col md:flex-row justify-between">
        <div className="flex flex-col">
          <h1 className="text-3xl font-bold leading-none tracking-tight mb-1">
            {summary?.restaurant.name || 'Unknown'}
          </h1>
          <div className="flex flex-row gap-2 items-center">
            <p className="text-md text-muted-foreground">Restaurant Link: </p>
            <Link
              className="text-md"
              href={summary?.restaurant.link || '/'}
              target="_blank"
              rel="noopener noreferrer"
            >
              Open link
            </Link>
          </div>

          <p className="text-md text-muted-foreground">Limit: {summary?.limit || 'Unlimited'}</p>
          <p className="text-md text-muted-foreground">Due Time: {summary?.dueTime || 'Unknown'}</p>
          <p className="text-md text-muted-foreground">
            Finalized: {summary?.finalized ? 'Yes' : 'No'}
          </p>
        </div>
        <div className="flex flex-row gap-2 mt-2 sm:mt-0">
          <div>
            <Button
              variant={'secondary'}
              onClick={() => {
                window.location.reload();
              }}
            >
              Refresh
            </Button>
          </div>
          <div>
            <Link href={`/stores/${summary?.Store.id}/group-order/${summary?.id}`}>
              <Button>View Group Order Detail</Button>
            </Link>
          </div>
        </div>
      </div>
      <div className="flex flex-row justify-end gap-2">
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
                  <Button>Trigger Debt</Button>
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

export default SummaryHeader;
