import { coverArt } from '../lib/coverArt'

export type PortfolioCategory = 'armado' | 'redes' | 'cctv'

export interface PortfolioItem {
  id: string
  title: string
  category: PortfolioCategory
  image: string
  description: string
}

export const PORTFOLIO_CATEGORY_LABELS: Record<PortfolioCategory, string> = {
  armado: 'Armados',
  redes: 'Redes',
  cctv: 'CCTV',
}

// TODO: portadas ilustradas generadas en SVG (lib/coverArt) — reemplazar por fotos reales de proyectos.
export const PORTFOLIO_ITEMS: PortfolioItem[] = [
  {
    id: 'pc-gamer-1',
    title: 'PC Gamer a la medida',
    category: 'armado',
    image: coverArt('armado', 0),
    description: 'Equipo gamer armado con componentes seleccionados según presupuesto del cliente.',
  },
  {
    id: 'pc-oficina-1',
    title: 'Estaciones de trabajo para oficina',
    category: 'armado',
    image: coverArt('armado', 1),
    description: 'Lote de equipos de oficina armados e instalados para una empresa local.',
  },
  {
    id: 'red-empresa-1',
    title: 'Cableado estructurado empresarial',
    category: 'redes',
    image: coverArt('redes', 2),
    description: 'Instalación de cableado estructurado y switches para oficina de 20 puestos.',
  },
  {
    id: 'wifi-negocio-1',
    title: 'Red WiFi para negocio',
    category: 'redes',
    image: coverArt('redes', 3),
    description: 'Configuración de red WiFi de cobertura total para restaurante.',
  },
  {
    id: 'cctv-negocio-1',
    title: 'Sistema CCTV para negocio',
    category: 'cctv',
    image: coverArt('cctv', 4),
    description: 'Instalación de 8 cámaras con monitoreo remoto para tienda de conveniencia.',
  },
  {
    id: 'cctv-casa-1',
    title: 'Videovigilancia residencial',
    category: 'cctv',
    image: coverArt('cctv', 5),
    description: 'Cámaras de seguridad con acceso desde celular para casa habitación.',
  },
]
