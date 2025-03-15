import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter } from 'react-router';
import { ConfigProvider, ThemeConfig } from 'antd';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false
    }
  }
});

const theme: ThemeConfig = {
  components: {
    Table: {
      headerBg: '#01274a',
      headerColor: '#fff'
    },
    Modal: {
      titleFontSize: 24
    }
  },
  token: {
    colorPrimary: '#01274a',
    colorPrimaryText: '#121926'
  }
};

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <ConfigProvider theme={theme}>
          <App />
        </ConfigProvider>
      </BrowserRouter>
    </QueryClientProvider>
  </StrictMode>
);
