import { BUSINESS } from '../data/business'

export function buildWhatsAppLink(message: string): string {
  return `https://wa.me/${BUSINESS.whatsappNumber}?text=${encodeURIComponent(message)}`
}

export function quoteMessage(serviceName: string): string {
  return `Hola MySaC, me gustaría solicitar una cotización para: ${serviceName}.`
}
