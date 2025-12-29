'use client';

import { Experiment } from '@/app/types';
import { useStrategy } from '@/app/strategy/context/StrategyProvider'; // Importar el hook
import { FlaskConical, CheckCircle2, XCircle, Split, MoreVertical, StopCircle, Trash2, Trophy, ThumbsDown, HelpCircle } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface Props {
    exp: Experiment;
    getLeverName: (id: string) => string;
}

export const ExperimentCard = ({ exp, getLeverName }: Props) => {
    const { updateExperiment, deleteExperiment } = useStrategy(); // Usar las nuevas acciones
    const hasVariants = exp.variants && exp.variants.length > 0;

    const handleConclude = (result: 'WIN' | 'LOSS' | 'INCONCLUSIVE') => {
        updateExperiment(exp.id, { 
            status: 'CONCLUDED', 
            result,
            // En un caso real, aquí fijaríamos la fecha de fin
        });
    };

    return (
        <div className="group bg-zinc-900/30 border border-zinc-800 rounded-xl p-5 hover:border-zinc-600 transition-all flex flex-col gap-4 relative">
            
            {/* Header */}
            <div className="flex items-start justify-between pr-8"> {/* Padding derecho para el menú */}
                <div className="flex items-start gap-4">
                    <div className={`mt-1 p-2 rounded-lg ${exp.status === 'RUNNING' ? 'bg-purple-500/10 text-purple-400' : 'bg-zinc-800 text-zinc-500'}`}>
                        <FlaskConical size={20} />
                    </div>
                    <div>
                        <div className="flex items-center gap-3">
                            <h3 className="text-base font-semibold text-zinc-100">{exp.name}</h3>
                            {exp.status === 'RUNNING' && (
                                <span className="text-[10px] bg-purple-500/10 text-purple-400 px-2 py-0.5 rounded border border-purple-500/20 animate-pulse font-medium">
                                    EN CURSO
                                </span>
                            )}
                        </div>
                        <p className="text-xs text-zinc-500 mt-1 flex items-center gap-2">
                            <span>Palanca: <span className="text-zinc-400">{getLeverName(exp.leverId)}</span></span>
                            <span>•</span>
                            <span>Inicio: {exp.startDate}</span>
                        </p>
                    </div>
                </div>

                {/* Resultado Visual (Si ya concluyó) */}
                {exp.status === 'CONCLUDED' && (
                    <div className={`text-xs font-bold px-3 py-1.5 rounded-full border flex items-center gap-1.5 ${
                        exp.result === 'WIN' ? 'bg-emerald-900/20 text-emerald-400 border-emerald-900' :
                        exp.result === 'LOSS' ? 'bg-red-900/20 text-red-400 border-red-900' : 
                        'bg-zinc-800 text-zinc-400 border-zinc-700'
                    }`}>
                        {exp.result === 'WIN' ? <CheckCircle2 size={14}/> : exp.result === 'LOSS' ? <XCircle size={14}/> : null}
                        {exp.result}
                    </div>
                )}
            </div>

            {/* MENÚ DE ACCIONES (NUEVO) */}
            <div className="absolute top-4 right-4">
                <DropdownMenu>
                    <DropdownMenuTrigger className="p-1 rounded-md hover:bg-zinc-800 text-zinc-500 hover:text-white transition-colors outline-none">
                        <MoreVertical size={16} />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="bg-[#18181b] border-zinc-800 text-zinc-200">
                        <DropdownMenuLabel className="text-xs text-zinc-500 uppercase tracking-wider">Gestión</DropdownMenuLabel>
                        
                        {exp.status === 'RUNNING' && (
                            <>
                                <DropdownMenuItem onClick={() => handleConclude('WIN')} className="gap-2 text-emerald-400 focus:text-emerald-300 focus:bg-emerald-900/20 cursor-pointer">
                                    <Trophy size={14} /> Concluir: Éxito (Win)
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => handleConclude('LOSS')} className="gap-2 text-red-400 focus:text-red-300 focus:bg-red-900/20 cursor-pointer">
                                    <ThumbsDown size={14} /> Concluir: Fracaso (Loss)
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => handleConclude('INCONCLUSIVE')} className="gap-2 text-zinc-400 focus:text-zinc-300 focus:bg-zinc-800 cursor-pointer">
                                    <HelpCircle size={14} /> Concluir: Inconcluso
                                </DropdownMenuItem>
                                <DropdownMenuSeparator className="bg-zinc-800" />
                            </>
                        )}

                        <DropdownMenuItem onClick={() => deleteExperiment(exp.id)} className="gap-2 text-red-500 focus:text-red-400 focus:bg-red-900/20 cursor-pointer">
                            <Trash2 size={14} /> Eliminar
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>

            {/* Comparativa A/B (Igual que antes) */}
            {hasVariants && (
                <div className="bg-black/40 rounded-lg border border-zinc-800/50 p-3 mt-1">
                    <div className="flex items-center justify-between text-[10px] text-zinc-500 uppercase font-bold mb-2 px-2">
                        <div className="flex items-center gap-2"><Split size={12}/> Variante</div>
                        <div className="grid grid-cols-3 gap-8 text-right w-1/2">
                            <span>Tráfico</span>
                            <span>Visitantes</span>
                            <span>Conversión</span>
                        </div>
                    </div>
                    
                    <div className="space-y-1">
                        {exp.variants!.map((variant, idx) => (
                            <div key={idx} className="flex items-center justify-between p-2 rounded hover:bg-white/5 transition-colors">
                                <div className="flex items-center gap-2">
                                    <div className={`w-2 h-2 rounded-full ${idx === 0 ? 'bg-zinc-500' : 'bg-purple-500'}`} />
                                    <span className={`text-xs font-medium ${idx === 0 ? 'text-zinc-400' : 'text-purple-300'}`}>
                                        {variant.name}
                                    </span>
                                </div>
                                <div className="grid grid-cols-3 gap-8 text-right w-1/2 text-xs font-mono">
                                    <span className="text-zinc-500">{variant.traffic}%</span>
                                    <span className="text-zinc-400">{variant.visitors.toLocaleString()}</span>
                                    <span className={idx > 0 && variant.conversionRate > (exp.variants![0].conversionRate) ? 'text-emerald-400 font-bold' : 'text-zinc-300'}>
                                        {variant.conversionRate}%
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};