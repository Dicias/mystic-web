import type { LucideIcon } from 'lucide-react'
import { Cpu, Wrench, Network, Camera } from 'lucide-react'

export interface Service {
  id: string
  title: string
  shortDescription: string
  description: string
  icon: LucideIcon
  bullets: string[]
}

// TODO: contenido de ejemplo — reemplazar con la descripción real de cada servicio.
export const SERVICES: Service[] = [
  {
    id: 'venta-armado',
    title: 'Venta de Equipos y Armado de PCs Personalizadas',
    shortDescription: 'Equipos nuevos y PCs a la medida según tu uso y presupuesto.',
    description:
      'Vendemos equipos de cómputo nuevos y armamos PCs personalizadas para gaming, oficina, diseño gráfico o edición de video, seleccionando cada componente según tu presupuesto y necesidades.',
    icon: Cpu,
    bullets: [
      'Asesoría personalizada de componentes',
      'Equipos gamer, de oficina y para diseño/edición',
      'Garantía en equipos armados',
      'Cotización sin compromiso',
    ],
  },
  {
    id: 'reparacion',
    title: 'Reparación y Mantenimiento',
    shortDescription: 'Diagnóstico, reparación y mantenimiento preventivo o correctivo.',
    description:
      'Diagnosticamos y reparamos fallas de hardware y software, damos mantenimiento preventivo y correctivo, y ayudamos a recuperar información de equipos dañados.',
    icon: Wrench,
    bullets: [
      'Diagnóstico sin costo',
      'Mantenimiento preventivo y correctivo',
      'Eliminación de virus y malware',
      'Recuperación de datos',
    ],
  },
  {
    id: 'redes',
    title: 'Redes e Infraestructura',
    shortDescription: 'Cableado estructurado, WiFi y redes empresariales.',
    description:
      'Diseñamos e instalamos infraestructura de red para hogares y empresas: cableado estructurado, configuración de routers y switches, y redes WiFi confiables.',
    icon: Network,
    bullets: [
      'Cableado estructurado certificado',
      'Configuración de routers y switches',
      'Redes WiFi empresariales',
      'Soporte y mantenimiento de red',
    ],
  },
  {
    id: 'cctv',
    title: 'CCTV y Videovigilancia',
    shortDescription: 'Instalación y monitoreo remoto de cámaras de seguridad.',
    description:
      'Instalamos y configuramos sistemas de circuito cerrado de cámaras (CCTV) con acceso remoto desde tu celular o computadora, para el cuidado de tu hogar o negocio.',
    icon: Camera,
    bullets: [
      'Instalación de cámaras IP y análogas',
      'Monitoreo remoto desde celular',
      'Grabación en NVR/DVR',
      'Mantenimiento de sistemas existentes',
    ],
  },
]
