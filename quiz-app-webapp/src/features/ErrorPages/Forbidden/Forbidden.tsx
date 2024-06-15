import React from 'react';
import { useNavigate } from 'react-router-dom';
import { URL_HOME } from 'utils/constants/clientUrl';
import { Button } from 'antd';

import '../ErrorPages.scss';

export const Forbidden = () => {
  const navigate = useNavigate();

  return (
    <div className="errorPage" data-testid="ForbiddenPage">
      <h1 className="errorPageLabel">403</h1>
      <p className="errorPageDescription">
        The page you were trying to visit <br />
        is forbidden for some reason
      </p>
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
