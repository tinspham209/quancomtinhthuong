import { Button } from '@/components/ui';
import Image from 'next/image';
import Link from 'next/link';

const RootCtn = () => {
  return (
    <div className="">
      <div className="container">
        <div className="flex flex-row justify-center">
          <Image
            unoptimized
            src={'/cover.webp'}
            alt="quan-com-tinh-thuong"
            width={1233}
            height={694}
            style={{
              objectFit: 'contain',
              borderRadius: '0 0 16px 16px',
            }}
          />
        </div>
        <h1 className="text-3xl font-bold leading-none tracking-tight mt-10 mb-4">
          Đặt đồ ăn cùng bạn bè nay đã dễ dàng hơn với Đặt đơn nhóm
        </h1>
        <h3 className="text-xl font-semibold mb-4">Cùng đặt món, cùng tận hưởng</h3>
        <p className="mb-4">
          Chẳng cần thay nhau đặt món từ một máy điện thoại, chẳng cần chờ đợi hay lo nhầm lẫn. Với
          Đặt đơn nhóm, mỗi người đều có thể tự đặt món cho riêng mình từ điện thoại cá nhân và bỏ
          chung vào một giỏ hàng.
        </p>
        <h3 className="text-xl font-semibold mb-4">Đặt hàng nhóm ngay</h3>
        <Link
          href="/sign-in"
          className="border border-black rounded-md px-4 py-2 hover:bg-zinc-200 font-semibold"
        >
          Đớp thôi nào
        </Link>
      </div>
      <footer className="border-t border-zinc-300 py-4 text-center text-sm font-semibold text-gray-500 mt-10">
        © {new Date().getFullYear()} QuanComTinhThuong. All rights reserved.
      </footer>
    </div>
  );
};

export default RootCtn;
