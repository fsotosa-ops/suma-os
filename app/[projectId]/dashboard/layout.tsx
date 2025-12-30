// app/[projectId]/dashboard/layout.tsx

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Simplemente pasamos el contenido.
  // Los Providers ya se cargaron en el layout superior ([projectId]/layout.tsx).
  return (
    <>
      {children}
    </>
  );
}