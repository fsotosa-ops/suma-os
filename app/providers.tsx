// app/providers.tsx
'use client';

import { StrategyProvider } from '@/app/strategy/context/StrategyProvider';
import { ExecutionProvider } from '@/app/execution/context/ExecutionProvider';
import { DiscoveryProvider } from '@/app/discovery/context/DiscoveryProvider'; // Nuevo

export function AppProviders({ children }: { children: React.ReactNode }) {
  return (
    <StrategyProvider>
      <ExecutionProvider>
        <DiscoveryProvider>
          {children}
        </DiscoveryProvider>
      </ExecutionProvider>
    </StrategyProvider>
  );
}