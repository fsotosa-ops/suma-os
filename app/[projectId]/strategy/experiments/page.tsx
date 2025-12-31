'use client';

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { useStrategy } from '@/app/[projectId]/strategy/context/StrategyProvider';
import { ExperimentCard } from '../components/ExperimentCard';
import { FlaskConical, Plus } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { CreateExperimentModal } from '../components/CreateExperimentModal';

export default function GrowthLabPage() {
  const [mounted, setMounted] = useState(false);
  const { experiments } = useStrategy();
  const params = useParams();
  const projectId = params?.projectId as string; // Obtenido dinámicamente

  const [isModalOpen, setIsModalOpen] = useState(false);

  // Evita el Hydration Mismatch esperando a que el cliente esté listo
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="w-full p-6 md:p-8 space-y-8 animate-in fade-in duration-500">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 border-b border-white/5 pb-6">
            <div>
                <div className="flex items-center gap-3 mb-2">
                    <div className="p-2 bg-pink-500/10 rounded-lg">
                        <FlaskConical className="text-pink-500" size={24} />
                    </div>
                    <h1 className="text-2xl md:text-3xl font-bold text-white tracking-tight">Growth Lab</h1>
                </div>
                <p className="text-zinc-400 text-sm max-w-2xl">
                    Validación científica de hipótesis para el proyecto actual.
                </p>
            </div>

            <button 
                onClick={() => setIsModalOpen(true)}
                className="bg-pink-600 hover:bg-pink-500 text-white px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-2 transition-all shadow-lg shadow-pink-900/20"
            >
                <Plus size={18} /> Nuevo Experimento
            </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {experiments.map(exp => (
                <ExperimentCard key={exp.id} experiment={exp} />
            ))}
        </div>

        <CreateExperimentModal 
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
        />
    </div>
  );
}