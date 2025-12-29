// app/providers.tsx
'use client';

import { StrategyProvider } from '@/app/strategy/context/StrategyProvider';
import { ExecutionProvider } from '@/app/execution/context/ExecutionProvider';

export function AppProviders({ children }: { children: React.ReactNode }) {
  return (
    <StrategyProvider>
      <ExecutionProvider>
        {children}
      </ExecutionProvider>
    </StrategyProvider>
  );
}