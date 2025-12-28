// app/execution/backlog/page.tsx
export default function BacklogPage() {
    return (
      <div className="p-8 text-white">
        <h1 className="text-3xl font-bold mb-4">Backlog</h1>
        <p className="text-gray-400">Aquí irá la vista de lista para priorizar tareas antes de los Sprints.</p>
        
        {/* Aquí podrías reutilizar componentes o crear una tabla de lista */}
        <div className="mt-8 border border-dashed border-gray-700 rounded-lg h-64 flex items-center justify-center text-gray-600">
          Próximamente: Vista de Lista
        </div>
      </div>
    );
  }