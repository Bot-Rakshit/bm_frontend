import { ReactNode } from 'react';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools} from "@tanstack/react-query-devtools"

const client = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 4,
    },
  },
});

export function QueryProvider({ children }: { children: ReactNode }) {
  return <QueryClientProvider client={client}>
      {children}
      <ReactQueryDevtools />
  </QueryClientProvider>;
}
