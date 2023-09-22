import { ImageResponse } from 'next/server';
import getGroupOrderInfo from './actions';
import { formatMoney } from '@/utils';

export const alt = 'Quan-com-tinh-thuong';

export const contentType = 'image/png';
export const runtime = 'edge';

export default async function LocationOG({ params }: { params: { groupOrderId: string } }) {
  const font = await fetch(new URL('./fonts/Roboto-Bold.ttf', import.meta.url)).then((res) =>
    res.arrayBuffer(),
  );

  const info = await getGroupOrderInfo(params);

  const formatInfo = {
    title: info?.title,
    restaurantName: info?.restaurant?.name,
    limit: info?.limit,
    discount: info?.discount,
    dueTime: info?.dueTime,
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
              fontSize: 48,
              color: 'black',
              lineHeight: 1.8,
              marginBottom: '24px',
            }}
          >
            {formatInfo.title || 'Group order title'}
          </b>
          <b
            style={{
              fontSize: 48,
              color: 'black',
              lineHeight: 1,
            }}
          >
            {formatInfo.restaurantName || 'Restaurant'}
          </b>
          <div
            tw="flex"
            style={{
              fontSize: 48,
              color: 'black',
            }}
          >
            {[
              {
                title: 'DUE TIME',
                value: formatInfo.dueTime || '11:00 AM',
                icon: '⏳',
              },
              {
                title: 'LIMIT',
                value: `${formatInfo.limit || 15}`,
                icon: '📌',
              },
              {
                title: 'DISCOUNT',
                value: `${formatMoney(formatInfo.discount || 0)} VND`,
                icon: '💰',
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
                <p>{item.value}</p>
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
