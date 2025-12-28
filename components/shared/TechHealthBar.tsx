interface TechHealthBarProps {
    score: number;
  }
  
  export default function TechHealthBar({ score }: TechHealthBarProps) {
    return (
      <div className="flex items-center gap-4 bg-slate-900/50 px-4 py-2 rounded-full border border-slate-800">
        <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Tech Health</span>
        <div className="w-32 h-1.5 bg-slate-800 rounded-full overflow-hidden">
          <div 
            className="h-full bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)] transition-all duration-1000"
            style={{ width: `${score}%` }}
          />
        </div>
        <span className="text-xs font-mono font-bold text-emerald-500">{score}%</span>
      </div>
    );
  }