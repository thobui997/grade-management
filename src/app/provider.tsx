import MainErrorFallback from '@app/shared/components/error/main';
import { theme } from '@app/config/theme';
import AuthProvider from '@app/contexts/AuthProvider';
import NotificationProvider from '@app/contexts/NotificationProvider';
import { queryConfig } from '@app/lib/react-query';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ConfigProvider } from 'antd';
import React from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { BrowserRouter } from 'react-router';

type AppProviderProps = {
  children: React.ReactNode;
};

export const AppProvider = ({ children }: AppProviderProps) => {
  const [queryClient] = React.useState(
    () =>
      new QueryClient({
        defaultOptions: queryConfig
      })
  );

  return (
    <React.Suspense fallback={<div>Loading...</div>}>
      <ErrorBoundary FallbackComponent={MainErrorFallback}>
        <QueryClientProvider client={queryClient}>
          <BrowserRouter>
            <ConfigProvider theme={theme}>
              <NotificationProvider>
                <AuthProvider>{children}</AuthProvider>
              </NotificationProvider>
            </ConfigProvider>
          </BrowserRouter>
        </QueryClientProvider>
      </ErrorBoundary>
    </React.Suspense>
  );
};
