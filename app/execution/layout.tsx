// app/execution/layout.tsx
import { ExecutionProvider } from './context/ExecutionProvider';

export default function ExecutionLayout({
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