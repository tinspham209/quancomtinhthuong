'use client';

import { CreateInvoice } from '@/components/sheet';
import {
  AspectRatio,
  Button,
  Card,
  CardContent,
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  DataTable,
  Sheet,
  SheetTrigger,
  Skeleton,
} from '@/components/ui';
import { useGetInvoicesById } from '@/queries/invoices';
import { Invoice } from '@/queries/invoices/types';
import { formatMoney, noImageUrl } from '@/utils';
import { PlusCircle } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import React, { useEffect, useMemo, useState } from 'react';
import { invoiceColumns } from './components/columns';

const DonationDetail: React.FC = () => {
  const { donationId } = useParams();
  const [openCreateInvoice, setOpenCreateInvoice] = useState(false);

  // Prevent unnecessary API calls if donationId is undefined
  const { donationInvoice, loading } = useGetInvoicesById({
    donationItemId: donationId,
  });

  const invoiceList = useMemo(() => donationInvoice?.Invoices || [], [donationInvoice]);
  const [invoiceDetail, setInvoiceDetail] = useState<Invoice | null>(null);

  // Update the selected invoice detail when donation data changes
  useEffect(() => {
    if (invoiceList.length > 0) {
      setInvoiceDetail(invoiceList[0]); // Default to the first invoice
    } else {
      setInvoiceDetail(null);
    }
  }, [invoiceList]);

  const handleNextInvoice = () => {
    if (!invoiceDetail) return;
    const currentIndex = invoiceList.findIndex((invoice) => invoice.id === invoiceDetail.id);
    const nextInvoice = invoiceList[currentIndex + 1];
    if (nextInvoice) setInvoiceDetail(nextInvoice);
  };

  const handlePreviousInvoice = () => {
    if (!invoiceDetail) return;
    const currentIndex = invoiceList.findIndex((invoice) => invoice.id === invoiceDetail.id);
    const previousInvoice = invoiceList[currentIndex - 1];
    if (previousInvoice) setInvoiceDetail(previousInvoice);
  };

  if (!donationId) {
    return <div className="p-4">Invalid donation ID</div>;
  }

  if (loading) {
    return <Skeleton className="w-[40px] h-[40px] rounded-full" />;
  }

  return (
    <div className="p-4 pt-8">
      {/* Main content */}
      <div className="flex flex-col-reverse md:flex-row gap-3">
        {/* Invoice Images */}
        <div className="basis-0 md:basis-3/5 flex flex-col gap-5">
          <div className="my-10">
            {invoiceDetail?.imgUrls?.length === 0 ? (
              <div className="">Không có hình ảnh để xem</div>
            ) : (
              <Carousel opts={{ align: 'start' }} orientation="vertical" className="w-full">
                <CarouselContent className="h-[200px] md:h-[460px]">
                  {invoiceDetail?.imgUrls.map((img, index) => (
                    <CarouselItem key={index} className="pt-1 md:basis-1/2">
                      <div>
                        <Card className="border-0">
                          <CardContent>
                            <AspectRatio ratio={16 / 9}>
                              <Image
                                unoptimized
                                src={img || noImageUrl}
                                alt={`${invoiceDetail.title}-${index + 1}`}
                                fill
                                priority
                                style={{ objectFit: 'contain' }}
                              />
                            </AspectRatio>
                          </CardContent>
                        </Card>
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                {(invoiceDetail?.imgUrls?.length || 0) > 1 && (
                  <>
                    <CarouselPrevious />
                    <CarouselNext />
                  </>
                )}
              </Carousel>
            )}
          </div>
        </div>
        {/* Invoice Details */}
        <div className="basis-0 md:basis-2/5">
          <Card className="p-2">
            <CardContent>
              <div className="flex flex-col gap-2">
                <div className="flex gap-3">
                  <Link className="basis-1/4" href={`/donation/${donationId}`}>
                    <Button className="w-full" variant="outline">
                      Quay Lại
                    </Button>
                  </Link>
                  <Button
                    className="basis-1/4"
                    variant="outline"
                    onClick={handlePreviousInvoice}
                    disabled={invoiceList.length <= 1}
                  >
                    Back
                  </Button>
                  <Button
                    className="basis-1/4"
                    variant="outline"
                    onClick={handleNextInvoice}
                    disabled={invoiceList.length <= 1}
                  >
                    Next
                  </Button>
                  <div className="basis-1/4">
                    <Sheet open={openCreateInvoice} onOpenChange={setOpenCreateInvoice}>
                      <SheetTrigger asChild>
                        <Button>
                          <PlusCircle className="mr-2 h-5 w-5" />
                          Invoice
                        </Button>
                      </SheetTrigger>
                      <CreateInvoice
                        donationItemId={donationId}
                        onClose={() => {
                          setOpenCreateInvoice(false);
                        }}
                      />
                    </Sheet>
                  </div>
                </div>
                <div className="flex flex-col gap-1">
                  <p className="text-lg text-muted-foreground">
                    Chi cho: <br />
                    <strong className="text-black"> {invoiceDetail?.title}</strong>
                    <br />
                    Chi tiết: <br />
                    <strong className="text-black"> {invoiceDetail?.description}</strong>
                    <br />
                    Số tiền: <br />
                    <strong className="text-black">
                      {' '}
                      {formatMoney(invoiceDetail?.amount!)} VND
                    </strong>
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      {/* Summary */}
      <div>
        <p className="text-lg font-bold">
          Những thứ đã chi tiền ({invoiceList?.length}) - Tổng{' '}
          {formatMoney(donationInvoice?.donated!)} - Đã Chi {formatMoney(donationInvoice?.spent!)} -
          Còn lại {formatMoney(donationInvoice?.donated! - donationInvoice?.spent!)}
        </p>
        <div className="mt-5">
          <DataTable columns={invoiceColumns()} data={invoiceList} />
        </div>
      </div>
    </div>
  );
};

export default DonationDetail;
