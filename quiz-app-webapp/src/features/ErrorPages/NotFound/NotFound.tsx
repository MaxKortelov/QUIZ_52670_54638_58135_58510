import React from 'react';
import { useNavigate } from 'react-router-dom';
import { URL_HOME } from 'utils/constants/clientUrl';
import { Button } from 'antd';

import '../ErrorPages.scss';

export const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="errorPage" data-testid="NotFoundPage">
      <h1 className="errorPageLabel">404</h1>
      <p className="errorPageDescription">Page not found</p>
      <Button
        className="errorPageButton"
        type="primary"
        onClick={() => navigate(URL_HOME.path())}
      >
        Go to Dashboard
      </Button>
    </div>
  );
};
