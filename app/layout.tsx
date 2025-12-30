import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Suspense } from "react"; // <--- 1. IMPORTAR SUSPENSE
import "./globals.css";

import { Sidebar } from "@/components/shared/Sidebar";
import { MobileSidebar } from "@/components/shared/MobileSidebar";
import TechHealthBar from "@/components/shared/TechHealthBar";
import { AppProviders } from "./providers";
import { cn } from "@/lib/utils"; 

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Business OS | Strategic Management Platform",
  description: "Unified platform for RevOps strategy and engineering execution.",
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
            
            {/* 2. ENVOLVER EL SIDEBAR EN SUSPENSE */}
            <Suspense fallback={<div className="w-[280px] bg-[#08090a] border-r border-white/[0.06]" />}>
              <Sidebar />
            </Suspense>
            
            <main className="flex-1 flex flex-col min-w-0 h-full relative overflow-hidden bg-[#020617]">
              
              <header className="h-16 flex items-center justify-between px-4 md:px-8 border-b border-slate-800 bg-[#020617] sticky top-0 z-40 shrink-0">
                <div className="flex items-center gap-3">
                  <MobileSidebar />
                  <div className="flex items-center gap-2 text-sm">
                    <span className="text-slate-500 hidden sm:inline">Workspace /</span>
                    <span className="font-medium text-white truncate max-w-[150px] sm:max-w-none font-mono">Main Project</span>
                  </div>
                </div>
                
                <div className="hidden sm:block">
                  <TechHealthBar score={92} />
                </div>
              </header>

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