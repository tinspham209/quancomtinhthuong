import ClientOnly from '@/providers/client-only';
import Client from './client';

const DashboardPage = () => {
  return (
    <div className="p-4">
      <ClientOnly>
        <Client />
      </ClientOnly>
    </div>
  );
};

export default DashboardPage;
