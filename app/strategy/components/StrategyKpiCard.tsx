import { Card } from "@/components/ui/card";
import { ReactNode } from 'react';

interface Props {
    label: string;
    value: string | number;
    icon: ReactNode;
    trend?: string;
    trendColor?: string;
}

export const StrategyKpiCard = ({ label, value, icon, trend, trendColor = 'text-emerald-500' }: Props) => {
    return (
        <Card className="bg-zinc-900/50 border-zinc-800 p-4 flex items-center justify-between">
            <div>
                <p className="text-zinc-500 text-[10px] uppercase font-bold tracking-wider">{label}</p>
                <div className="flex items-baseline gap-2 mt-1">
                    <p className="text-2xl font-bold text-white">{value}</p>
                    {trend && <span className={`text-xs font-medium ${trendColor}`}>{trend}</span>}
                </div>
            </div>
            <div className="p-2 bg-black/40 rounded-lg">{icon}</div>
        </Card>
    );
}