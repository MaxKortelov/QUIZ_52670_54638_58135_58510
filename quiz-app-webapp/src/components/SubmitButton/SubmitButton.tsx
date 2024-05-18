import React, { ReactNode } from 'react';
import { useAppSelector } from 'utils/hooks/useAppSelector';
import { Button } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import { ButtonType } from 'antd/es/button';
import { getSubmitIsLoading } from 'store/submit/selectors';

import './SubmitButton.scss';

type Props = {
  id?: string;
  className?: string;
  type?: ButtonType;
  htmlType?: 'submit' | 'button' | 'reset' | undefined;
  form?: string;
  children?: ReactNode;
  onClick?: () => void;
  showSpinner?: boolean;
  spinnerTrigger?: boolean;
  disabled?: boolean;
};

export const SubmitButton = ({
  id,
  className,
  type = 'primary',
  htmlType,
  form,
  children,
  onClick,
  showSpinner = false,
  spinnerTrigger,
  disabled = false
}: Props) => {
  const submitIsLoading = useAppSelector(getSubmitIsLoading);

  return (
    <Button
      form={form}
      id={id}
      className={className}
      type={type}
      onClick={onClick}
      htmlType={htmlType}
      disabled={spinnerTrigger || submitIsLoading || disabled}
    >
      {children}{' '}
      {showSpinner && (spinnerTrigger || submitIsLoading) && (
        <LoadingOutlined className="submitLoading" />
      )}
    </Button>
  );
};
