export interface Testimonial {
  id: string
  name: string
  role: string
  quote: string
}

// TODO: testimonios de ejemplo — reemplazar con testimonios reales de clientes.
export const TESTIMONIALS: Testimonial[] = [
  {
    id: 't1',
    name: 'Laura M.',
    role: 'Dueña de negocio local',
    quote:
      'Instalaron las cámaras de mi negocio en un día y me enseñaron a revisarlas desde el celular. Excelente servicio.',
  },
  {
    id: 't2',
    name: 'Roberto G.',
    role: 'Cliente frecuente',
    quote:
      'Me armaron mi PC para edición de video justo con el presupuesto que tenía. Quedó funcionando increíble.',
  },
  {
    id: 't3',
    name: 'Oficinas Contables del Centro',
    role: 'Cliente empresarial',
    quote:
      'Nos hicieron el cableado de red de toda la oficina y desde entonces no hemos tenido un solo problema de conexión.',
  },
]
