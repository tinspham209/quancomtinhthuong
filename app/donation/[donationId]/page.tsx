'use client';

import JsonView from '@/components/json-view';
import {
  Button,
  Card,
  CardContent,
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  Progress,
} from '@/components/ui';
import { useGetDonationById } from '@/queries/donations';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import React from 'react';
import { formatMoney, noImageUrl } from '@/utils';
import dayjs from 'dayjs';

interface DonationDetailProps {}

const DonationDetail: React.FC<DonationDetailProps> = ({}) => {
  const { donationId } = useParams();
  const { donationDetail } = useGetDonationById({
    donationId: Number(donationId),
  });

  const getDueDate = () => {
    if (donationDetail?.dueDate) {
      const dueDate = dayjs().add(donationDetail.dueDate, 'milliseconds');
      const diff = dueDate.diff(dayjs(), 'day');
      return `${diff} ngày (${dueDate.format('DD/MM/YYYY')})`;
    }
    return 'Unknown';
  };

  const getProgress = () => {
    if (donationDetail?.donationTarget && donationDetail?.donated) {
      return (donationDetail.donated / donationDetail.donationTarget) * 100;
    }
    return 0;
  };

  return (
    <div className="p-4 pt-8">
      <div className="flex flex-col-reverse md:flex-row gap-3">
        <div className="basis-0 md:basis-3/5 flex flex-col gap-5">
          <div className="my-10">
            <Carousel
              opts={{
                align: 'start',
              }}
              orientation="vertical"
              className="w-full"
            >
              <CarouselContent className="h-[200px] md:h-[450px]">
                {donationDetail?.imgUrls.map((img, index) => (
                  <CarouselItem key={index} className="pt-1 md:basis-1/2">
                    <div>
                      <Card className="border-0">
                        <CardContent>
                          <div className="w-[300px] h-[200px] md:w-[600px] md:h-[424px] relative">
                            <Image
                              unoptimized
                              src={img || noImageUrl}
                              alt={`${donationDetail.title}-${index + 1}`}
                              fill
                              priority
                              style={{ objectFit: 'contain' }}
                            />
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              {(donationDetail?.imgUrls?.length || 0) > 1 && (
                <>
                  <CarouselPrevious />
                  <CarouselNext />
                </>
              )}
            </Carousel>
          </div>
        </div>
        <div className="basis-0 md:basis-2/5">
          <Card className="p-2">
            <CardContent>
              <div className="flex flex-col gap-2">
                <div className="flex flex-col gap-1">
                  <p className="text-lg text-muted-foreground">
                    Câu chuyện: <br />
                    <strong className="text-black"> {donationDetail?.title}</strong>
                    <br />
                    <span className="text-muted-foreground">{donationDetail?.description}</span>
                  </p>
                  <p className="text-lg text-muted-foreground">
                    Mục tiêu chiến dịch:
                    <br />
                    <strong className="text-black">
                      {formatMoney(donationDetail?.donationTarget as number) || 0} VND
                    </strong>
                  </p>
                  <p className="text-lg text-muted-foreground">
                    Thời gian còn lại:
                    <br /> <strong className="text-black">{getDueDate()}</strong>
                  </p>
                </div>
                <div className="flex flex-col gap-2 my-3">
                  <Progress value={getProgress()} />
                  <p className="text-lg text-muted-foreground">
                    Đã đạt được:{' '}
                    <strong className="text-black">
                      {formatMoney(donationDetail?.donated as number)} VND ({getProgress()}%)
                    </strong>
                  </p>
                </div>
                <div className="flex gap-3">
                  <Button className="basis-1/2" variant="outline">
                    Chia sẻ
                  </Button>
                  <Button className="basis-1/2">Ủng hộ</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      <JsonView src={donationDetail} />

      <div className="mt-10" />
    </div>
  );
};

export default DonationDetail;
