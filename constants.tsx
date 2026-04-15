
import React from 'react';
import { IANode, Insight } from './types';
import { 
  Square as WindowIcon, 
  DoorClosed, 
  Calculator, 
  ShieldCheck, 
  Search, 
  Users, 
  Wrench,
  Zap,
  Target,
  Layers,
  BarChart3
} from 'lucide-react';

export const METHODOLOGY_STEPS = [
  {
    id: "descubrir",
    title: "1. Descubrir (Convergencia)",
    description: "Análisis de mercado y competencia. Ya que el research presencial es inviable, usamos el análisis de fricción de la competencia para identificar brechas.",
    icon: <Search className="w-5 h-5" />,
    color: "bg-blue-100 text-blue-700"
  },
  {
    id: "definir",
    title: "2. Definir (Filtro)",
    description: "Priorización de funcionalidades para el MVP: Cotizador m² y Catálogo. Definimos los KPIs: % de cotizaciones completadas vs abandonadas.",
    icon: <Target className="w-5 h-5" />,
    color: "bg-purple-100 text-purple-700"
  },
  {
    id: "desarrollar",
    title: "3. Desarrollar (Iteración)",
    description: "Construcción del MVP. Implementación de herramientas de analítica (Hotjar/GA4) para sustituir las entrevistas presenciales por datos de comportamiento real.",
    icon: <Layers className="w-5 h-5" />,
    color: "bg-amber-100 text-amber-700"
  },
  {
    id: "entregar",
    title: "4. Entregar (Lanzamiento)",
    description: "Salida a producción del MVP. Inicio del ciclo de feedback cuantitativo para la siguiente iteración basada en el uso real en la localidad remota.",
    icon: <Zap className="w-5 h-5" />,
    color: "bg-green-100 text-green-700"
  }
];

export const BUSINESS_GOALS = [
  { id: 1, text: "Aumentar visibilidad digital con muestra clara de productos.", icon: <Search className="w-5 h-5" /> },
  { id: 2, text: "Permitir estimación de costos por m² antes del contacto.", icon: <Calculator className="w-5 h-5" /> },
  { id: 3, text: "Facilitar contacto directo y generar confianza legal.", icon: <ShieldCheck className="w-5 h-5" /> },
  { id: 4, text: "SEO: Posicionamiento para 'ventanas', 'puertas' y 'divisiones'.", icon: <Users className="w-5 h-5" /> }
];

export const ACTIONABLE_INSIGHTS: Insight[] = [
  {
    title: "Análisis de Fricción Remota",
    description: "Al no tener a los usuarios cerca, el diseño debe ser ultra-intuitivo (Self-Explanatory). Si el usuario duda 2 segundos en el cotizador, lo perdemos.",
    type: 'actionable'
  },
  {
    title: "El MVP como herramienta de Research",
    description: "Usaremos eventos de clic en cada tipo de material para saber qué productos tienen más interés en esa localidad específica.",
    type: 'actionable'
  },
  {
    title: "Jerarquía por Volumen de Venta",
    description: "Mantenimiento, Ventanas y Puertas deben ser los accesos rápidos principales en la Home.",
    type: 'observation'
  }
];

export const INFORMATION_ARCHITECTURE: IANode = {
  label: "Home (Página de Inicio)",
  children: [
    {
      label: "Catálogo Interactivo",
      children: [
        { 
          label: "Sistemas de Ventanería", 
          children: [{ label: "Corredizas/Abatibles" }, { label: "Línea Europea" }] 
        },
        { 
          label: "Puertas y Fachadas", 
          children: [{ label: "Puertas Principales" }, { label: "Fachadas de Vidrio" }, { label: "Puertas-Ventana" }] 
        },
        { 
          label: "Soluciones de Baño y Espacios", 
          children: [{ label: "Divisiones de Baño" }, { label: "Barandales" }, { label: "Marquesinas" }] 
        },
        { label: "Perfiles de Aluminio (Distribución)" }
      ]
    },
    {
      label: "Cotizador m² (Captura de Datos)",
      description: "Nuestra principal fuente de datos de usuario. Mide qué dimensiones y materiales buscan más."
    },
    {
      label: "Servicios de Mantenimiento",
      description: "Sección dedicada al servicio #1 más vendido."
    },
    {
      label: "Centro de Confianza",
      children: [
        { label: "Proyectos Realizados (Portafolio)" },
        { label: "Información Legal y Garantías" },
        { label: "Sobre Nosotros" }
      ]
    },
    {
      label: "Contacto y Conversión",
      children: [
        { label: "WhatsApp (Tracking de Clics)" },
        { label: "Formulario de Agendamiento" },
        { label: "Zonas de Cobertura" }
      ]
    }
  ]
};
