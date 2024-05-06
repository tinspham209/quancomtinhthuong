'use client';

import NoSsr from '@/components/no-ssr';
import {
  Badge,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
  Button,
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
  Progress,
} from '@/components/ui';
import { useProfileStore } from '@/hooks';
import { MakeDonationPayload, MakeDonationSchema } from '@/lib/validators/donations';
import { useGetDonationById, useMakeDonation } from '@/queries/donations';
import { formatMoney } from '@/utils';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import React, { useEffect, useMemo } from 'react';
import { FieldErrors, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
interface Props {}

const OrdersOfGroupOrders: React.FC<Props> = ({}) => {
  const { donationId } = useParams();

  const { donationDetail, loading } = useGetDonationById({
    donationId: Number(donationId),
  });

  const { profile } = useProfileStore();

  const form = useForm<MakeDonationPayload>({
    resolver: zodResolver(MakeDonationSchema),
    defaultValues: {
      userId: profile?.id,
      donationId: donationId,
      storeSlug: 'dongkyorder',
      donationAmount: 0,
      comment: '',
    },
  });

  useEffect(() => {
    if (donationDetail) {
      form.reset({
        userId: profile?.id,
        donationId: donationId,
        storeSlug: donationDetail.storeSlug,
        donationAmount: 0,
        comment: '',
      });
    }
  }, [donationDetail, donationId, form, profile?.id]);

  const { makeDonation, isLoading: loadingMakeDonation } = useMakeDonation();

  const onSubmit = (values: MakeDonationPayload) => {
    makeDonation(values, {
      onSuccess(data, variables, context) {
        const paymentLink = data?.donationLink;
        if (paymentLink) {
          window.open(paymentLink, '_self');
        } else {
          toast.error('Có lỗi xảy ra, vui lòng thử lại sau.');
          setTimeout(() => {
            window.location.reload();
          }, 2000);
        }
      },
      onError(error) {
        toast.error(error.message);
      },
    });
  };

  const onInvalidSubmit = (formErrors: FieldErrors<MakeDonationPayload>) => {
    console.log('formErrors: ', formErrors);
    toast.error('Có lỗi xảy ra, vui lòng thử lại sau.');
  };

  const getProgress = () => {
    if (donationDetail?.donationTarget && donationDetail?.donated) {
      return (donationDetail.donated / donationDetail.donationTarget) * 100;
    }
    return 0;
  };

  const isLoading = useMemo(() => {
    return loading || loadingMakeDonation;
  }, [loading, loadingMakeDonation]);

  return (
    <div className="flex items-center justify-center h-full pt-4 mx-4">
      <NoSsr>
        <div>
          <Breadcrumb className="mb-2">
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/donation">Quyên góp</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink href={`/donation/${donationId}`}>
                  {donationDetail?.title.slice(0, 10)}...{donationDetail?.title.slice(-10, -1)}
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />

              <BreadcrumbItem>
                <BreadcrumbPage>Ủng hộ</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          <Card>
            <CardHeader>
              <CardTitle>{donationDetail?.title || 'Ủng hộ cho chiến dịch'}</CardTitle>
              <CardContent className="px-0 py-2">
                <p className="text-lg text-muted-foreground mb-2">
                  Mục tiêu chiến dịch:{' '}
                  <strong className="text-black">
                    {formatMoney(donationDetail?.donationTarget as number) || 0} VND
                  </strong>
                </p>
                <div className="flex flex-col gap-2">
                  <Progress value={getProgress()} className="bg-slate-500" />
                  <p className="text-lg text-muted-foreground">
                    Đã đạt được:{' '}
                    <strong className="text-black">
                      {formatMoney(donationDetail?.donated as number)} VND ({getProgress()}%)
                    </strong>
                  </p>
                </div>
              </CardContent>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit, onInvalidSubmit)}
                  className="gap-4 flex flex-col"
                >
                  <FormField
                    control={form.control}
                    name="donationAmount"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Nhập số tiền ủng hộ *</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Input
                              placeholder="Nhập số tiền ủng hộ "
                              type="number"
                              {...field}
                              onChange={(e) => {
                                form.setValue('donationAmount', Number(e.target.value));
                              }}
                            />
                            <span className="absolute right-2 top-1/2 transform -translate-y-1/2">
                              VND
                            </span>
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div className="flex flex-row flex-wrap gap-2">
                    {[10, 20, 30, 50, 100].map((amount) => (
                      <Badge
                        onClick={() => {
                          form.setValue('donationAmount', Number(`${amount}000`));
                        }}
                        className="cursor-pointer h-8 hover:bg-blue-500 hover:text-white transition-colors"
                        key={amount}
                      >
                        {formatMoney(Number(`${amount}000`))}
                      </Badge>
                    ))}
                  </div>

                  <FormField
                    control={form.control}
                    name="comment"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Lời chúc</FormLabel>
                        <FormControl>
                          <Input placeholder="Nhập lời chúc trao gửi yêu thương" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button type="submit" disabled={isLoading}>
                    Ủng hộ
                  </Button>
                </form>
              </Form>
            </CardContent>
            <CardFooter className="flex flex-col">
              <div className="flex flex-row flex-wrap">
                <p className="text-sm mr-2">Bằng việc ủng hộ, bạn đã đồng ý với </p>
                <Link
                  href={`#`}
                  className="text-sm font-medium transition-colors hover:text-blue-500"
                  onClick={() => {
                    toast.error('Chưa viết kịp, từ từ sau rùi đọc ha.');
                  }}
                >
                  Điều khoản sử dụng
                </Link>
              </div>
            </CardFooter>
          </Card>
        </div>
      </NoSsr>
    </div>
  );
};

export default OrdersOfGroupOrders;
