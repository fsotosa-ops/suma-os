'use client';

import { ProjectProvider } from '@/app/context/ProjectContext';
import { AuthProvider } from '@/app/context/AuthContext';

export function AppProviders({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
        <ProjectProvider>
           {children}
        </ProjectProvider>
    </AuthProvider>
  );
}