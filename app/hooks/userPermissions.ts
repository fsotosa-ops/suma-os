import { useAuth } from '@/app/context/AuthContext'; 
import { useParams } from 'next/navigation';
import { ProjectMembership } from '@/app/types'; 

export const usePermissions = () => {
  const { userProfile, memberships } = useAuth();
  const params = useParams();
  const projectId = params?.projectId as string;

  // Buscamos el rol del usuario en el proyecto actual
  const projectRole = memberships.find((m: ProjectMembership) => m.projectId === projectId)?.role;

  // Definir jerarquías de acceso
  const isGlobalAdmin = userProfile?.role === 'SUPER_ADMIN';
  const isProjectOwner = projectRole === 'OWNER';
  
  // Rol efectivo (da prioridad al rol de proyecto, pero si es Super Admin global, tiene poder total)
  const effectiveRole = isGlobalAdmin ? 'SUPER_ADMIN' : (projectRole || 'EXECUTOR');

  return {
    isSuperAdmin: isGlobalAdmin,
    
    isOwner: isProjectOwner || isGlobalAdmin,
    
    canManageStrategy: ['SUPER_ADMIN', 'OWNER', 'DECISION_MAKER'].includes(effectiveRole),
    
    // [FIX] Aquí agregamos la propiedad que faltaba
    canManageDiscovery: ['SUPER_ADMIN', 'OWNER', 'DECISION_MAKER', 'FUNCTIONAL'].includes(effectiveRole),
    
    canExecute: ['SUPER_ADMIN', 'OWNER', 'TECHNICAL', 'EXECUTOR'].includes(effectiveRole),
    
    role: effectiveRole
  };
};