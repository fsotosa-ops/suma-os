'use client';

import { PenTool, Plus } from 'lucide-react';
import { BlueprintHeader } from './components/BlueprintHeader';
import { BlueprintCanvas } from './components/BlueprintCanvas';

export default function BlueprintsPage() {
  return (
    <div className="flex flex-col h-full space-y-6">
      <BlueprintHeader />
      
      <div className="flex-1 border border-white/[0.06] rounded-2xl bg-white/[0.01] overflow-hidden">
        {/* Componente especializado de edición técnica */}
        <BlueprintCanvas />
      </div>
    </div>
  );
}