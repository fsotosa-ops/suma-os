import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import { Sidebar } from "@/components/shared/Sidebar";
import { MobileSidebar } from "@/components/shared/MobileSidebar";
import TechHealthBar from "@/components/shared/TechHealthBar";

// Importamos el nuevo orquestador de estado
import { AppProviders } from "./providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Sumadots OS | Portal Cliente",
  description: "Plataforma de gestión tecnológica CTO as a Service",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="dark">
      <body className={`${inter.className} bg-[#020617] text-slate-200 antialiased`}>
        
        {/* Usamos el Provider Unificado */}
        <AppProviders>
          
          <div className="flex h-screen overflow-hidden">
            <Sidebar />
            
            <main className="flex-1 flex flex-col min-w-0">
              
              {/* Header */}
              <header className="h-16 flex items-center justify-between px-4 md:px-8 border-b border-slate-800 bg-[#020617]/50 backdrop-blur-md sticky top-0 z-50">
                <div className="flex items-center gap-3">
                  <MobileSidebar />
                  <div className="flex items-center gap-2 text-sm">
                    <span className="text-slate-500 hidden sm:inline">Project /</span>
                    <span className="font-medium text-white truncate max-w-[200px] sm:max-w-none">MVP TMS Integration</span>
                  </div>
                </div>
                <div className="hidden sm:block">
                  <TechHealthBar score={92} />
                </div>
              </header>

              {/* Contenido Principal (Sin padding forzado para permitir Full Width) */}
              <div className="flex-1 overflow-y-auto custom-scrollbar">
                {children}
              </div>

            </main>
          </div>
          
        </AppProviders>

      </body>
    </html>
  );
}