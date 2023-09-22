'use client';

import { OrderStatus } from '@/queries/orders/types';
import React from 'react';
import { Badge } from './ui';

interface Props {
  status: OrderStatus;
  isShowAnimation?: boolean;
}

const BadgeStatus: React.FC<Props> = ({ status, isShowAnimation = false }) => {
  if (status === OrderStatus.NOPE)
    return (
      <div className={isShowAnimation ? 'animate-jump animate-infinite animate-ease-in-out' : ''}>
        <Badge variant={'destructive'}>{status}</Badge>
      </div>
    );

  return (
    <div className="">
      <Badge variant={'success'}>{status}</Badge>
    </div>
  );
};

export default BadgeStatus;
