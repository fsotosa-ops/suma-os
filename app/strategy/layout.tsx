export default function StrategyLayout({ children }: { children: React.ReactNode }) {
    return (
      // Ya no necesitamos StrategyProvider aquí
      <div className="h-full w-full flex flex-col bg-[#020617]">
        {children}
      </div>
    );
  }