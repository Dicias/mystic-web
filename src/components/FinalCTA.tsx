import { SectionReveal } from './SectionReveal'
import { WhatsAppCTA } from './WhatsAppButton'
import { BUSINESS } from '../data/business'

/** Closing call to action shared by every page, right above the footer. */
export function FinalCTA() {
  return (
    <section className="relative overflow-hidden border-t border-white/10 py-32 sm:py-44">
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[32rem] w-[32rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand-red/20 blur-[140px]" />
      <div className="bg-hairline-grid pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_at_center,black_10%,transparent_65%)]" />
      <SectionReveal className="relative mx-auto max-w-5xl px-4 text-center sm:px-6">
        <h2 className="text-balance text-5xl font-semibold leading-[0.95] tracking-[-0.05em] text-white sm:text-7xl lg:text-8xl">
          ¿Tu equipo necesita{' '}
          <span className="font-serif font-normal italic tracking-[-0.02em] text-brand-red">atención</span>?
        </h2>
        <p className="mx-auto mt-8 max-w-lg text-lg text-neutral-400">
          Diagnóstico sin costo y respuesta el mismo día. Escríbenos y te decimos qué necesita tu equipo.
        </p>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
          <WhatsAppCTA message="Hola MySaC, me gustaría solicitar una cotización.">
            Solicitar cotización
          </WhatsAppCTA>
          <a
            href={`tel:+52${BUSINESS.phoneDisplay.replace(/\s/g, '')}`}
            className="inline-flex min-h-12 items-center rounded-xl px-6 py-3 font-mono text-sm tracking-wider text-neutral-300 transition-colors hover:text-white"
          >
            {BUSINESS.phoneDisplay}
          </a>
        </div>
      </SectionReveal>
    </section>
  )
}
