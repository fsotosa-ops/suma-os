import { Server, CheckCircle2, AlertTriangle, XCircle } from 'lucide-react';
import { BlockContentTech } from '@/app/types';

export const TechStatus = ({ data }: { data: BlockContentTech }) => {
  const getStatusConfig = (status: string) => {
    switch (status) {
      case 'operational': return { color: 'text-emerald-500', bg: 'bg-emerald-500/10', border: 'border-emerald-500/20', icon: CheckCircle2 };
      case 'degraded': return { color: 'text-amber-500', bg: 'bg-amber-500/10', border: 'border-amber-500/20', icon: AlertTriangle };
      default: return { color: 'text-red-500', bg: 'bg-red-500/10', border: 'border-red-500/20', icon: XCircle };
    }
  };

  const config = getStatusConfig(data.status);
  const Icon = config.icon;
  
  return (
    <div className="my-4 p-3 rounded-lg border border-zinc-800 bg-zinc-900/40 flex items-center gap-4 select-none">
        <div className={`p-2 rounded-md ${config.bg} ${config.color}`}>
            <Server size={16} />
        </div>
        <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
                <span className="text-xs font-semibold text-zinc-200">{data.service}</span>
                <span className="text-[10px] font-mono text-zinc-600 bg-zinc-900 px-1.5 rounded">v{data.version}</span>
            </div>
            <p className="text-[10px] text-zinc-500 truncate font-mono">{data.endpoint}</p>
        </div>
        <div className={`flex items-center gap-1.5 px-2 py-1 rounded-full text-[10px] font-bold uppercase border ${config.border} ${config.bg} ${config.color}`}>
            <Icon size={10} />
            {data.status}
        </div>
    </div>
  );
};