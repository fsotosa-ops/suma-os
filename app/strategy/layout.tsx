import { StrategyProvider } from './context/StrategyProvider';

export default function StrategyLayout({ children }: { children: React.ReactNode }) {
  return (
    <StrategyProvider>
      {/* Eliminamos p-6 y overflow global para que lo maneje el Dashboard */}
      <div className="h-full w-full flex flex-col bg-[#020617]">
        {children}
      </div>
    </StrategyProvider>
  );
}