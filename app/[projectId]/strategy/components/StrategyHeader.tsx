import { ReactNode } from 'react';
import { LucideIcon } from 'lucide-react';

interface Props {
  title: string;
  subtitle: string;
  icon: LucideIcon;
  iconColor?: string;
  actions?: ReactNode;
}

export const StrategyHeader = ({ title, subtitle, icon: Icon, iconColor = "text-blue-500", actions }: Props) => {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-end border-b border-zinc-800 pb-6 gap-4">
      <div>
        <h1 className="text-3xl font-bold text-zinc-100 flex items-center gap-3">
          <Icon className={iconColor} size={32} /> 
          {title}
        </h1>
        <p className="text-zinc-500 mt-1">{subtitle}</p>
      </div>
      
      {actions && (
        <div className="flex items-center gap-3">
            {actions}
        </div>
      )}
    </div>
  );
};