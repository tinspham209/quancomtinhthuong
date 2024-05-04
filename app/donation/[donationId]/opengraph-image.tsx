/* eslint-disable @next/next/no-img-element */
import { ImageResponse } from 'next/server';
import getGroupDonationInfo from './actions';
import { formatMoney } from '@/utils';
import dayjs from 'dayjs';

export const alt = 'Quan-com-tinh-thuong';

export const contentType = 'image/png';
export const runtime = 'edge';

export default async function LocationOG({ params }: { params: { donationId: string } }) {
  const font = await fetch(new URL('./fonts/Roboto-Bold.ttf', import.meta.url)).then((res) =>
    res.arrayBuffer(),
  );

  const info = await getGroupDonationInfo(params);

  const formatInfo = {
    title: info?.title || 'Group donation title',
    description: info?.description || 'description',
    donated: info?.donated || 0,
    donationTarget: info?.donationTarget || 0,
    donators: info?.DonationPayments?.length || 0,
    dueDate: dayjs().add(info?.dueDate, 'milliseconds').format('DD/MM/YYYY HH:mm'),
    thumbnail: info?.imgUrls?.[0] || '',
  };

  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          textAlign: 'center',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column',
          flexWrap: 'nowrap',
          fontFamily: 'Roboto',
          backgroundColor: 'white',
          backgroundImage:
            'radial-gradient(circle at 25px 25px, lightgray 2%, transparent 0%), radial-gradient(circle at 75px 75px, lightgray 2%, transparent 0%)',
          backgroundSize: '100px 100px',
          padding: '0px 8px',
        }}
      >
        <div tw="flex flex-col items-center justify-center mt-10">
          <b
            style={{
              fontSize: 40,
              color: 'black',
              lineHeight: 1.8,
              marginBottom: '24px',
            }}
          >
            {formatInfo.title}
          </b>
          <b
            style={{
              fontSize: 28,
              color: '#54545a',
              lineHeight: 1,
            }}
          >
            {formatInfo.description}
          </b>
          <img
            src={formatInfo.thumbnail}
            alt=""
            width={400}
            height={100}
            style={{
              objectFit: 'contain',
              marginTop: '24px',
            }}
          />
          <div
            tw="flex"
            style={{
              fontSize: 48,
              color: 'black',
            }}
          >
            {[
              {
                title: 'TARGET',
                value:
                  `${formatMoney(formatInfo.donated)}/${formatMoney(
                    formatInfo.donationTarget,
                  )}VND` || '0/0 VND',
                icon: '📌',
              },
              {
                title: 'TOTAL DONATORS',
                value: `${formatInfo.donators || 0}`,
                icon: '👥',
              },
              {
                title: 'DUE DATE',
                value: formatInfo.dueDate || 'Unknown',
                icon: '🕒',
              },
            ].map((item) => (
              <div key={item.title} tw="flex flex-col items-center justify-center mx-10">
                <p
                  style={{
                    fontSize: 28,
                    color: '#71717A',
                    marginBottom: '-36px',
                  }}
                >
                  {item.title} {item.icon}
                </p>
                <p
                  style={{
                    fontSize: 28,
                  }}
                >
                  {item.value}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 600,
      fonts: [
        {
          name: 'Roboto',
          data: font,
        },
      ],
      emoji: 'blobmoji',
    },
  );
}
