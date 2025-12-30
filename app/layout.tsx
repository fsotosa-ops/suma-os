import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import { Sidebar } from "@/components/shared/Sidebar";
import { MobileSidebar } from "@/components/shared/MobileSidebar";
import TechHealthBar from "@/components/shared/TechHealthBar";
import { AppProviders } from "./providers";
import { cn } from "@/lib/utils"; 

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
      <body className={cn(inter.className, "bg-[#020617] text-slate-200 antialiased")}>
        
        <AppProviders>
          
          <div className="flex h-screen w-full overflow-hidden bg-[#020617]">
            
            {/* Sidebar Desktop: Oculto en móviles mediante 'hidden md:flex' */}
            <Sidebar />
            
            <main className="flex-1 flex flex-col min-w-0 h-full relative overflow-hidden bg-[#020617]">
              
              {/* Header: z-index 50 para estar debajo del Sidebar móvil (z-100) */}
              <header className="h-16 flex items-center justify-between px-4 md:px-8 border-b border-slate-800 bg-[#020617] sticky top-0 z-40 shrink-0">
                <div className="flex items-center gap-3">
                  
                  {/* El MobileSidebar ahora tiene z-index 100 */}
                  <MobileSidebar />

                  <div className="flex items-center gap-2 text-sm">
                    <span className="text-slate-500 hidden sm:inline">Project /</span>
                    <span className="font-medium text-white truncate max-w-[150px] sm:max-w-none font-mono">MVP TMS</span>
                  </div>
                </div>
                
                <div className="hidden sm:block">
                  <TechHealthBar score={92} />
                </div>
              </header>

              {/* Área de Contenido con scroll independiente */}
              <div className="flex-1 overflow-y-auto custom-scrollbar bg-[#020617]">
                {children}
              </div>

            </main>
          </div>
          
        </AppProviders>

      </body>
    </html>
  );
}