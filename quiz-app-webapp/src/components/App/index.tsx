import React, { Suspense } from 'react';
import { ConfigProvider, Spin } from 'antd';
import { Provider } from 'react-redux';
import { store } from 'store';
import theme from './antd-theme';
import Router from 'utils/router/router';

export const App = () => {
  return (
    <ConfigProvider theme={theme}>
      <Provider store={store}>
        <Suspense fallback={<Spin />}>
          <Router />
        </Suspense>
      </Provider>
    </ConfigProvider>
  );
};
