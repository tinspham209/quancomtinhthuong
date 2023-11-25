'use client';

import { StoreModal } from '@/components/modals';
import { UserUpdateModal } from '@/components/modals/user-update-modal';
import React from 'react';

interface ModalProviderProps {}

const ModalProvider: React.FC<ModalProviderProps> = ({}) => {
  const [isMounted, setIsMounted] = React.useState(false);
  React.useLayoutEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <>
      <StoreModal />
      <UserUpdateModal />
    </>
  );
};

export default ModalProvider;
