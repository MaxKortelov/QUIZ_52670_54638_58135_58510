import React, { ReactNode } from 'react';

import './Authorization.scss';

type Props = {
    children: ReactNode
}

export const Authorization = ({ children }: Props) => {
  return (
      <div className="authSection">
          {children}
      </div>
  );
};
