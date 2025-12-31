'use client';
import React, { createContext, useContext, useState } from 'react';
import { UserProfile, ProjectMembership } from '@/app/types';

interface AuthContextType {
  userProfile: UserProfile | null;
  memberships: ProjectMembership[];
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  // Simulación de usuario (Mock)
  const [userProfile] = useState<UserProfile | null>({
    id: 'user-1',
    email: 'admin@suma.os',
    fullName: 'Admin User',
    role: 'SUPER_ADMIN', 
  });

  const [memberships] = useState<ProjectMembership[]>([
    { projectId: 'suma-os', userId: 'user-1', role: 'OWNER' }
  ]);

  return (
    <AuthContext.Provider value={{ userProfile, memberships, isLoading: false }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};