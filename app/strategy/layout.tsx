import { StrategyProvider } from './context/StrategyProvider';

export default function StrategyLayout({ children }: { children: React.ReactNode }) {
  return (
    <StrategyProvider>
      <div className="h-full flex flex-col p-6 overflow-y-auto custom-scrollbar">
        {children}
      </div>
    </StrategyProvider>
  );
}