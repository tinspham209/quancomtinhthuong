'use client';

import React from 'react';

interface Props {
  children: React.ReactNode;
}

const ClientOnly: React.FC<Props> = ({ children }) => {
  const [hasMounted, setHasMounted] = React.useState(false);
  React.useLayoutEffect(() => {
    setHasMounted(true);
  }, []);
  if (!hasMounted) {
    return null;
  }
  return <>{children}</>;
};

export default ClientOnly;
