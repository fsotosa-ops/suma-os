# Sumadots OS | Portal de Gestión Tecnológica

**Sumadots OS** es una plataforma diseñada para unificar el mundo estratégico de **RevOps** con la ejecución técnica de **Ingeniería (CTO as a Service)**. El sistema permite trazar el impacto directo de la arquitectura de software en las palancas de crecimiento del negocio.

## 🚀 Módulos Principales

### 1. Strategy Board
Espacio de toma de decisiones estratégicas donde se gestionan los movimientos de la compañía.
* **Matrices de Priorización**: Visualización de objetivos según Impacto/Esfuerzo, Eisenhower y Radar de Riesgos.
* **Inventario Estratégico**: Listado detallado de objetivos con seguimiento de progreso y salud.

### 2. RevOps Monitor & Growth Lab
Centro de mando para métricas de negocio vinculadas a tecnología.
* **Monitor de Palancas**: Seguimiento en tiempo real de palancas de Crecimiento, Eficiencia y Retención.
* **Growth Lab**: Registro de experimentos A/B basados en hipótesis estratégicas para optimizar KPIs.

### 3. Knowledge Center (Service Mapping)
El tejido conectivo entre la estrategia y el código.
* **Operational Domains**: Organización de la documentación por dominios de negocio como Sales Funnel, Revenue Ops y Compliance.
* **Service Blueprints**: Mapas vivos que conectan la lógica de negocio (RevOps) con la infraestructura técnica (DevTech).
* **Cloud Ecosystem**: Gestión dinámica y editable del stack tecnológico (AWS, APIs, DBs) que soporta cada proceso.

### 4. Execution (Kanban & Sprints)
Gestión del flujo de trabajo técnico sincronizado con las metas de negocio.
* **Kanban Board**: Gestión visual de tareas (TODO, In Progress, Review, Done).
* **Ciclos de Sprint**: Planificación temporal con definición de objetivos de valor para cada ciclo.
* **Backlog Maestro**: Repositorio centralizado de requerimientos técnicos y funcionales.

## 🛠️ Stack Tecnológico

* **Framework**: Next.js 15 (App Router).
* **Lenguaje**: TypeScript para máxima seguridad de tipos.
* **Estética**: Look & Feel minimalista tipo "Dark Mode" inspirado en Huly.
* **UI/Styling**: Tailwind CSS 4, Lucide React (iconografía) y Shadcn/UI.
* **Gráficos**: Recharts para visualización de métricas y tendencias.
* **Providers**: Context API para gestión de estados globales de Estrategia y Ejecución.

## 📂 Estructura del Proyecto

```text
app/
├── knowledge-center/   # Hub de documentación y Service Maps
├── strategy/           # Planificación, Levers y Growth Lab
├── execution/          # Kanban, Backlog y gestión de Sprints
├── dashboard/          # Vista ejecutiva consolidada
├── types/              # Definiciones de interfaces globales
└── components/         # Componentes UI reutilizables y compartidos