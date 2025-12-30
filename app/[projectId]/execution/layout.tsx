export default function ExecutionLayout({ children }: { children: React.ReactNode }) {
  return (
    // Ya no necesitamos ExecutionProvider aquí
    <>
      {children}
    </>
  );
}