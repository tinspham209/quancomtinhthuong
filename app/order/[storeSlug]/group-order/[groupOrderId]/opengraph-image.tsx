import { ImageResponse } from 'next/server';
import getGroupOrderInfo from './actions';

export const alt = 'Quan-com-tinh-thuong';

export const contentType = 'image/png';
export const runtime = 'edge';

export default async function LocationOG({ params }: { params: { groupOrderId: string } }) {
  const font = await fetch(new URL('./fonts/ClashDisplay-Semibold.otf', import.meta.url)).then(
    (res) => res.arrayBuffer(),
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
          fontFamily: 'Clash',
          backgroundColor: 'white',
          backgroundImage:
            'radial-gradient(circle at 25px 25px, lightgray 2%, transparent 0%), radial-gradient(circle at 75px 75px, lightgray 2%, transparent 0%)',
          backgroundSize: '100px 100px',
        }}
      >
        <div tw="flex flex-col items-center justify-center mt-10">
          <b
            style={{
              fontSize: 60,
              color: 'black',
              lineHeight: 1.8,
            }}
          >
            {formatInfo.title}
          </b>
          <b
            style={{
              fontSize: 48,
              color: 'black',
              lineHeight: 1.8,
            }}
          >
            {formatInfo.restaurantName}
          </b>
          <div
            tw="flex"
            style={{
              fontSize: 48,
              color: 'black',
            }}
          >
            <div tw="flex flex-col items-center justify-center mx-10">
              <p
                style={{
                  fontSize: 28,
                  color: '#71717A',
                  marginBottom: '-36px',
                }}
              >
                DUE TIME
              </p>
              <p>{formatInfo.dueTime || '11:00 AM'}</p>
            </div>
            <div tw="flex flex-col items-center justify-center mx-10">
              <p
                style={{
                  fontSize: 28,
                  color: '#71717A',
                  marginBottom: '-36px',
                }}
              >
                LIMIT
              </p>
              <p>{formatInfo?.limit || 15}</p>
            </div>
            <div tw="flex flex-col items-center justify-center mx-10">
              <p
                style={{
                  fontSize: 28,
                  color: '#71717A',
                  marginBottom: '-36px',
                }}
              >
                DISCOUNT
              </p>
              <p>{formatInfo.discount || 0} VND</p>
            </div>
          </div>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 600,
      fonts: [
        {
          name: 'Clash',
          data: font,
        },
      ],
      emoji: 'blobmoji',
    },
  );
}
