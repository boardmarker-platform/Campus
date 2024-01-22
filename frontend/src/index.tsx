import { StrictMode } from 'react';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { createRoot } from 'react-dom/client';

import { Global, ThemeProvider } from '@emotion/react';

import globalStyle from 'styles/globalStyle';
import { theme } from 'styles/theme';

import { deferRender } from 'mocks/browser';

import Router from 'pages/Router';

await deferRender();

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <Global styles={globalStyle} />
        <Router />
      </ThemeProvider>
    </QueryClientProvider>
  </StrictMode>,
);
