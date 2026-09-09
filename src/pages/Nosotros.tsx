import { Target, Eye, ShieldCheck, Users } from 'lucide-react'
import { SectionReveal } from '../components/SectionReveal'
import { CircuitBackground } from '../components/CircuitBackground'

// TODO: contenido de ejemplo — reemplazar con la historia y valores reales de MySaC.
const VALUES = [
  {
    icon: ShieldCheck,
    title: 'Confianza',
    description: 'Diagnósticos honestos y transparencia en cada cotización.',
  },
  {
    icon: Users,
    title: 'Cercanía',
    description: 'Trato personalizado, explicando cada solución en términos claros.',
  },
  {
    icon: Target,
    title: 'Compromiso',
    description: 'Cumplimos los tiempos acordados en cada servicio.',
  },
]

export function Nosotros() {
  return (
    <div className="relative mx-auto max-w-5xl px-4 py-16 sm:px-6">
      <CircuitBackground tone="light" className="opacity-40" />
      <div className="relative z-10">
      <SectionReveal className="mb-14 text-center">
        <h1 className="text-4xl font-extrabold text-brand-black">Sobre MySaC</h1>
        <p className="mx-auto mt-3 max-w-2xl text-neutral-600">
          Un equipo dedicado a mantener tu tecnología funcionando, sin complicaciones.
        </p>
      </SectionReveal>

      <SectionReveal className="mb-16 rounded-2xl bg-neutral-50 p-8 sm:p-10">
        <h2 className="mb-3 text-2xl font-bold text-brand-black">Nuestra historia</h2>
        <p className="text-neutral-600">
          MySaC nació de la pasión por la tecnología y las ganas de ofrecer un servicio técnico
          confiable en Querétaro. Con el tiempo, fuimos ampliando nuestros servicios de reparación
          de equipos hacia el armado de PCs personalizadas, instalación de redes y sistemas de
          videovigilancia, siempre bajo el mismo compromiso: resolver los problemas tecnológicos de
          nuestros clientes de forma rápida y honesta.
        </p>
      </SectionReveal>

      <div className="mb-16 grid gap-8 sm:grid-cols-2">
        <SectionReveal className="rounded-2xl border border-neutral-200 p-8">
          <Target className="mb-4 text-brand-red" size={32} />
          <h3 className="mb-2 text-xl font-bold text-brand-black">Misión</h3>
          <p className="text-neutral-600">
            Brindar soluciones tecnológicas confiables y accesibles para personas y negocios,
            desde la reparación de un equipo hasta la infraestructura completa de red y seguridad.
          </p>
        </SectionReveal>
        <SectionReveal delay={0.1} className="rounded-2xl border border-neutral-200 p-8">
          <Eye className="mb-4 text-brand-red" size={32} />
          <h3 className="mb-2 text-xl font-bold text-brand-black">Visión</h3>
          <p className="text-neutral-600">
            Ser el proveedor de referencia en soporte técnico, redes y videovigilancia en la
            región, reconocido por la calidad y cercanía de nuestro servicio.
          </p>
        </SectionReveal>
      </div>

      <SectionReveal>
        <h2 className="mb-8 text-center text-2xl font-bold text-brand-black">Nuestros valores</h2>
        <div className="grid gap-6 sm:grid-cols-3">
          {VALUES.map(({ icon: Icon, title, description }) => (
            <div key={title} className="rounded-2xl bg-neutral-50 p-6 text-center">
              <Icon className="mx-auto mb-3 text-brand-red" size={28} />
              <h3 className="mb-1 font-bold text-brand-black">{title}</h3>
              <p className="text-sm text-neutral-600">{description}</p>
            </div>
          ))}
        </div>
      </SectionReveal>
      </div>
    </div>
  )
}
