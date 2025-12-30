import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils"; 
import { AppProviders } from "./providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Business OS",
  description: "Strategic Management Platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="dark">
      <body className={cn(inter.className, "bg-[#020617] text-slate-200 antialiased")}>
        {/* Aquí solo pasamos los hijos, NADA de Sidebar ni lógica de negocio */}
        <AppProviders>
            {children}
        </AppProviders>
      </body>
    </html>
  );
}