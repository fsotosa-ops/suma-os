import { ExecutionProvider } from '@/app/execution/context/ExecutionProvider';

// Tienes que usar "export default" aquí para que Next.js lo reconozca
export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ExecutionProvider>
      {children}
    </ExecutionProvider>
  );
}