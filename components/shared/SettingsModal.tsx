'use client';

import { useState } from 'react';
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { useAuth } from "@/app/context/AuthContext";
import { usePermissions } from "@/app/hooks/userPermissions";
import { 
  User, Shield, Users, Key, Plus, MoreVertical, 
  Trash2, Mail, Check, Building, CreditCard, LogOut, Search, Laptop, X
} from "lucide-react";
import { UserRole } from "@/app/types";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from '@/lib/utils';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

// Mock Data
const MOCK_USERS = [
  { id: '1', fullName: 'Admin User', email: 'admin@suma.os', role: 'SUPER_ADMIN', status: 'Active', lastActive: 'Now' },
  { id: '2', fullName: 'Sarah Product', email: 'sarah@suma.os', role: 'FUNCTIONAL', status: 'Active', lastActive: '2h ago' },
  { id: '3', fullName: 'Mike Dev', email: 'mike@suma.os', role: 'EXECUTOR', status: 'Invited', lastActive: '-' },
  { id: '4', fullName: 'John Architect', email: 'john@suma.os', role: 'TECHNICAL', status: 'Active', lastActive: '1d ago' },
];

export const SettingsModal = ({ isOpen, onClose }: Props) => {
  const { userProfile } = useAuth();
  const { isSuperAdmin, isOwner } = usePermissions();
  const [activeTab, setActiveTab] = useState('team');
  const [users, setUsers] = useState(MOCK_USERS);
  const [inviteEmail, setInviteEmail] = useState('');
  const [inviteRole, setInviteRole] = useState<UserRole>('EXECUTOR');

  const canManageTeam = isSuperAdmin || isOwner;

  const handleRoleChange = (userId: string, newRole: string) => {
    setUsers(users.map(u => u.id === userId ? { ...u, role: newRole } : u));
  };

  const handleDeleteUser = (userId: string) => {
    if (confirm("Esta acción revocará el acceso inmediatamente. ¿Continuar?")) {
      setUsers(users.filter(u => u.id !== userId));
    }
  };

  const getRoleColor = (role: string) => {
    switch (role) {
        case 'SUPER_ADMIN': return 'bg-purple-500/10 text-purple-400 border-purple-500/20';
        case 'OWNER': return 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20';
        case 'DECISION_MAKER': return 'bg-blue-500/10 text-blue-400 border-blue-500/20';
        case 'FUNCTIONAL': return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20';
        case 'TECHNICAL': return 'bg-orange-500/10 text-orange-400 border-orange-500/20';
        default: return 'bg-zinc-800 text-zinc-400 border-zinc-700';
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent 
        showCloseButton={false}
        // [FIX] Forzamos anchos grandes y eliminamos cualquier grid heredado
        className="!max-w-[1200px] w-[95vw] h-[80vh] p-0 bg-[#09090b] border-zinc-800 flex overflow-hidden gap-0 shadow-2xl outline-none sm:rounded-xl"
      >
        <DialogTitle className="sr-only">Configuración de Organización</DialogTitle>
        
        {/* --- SIDEBAR DE NAVEGACIÓN (Izquierda) --- */}
        <div className="w-[280px] bg-[#0c0c0e] border-r border-zinc-800 flex flex-col p-4 shrink-0">
            <div className="mb-8 px-2 pt-2">
                <h2 className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-2">Organización</h2>
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-sm font-bold text-white shadow-lg shadow-indigo-900/20">S</div>
                    <div>
                        <p className="text-sm font-bold text-white leading-none">Suma OS</p>
                        <p className="text-[10px] text-zinc-500 mt-0.5">Plan Enterprise</p>
                    </div>
                </div>
            </div>
            
            <nav className="space-y-1 flex-1">
                <NavButton active={activeTab === 'general'} onClick={() => setActiveTab('general')} icon={Building} label="General" />
                <NavButton active={activeTab === 'team'} onClick={() => setActiveTab('team')} icon={Users} label="Miembros y Roles" />
                <NavButton active={activeTab === 'security'} onClick={() => setActiveTab('security')} icon={Shield} label="Seguridad" />
                <NavButton active={activeTab === 'billing'} onClick={() => setActiveTab('billing')} icon={CreditCard} label="Facturación" />
            </nav>

            <div className="pt-4 border-t border-zinc-800 mt-auto">
                <div className="flex items-center gap-3 px-3 py-2 rounded-lg bg-zinc-900/50 border border-zinc-800 hover:bg-zinc-900 transition-colors cursor-pointer">
                    <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-xs font-bold text-white shrink-0">
                        {userProfile?.fullName.charAt(0)}
                    </div>
                    <div className="min-w-0 flex-1">
                        <p className="text-xs font-bold text-white truncate">{userProfile?.fullName}</p>
                        <p className="text-[10px] text-zinc-500 truncate capitalize">{userProfile?.role.toLowerCase().replace('_', ' ')}</p>
                    </div>
                </div>
            </div>
        </div>

        {/* --- CONTENIDO PRINCIPAL (Derecha) --- */}
        <div className="flex-1 flex flex-col bg-[#09090b] min-w-0 relative">
            
            {/* Header del Tab */}
            <div className="h-16 border-b border-zinc-800 flex items-center justify-between px-8 bg-[#09090b] shrink-0 sticky top-0 z-10">
                <div>
                    <h2 className="text-lg font-bold text-white flex items-center gap-2">
                        {activeTab === 'team' && 'Gestión de Equipo'}
                        {activeTab === 'general' && 'Configuración General'}
                        {activeTab === 'security' && 'Seguridad y Acceso'}
                        {activeTab === 'billing' && 'Planes y Facturación'}
                    </h2>
                </div>
                <button onClick={onClose} className="p-2 hover:bg-zinc-800 rounded-full text-zinc-500 hover:text-white transition-colors">
                    <X size={20} />
                </button>
            </div>

            {/* Area Scrollable */}
            <div className="flex-1 overflow-y-auto p-8 custom-scrollbar">
                
                {/* --- TAB: TEAM MANAGEMENT --- */}
                {activeTab === 'team' && (
                    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-300 max-w-5xl mx-auto">
                        
                        {/* Invite Box */}
                        {canManageTeam && (
                            <div className="bg-zinc-900/30 border border-zinc-800 p-6 rounded-xl flex flex-col gap-4">
                                <div>
                                    <h3 className="text-sm font-bold text-white mb-1 flex items-center gap-2"><Plus size={16} className="text-blue-500"/> Invitar nuevo miembro</h3>
                                    <p className="text-xs text-zinc-500">Envía una invitación por correo para unirse a tu organización.</p>
                                </div>
                                <div className="flex gap-3 items-start">
                                    <div className="flex-1 relative">
                                        <Mail className="absolute left-3 top-3 text-zinc-500" size={16} />
                                        <input 
                                            placeholder="correo@empresa.com" 
                                            value={inviteEmail}
                                            onChange={(e) => setInviteEmail(e.target.value)}
                                            className="w-full bg-black border border-zinc-800 rounded-lg py-2.5 pl-10 pr-4 text-sm text-white focus:border-blue-500 outline-none transition-all"
                                        />
                                    </div>
                                    <div className="w-48 relative">
                                        <select 
                                            className="w-full bg-black border border-zinc-800 rounded-lg py-2.5 px-3 text-sm text-white focus:border-blue-500 outline-none appearance-none cursor-pointer"
                                            value={inviteRole}
                                            onChange={(e) => setInviteRole(e.target.value as UserRole)}
                                        >
                                            <option value="FUNCTIONAL">Functional (PM)</option>
                                            <option value="TECHNICAL">Technical (Lead)</option>
                                            <option value="EXECUTOR">Executor (Dev)</option>
                                            <option value="DECISION_MAKER">Decision Maker</option>
                                        </select>
                                        <div className="absolute right-3 top-3 pointer-events-none text-zinc-500">
                                            <svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                                        </div>
                                    </div>
                                    <button className="bg-white text-black hover:bg-zinc-200 px-6 py-2.5 rounded-lg text-sm font-bold transition-all shadow-lg hover:shadow-xl">
                                        Enviar Invitación
                                    </button>
                                </div>
                            </div>
                        )}

                        {/* Members Table */}
                        <div>
                            <div className="flex items-center justify-between mb-4 px-1">
                                <h3 className="text-sm font-bold text-zinc-300">Miembros Activos ({users.length})</h3>
                                <div className="relative">
                                    <Search className="absolute left-3 top-2 text-zinc-600" size={14} />
                                    <input placeholder="Buscar por nombre o rol..." className="bg-zinc-900 border border-zinc-800 rounded-lg py-1.5 pl-9 pr-3 text-xs text-white focus:border-zinc-700 outline-none w-64 transition-all focus:w-72" />
                                </div>
                            </div>

                            <div className="border border-zinc-800 rounded-xl overflow-hidden bg-[#0c0c0e]">
                                <table className="w-full text-left text-sm">
                                    <thead className="bg-zinc-900/50 text-zinc-500 font-medium border-b border-zinc-800">
                                        <tr>
                                            <th className="px-6 py-3 font-bold text-[10px] uppercase tracking-wider w-[40%]">Usuario</th>
                                            <th className="px-6 py-3 font-bold text-[10px] uppercase tracking-wider w-[20%]">Rol</th>
                                            <th className="px-6 py-3 font-bold text-[10px] uppercase tracking-wider w-[20%]">Estado</th>
                                            <th className="px-6 py-3 font-bold text-[10px] uppercase tracking-wider w-[20%] text-right">Acciones</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-zinc-800/50">
                                        {users.map(u => (
                                            <tr key={u.id} className="group hover:bg-zinc-900/40 transition-colors">
                                                <td className="px-6 py-4">
                                                    <div className="flex items-center gap-4">
                                                        <div className="w-9 h-9 rounded-full bg-zinc-800 border border-zinc-700 flex items-center justify-center text-xs font-bold text-zinc-300 shrink-0">
                                                            {u.fullName.charAt(0)}
                                                        </div>
                                                        <div className="min-w-0">
                                                            <p className="font-medium text-white text-sm truncate">{u.fullName}</p>
                                                            <p className="text-[11px] text-zinc-500 truncate">{u.email}</p>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <span className={cn("text-[10px] font-bold px-2.5 py-1 rounded-full border uppercase tracking-wide inline-flex items-center gap-1.5", getRoleColor(u.role))}>
                                                        {u.role === 'SUPER_ADMIN' && <Shield size={10} />}
                                                        {u.role.replace('_', ' ')}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className="flex items-center gap-2">
                                                        <div className={cn("w-2 h-2 rounded-full", u.status === 'Active' ? "bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.4)]" : "bg-yellow-500")} />
                                                        <span className={cn("text-xs font-medium", u.status === 'Active' ? "text-emerald-500" : "text-yellow-500")}>
                                                            {u.status}
                                                        </span>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 text-right">
                                                    {canManageTeam ? (
                                                        <DropdownMenu>
                                                            <DropdownMenuTrigger className="p-2 text-zinc-500 hover:text-white hover:bg-zinc-800 rounded-md transition-colors outline-none">
                                                                <MoreVertical size={16} />
                                                            </DropdownMenuTrigger>
                                                            <DropdownMenuContent align="end" className="bg-[#151921] border-zinc-800 text-zinc-300 shadow-xl w-48">
                                                                <DropdownMenuLabel className="text-xs uppercase text-zinc-600 px-2 py-1.5">Gestionar Rol</DropdownMenuLabel>
                                                                <DropdownMenuItem onClick={() => handleRoleChange(u.id, 'FUNCTIONAL')} className="text-xs cursor-pointer"><Check size={12} className={cn("mr-2", u.role === 'FUNCTIONAL' ? "opacity-100" : "opacity-0")}/> Functional</DropdownMenuItem>
                                                                <DropdownMenuItem onClick={() => handleRoleChange(u.id, 'TECHNICAL')} className="text-xs cursor-pointer"><Check size={12} className={cn("mr-2", u.role === 'TECHNICAL' ? "opacity-100" : "opacity-0")}/> Technical</DropdownMenuItem>
                                                                <DropdownMenuItem onClick={() => handleRoleChange(u.id, 'EXECUTOR')} className="text-xs cursor-pointer"><Check size={12} className={cn("mr-2", u.role === 'EXECUTOR' ? "opacity-100" : "opacity-0")}/> Executor</DropdownMenuItem>
                                                                <DropdownMenuSeparator className="bg-zinc-800 my-1" />
                                                                <DropdownMenuItem onClick={() => handleDeleteUser(u.id)} className="text-xs text-red-400 focus:text-red-300 focus:bg-red-500/10 cursor-pointer">
                                                                    <Trash2 size={12} className="mr-2"/> Revocar Acceso
                                                                </DropdownMenuItem>
                                                            </DropdownMenuContent>
                                                        </DropdownMenu>
                                                    ) : (
                                                        <span className="text-[10px] text-zinc-600 italic select-none">Solo lectura</span>
                                                    )}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                )}

                {/* --- TAB: SECURITY --- */}
                {activeTab === 'security' && (
                    <div className="space-y-6 max-w-3xl animate-in fade-in slide-in-from-bottom-2 duration-300">
                        <div className="bg-zinc-900/30 border border-zinc-800 rounded-xl p-8">
                            <h3 className="text-base font-bold text-white mb-6 flex items-center gap-2"><Key size={18} className="text-emerald-500"/> Contraseña y Autenticación</h3>
                            <div className="space-y-6">
                                <div className="grid grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold text-zinc-500 uppercase tracking-wider">Contraseña Actual</label>
                                        <input type="password" placeholder="••••••••" className="w-full bg-black border border-zinc-800 rounded-lg p-3 text-sm text-white focus:border-emerald-500 outline-none transition-colors" />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold text-zinc-500 uppercase tracking-wider">Nueva Contraseña</label>
                                        <input type="password" placeholder="••••••••" className="w-full bg-black border border-zinc-800 rounded-lg p-3 text-sm text-white focus:border-emerald-500 outline-none transition-colors" />
                                    </div>
                                </div>
                                <div className="pt-2 flex justify-end">
                                    <button className="bg-white text-black px-6 py-2.5 rounded-lg text-sm font-bold hover:bg-zinc-200 transition-colors shadow-lg">Actualizar Credenciales</button>
                                </div>
                            </div>
                        </div>

                        <div className="bg-zinc-900/30 border border-zinc-800 rounded-xl p-8">
                            <h3 className="text-base font-bold text-white mb-6 flex items-center gap-2"><Laptop size={18} className="text-blue-500"/> Sesiones Activas</h3>
                            <div className="flex items-center justify-between p-4 bg-black/40 rounded-xl border border-zinc-800">
                                <div className="flex items-center gap-4">
                                    <div className="p-3 bg-zinc-800 rounded-lg text-zinc-400"><Laptop size={24}/></div>
                                    <div>
                                        <p className="text-sm font-medium text-white">MacBook Pro 16" - Chrome</p>
                                        <p className="text-xs text-emerald-500 flex items-center gap-1.5 mt-1 font-medium"><span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"/> Sesión Actual • Santiago, CL</p>
                                    </div>
                                </div>
                                <button className="text-xs text-red-400 hover:text-red-300 font-bold border border-red-500/20 bg-red-500/5 px-4 py-2 rounded-lg hover:bg-red-500/10 transition-colors">Cerrar Sesión</button>
                            </div>
                        </div>
                    </div>
                )}

                {/* --- TAB: GENERAL --- */}
                {activeTab === 'general' && (
                    <div className="space-y-8 max-w-3xl animate-in fade-in slide-in-from-bottom-2 duration-300">
                        <div className="flex items-start gap-8 pb-8 border-b border-zinc-800">
                            <div className="w-32 h-32 rounded-3xl bg-gradient-to-br from-zinc-800 to-zinc-900 border border-zinc-700 flex items-center justify-center text-5xl font-bold text-zinc-500 cursor-pointer hover:border-zinc-500 transition-all shadow-inner shrink-0 group relative overflow-hidden">
                                {userProfile?.fullName.charAt(0)}
                                <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                    <span className="text-xs font-bold text-white">Cambiar</span>
                                </div>
                            </div>
                            <div className="space-y-6 flex-1 pt-2">
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-zinc-500 uppercase tracking-wider">Nombre Visible</label>
                                    <input defaultValue={userProfile?.fullName} className="w-full bg-black border border-zinc-800 rounded-lg p-3 text-sm text-white focus:border-blue-500 outline-none transition-colors" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-zinc-500 uppercase tracking-wider">Correo Electrónico</label>
                                    <input defaultValue={userProfile?.email} disabled className="w-full bg-zinc-900/50 border border-zinc-800 rounded-lg p-3 text-sm text-zinc-400 cursor-not-allowed" />
                                    <p className="text-[10px] text-zinc-600">El correo electrónico es gestionado por tu proveedor de identidad.</p>
                                </div>
                            </div>
                        </div>
                        
                        <div className="p-6 border border-red-900/30 bg-red-900/5 rounded-xl flex items-center justify-between">
                            <div>
                                <h4 className="text-red-400 font-bold text-sm mb-1">Zona de Peligro</h4>
                                <p className="text-xs text-red-400/70">La eliminación de cuenta es irreversible y perderás acceso a todos los proyectos.</p>
                            </div>
                            <button className="px-6 py-2.5 border border-red-900/50 text-red-400 text-xs font-bold rounded-lg hover:bg-red-900/20 transition-colors shadow-sm">
                                Eliminar mi cuenta
                            </button>
                        </div>
                    </div>
                )}

            </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

const NavButton = ({ active, onClick, icon: Icon, label }: any) => (
    <button 
        onClick={onClick}
        className={cn(
            "w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all group mb-1",
            active ? "bg-zinc-800 text-white shadow-sm" : "text-zinc-500 hover:text-zinc-300 hover:bg-zinc-900/50"
        )}
    >
        <Icon size={18} className={cn("transition-colors", active ? "text-white" : "text-zinc-600 group-hover:text-zinc-400")} />
        {label}
    </button>
);