'use client';

import { Button } from '@/components/ui';
import { OrderStatus } from '@/queries/orders/types';
import { CheckCircle2, XCircle } from 'lucide-react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import React, { useEffect, useMemo, useState } from 'react';
import getRandomQuote, { RandomQuote } from './actions';

const DEFAULT_BACKGROUND_IMAGE = 'https://i.imgur.com/d8Vj0Gd.png';

interface Props {}

const OrderCtn: React.FC<Props> = ({}) => {
  const searchParams = useSearchParams();
  const { status, groupOrderId } = useMemo(() => {
    const status = searchParams.get('status') as OrderStatus;
    const groupOrderId = searchParams.get('groupOrderId');

    return { status, groupOrderId };
  }, [searchParams]);
  const [quote, setQuote] = useState<RandomQuote | null>(null);

  const fetchRandomQuote = async () => {
    const randomQuote = await getRandomQuote();
    setQuote(randomQuote);
  };

  useEffect(() => {
    fetchRandomQuote();
  }, []);

  const pageContent = useMemo(() => {
    switch (status) {
      case OrderStatus.PAID:
        return (
          <>
            <CheckCircle2 className="text-green-600 w-12 h-12 animate-bounce animate-infinite" />
            <p className="text-xl text-green-600">Payment Successful!</p>
          </>
        );

      default:
        return (
          <>
            <XCircle className="text-red-500 w-12 h-12 " />
            <p className="text-xl text-red-500">Payment Failed!</p>
          </>
        );
    }
  }, [status]);

  return (
    <div
      className="p-4 flex items-center justify-center h-[94vh] bg-gradient-to-r from-sky-400 via-rose-400 to-lime-400"
      style={{
        backgroundImage: `url('/payment-success.webp')`,
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
      }}
    >
      <div className="py-5 bg-white flex justify-center flex-col items-center gap-4 rounded-lg w-[400px] shadow-2xl opacity-95 relative overflow-hidden border-8 border-orange-200">
        {pageContent}

        {quote && (
          <div className="">
            <div className="h-1 w-[100%] border-b border-dashed border-4">
              <div className="absolute rounded-full w-5 h-5 bg-orange-200 -mt-3 -left-2"></div>
              <div className="absolute rounded-full w-5 h-5 bg-orange-200 -mt-3 -right-2"></div>
            </div>
            <div className="flex justify-center flex-col items-center text-center p-8 pb-4">
              <p className="text-sm text-red-500 font-light text-center animate-bounce animate-infinite">
                Mỗi ngày một câu nói đạo lý
              </p>
              <div className="w-full mb-4">
                <div className="text-3xl text-indigo-500 text-left leading-tight h-3 font-serif">
                  &ldquo;
                </div>
                <p className="text-lg font-medium text-gray-600 text-center px-5">
                  {quote.content}
                </p>
                <div className="text-3xl text-indigo-500 text-right leading-tight h-3 -mt-3 font-serif">
                  &rdquo;
                </div>
              </div>
              <div className="w-full">
                <p className="text-md text-indigo-500 font-bold text-center">{quote.author}</p>
                <p className="text-xs text-gray-500 text-center">@{quote.authorSlug}</p>
              </div>
            </div>
          </div>
        )}
        <div className="h-1 w-[100%] border-b border-dashed border-4">
          <div className="absolute rounded-full w-5 h-5 bg-orange-200 -mt-3 -left-2"></div>
          <div className="absolute rounded-full w-5 h-5 bg-orange-200 -mt-3 -right-2"></div>
        </div>
        <Link href={'/history-orders'}>
          <Button>Go to Order History</Button>
        </Link>
      </div>
    </div>
  );
};

export default OrderCtn;
