import ClientOnly from '@/providers/client-only';
import Client from './client';

interface Props {}

const Page = ({ ...props }: Props) => {
  return (
    <ClientOnly>
      <Client {...props} />
    </ClientOnly>
  );
};

export default Page;
