import type { PortfolioCategory } from '../data/portfolioItems'

// Hand-drawn SVG covers for portfolio projects, generated as data URIs so any
// <img> (including the WorksWheel) can use them. They stand in until real job
// photos exist: each category gets its own line drawing in the blueprint style
// of the hero, and the index shifts the accent and composition so no two
// covers look identical.

const W = 580
const H = 400

const ACCENTS = ['#e0231c', '#ffd400', '#f5f5f4']

function tower(accent: string) {
  // PC tower in three-quarter view: case, glass panel, GPU, fans, RAM sticks.
  return `
  <g fill="none" stroke="#f5f5f4" stroke-opacity=".75" stroke-width="2" stroke-linejoin="round">
    <path d="M220 80 L380 80 L410 60 L410 300 L380 320 L220 320 Z"/>
    <path d="M380 80 L380 320 M220 80 L250 60 L410 60"/>
    <rect x="236" y="98" width="128" height="204" rx="4" stroke-opacity=".35"/>
    <rect x="252" y="210" width="100" height="26" rx="3" stroke="${accent}" stroke-opacity="1"/>
    <path d="M262 223 h80" stroke="${accent}" stroke-dasharray="4 5"/>
    <circle cx="300" cy="150" r="30" stroke="${accent}" stroke-opacity=".9"/>
    <circle cx="300" cy="150" r="6" fill="${accent}" stroke="none"/>
    <path d="M300 120 v24 M330 150 h-24 M300 180 v-24 M270 150 h24" stroke="${accent}" stroke-opacity=".6"/>
    <rect x="340" y="116" width="8" height="54" rx="1.5" stroke-opacity=".6"/>
    <rect x="352" y="116" width="8" height="54" rx="1.5" stroke-opacity=".6"/>
    <circle cx="300" cy="272" r="16" stroke-opacity=".5"/>
  </g>`
}

function network(accent: string) {
  // Star-and-mesh topology: a core switch fanning out to rack, APs and desks.
  const nodes: [number, number][] = [
    [150, 110], [430, 100], [120, 270], [460, 290], [290, 330], [210, 190], [380, 200],
  ]
  const core: [number, number] = [290, 200]
  const links = nodes
    .map(([x, y]) => `<path d="M${core[0]} ${core[1]} L${x} ${y}"/>`)
    .join('')
  const mesh = `<path d="M150 110 L210 190 L120 270 M430 100 L380 200 L460 290 M120 270 L290 330 L460 290" stroke-dasharray="3 6"/>`
  const dots = nodes
    .map(
      ([x, y], i) =>
        `<circle cx="${x}" cy="${y}" r="${i < 5 ? 9 : 6}" fill="#0a0a0a" stroke="${i % 2 ? accent : '#f5f5f4'}"/>`,
    )
    .join('')
  return `
  <g fill="none" stroke="#f5f5f4" stroke-opacity=".6" stroke-width="1.6">
    ${links}${mesh}
    <rect x="262" y="180" width="56" height="40" rx="6" fill="#0a0a0a" stroke="${accent}" stroke-opacity="1" stroke-width="2"/>
    <path d="M272 194 h36 M272 206 h22" stroke="${accent}" stroke-opacity="1"/>
    ${dots}
  </g>`
}

function camera(accent: string) {
  // Dome-less bullet camera on a wall mount, with its field of view sweeping out.
  return `
  <defs>
    <linearGradient id="fov" x1="0" x2="1">
      <stop offset="0" stop-color="${accent}" stop-opacity=".35"/>
      <stop offset="1" stop-color="${accent}" stop-opacity="0"/>
    </linearGradient>
  </defs>
  <path d="M300 170 L540 70 L540 330 Z" fill="url(#fov)"/>
  <g fill="none" stroke="#f5f5f4" stroke-opacity=".8" stroke-width="2" stroke-linejoin="round">
    <path d="M110 120 v100 M110 170 h50 l20 -10"/>
    <rect x="170" y="140" width="130" height="56" rx="12" transform="rotate(-8 235 168)"/>
    <circle cx="300" cy="160" r="20" stroke="${accent}" stroke-opacity="1"/>
    <circle cx="300" cy="160" r="8" fill="${accent}" stroke="none"/>
    <path d="M300 170 L540 70 M300 170 L540 330" stroke="${accent}" stroke-opacity=".7" stroke-dasharray="5 6"/>
    <circle cx="200" cy="150" r="3" fill="#e0231c" stroke="none"/>
  </g>`
}

const DRAW: Record<PortfolioCategory, (accent: string) => string> = {
  armado: tower,
  redes: network,
  cctv: camera,
}

const LABEL: Record<PortfolioCategory, string> = {
  armado: 'BUILD',
  redes: 'NETWORK',
  cctv: 'SECURITY',
}

export function coverArt(category: PortfolioCategory, index: number) {
  const accent = ACCENTS[index % ACCENTS.length]
  const glowX = index % 2 ? 140 : 440
  const num = String(index + 1).padStart(2, '0')

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}">
  <defs>
    <radialGradient id="g" cx="${glowX}" cy="200" r="340" gradientUnits="userSpaceOnUse">
      <stop offset="0" stop-color="${accent}" stop-opacity=".22"/>
      <stop offset="1" stop-color="#0a0a0a" stop-opacity="0"/>
    </radialGradient>
    <pattern id="p" width="24" height="24" patternUnits="userSpaceOnUse">
      <circle cx="1" cy="1" r="1" fill="#fff" fill-opacity=".09"/>
    </pattern>
  </defs>
  <rect width="${W}" height="${H}" fill="#101010"/>
  <rect width="${W}" height="${H}" fill="url(#p)"/>
  <rect width="${W}" height="${H}" fill="url(#g)"/>
  ${DRAW[category](accent)}
  <g font-family="ui-monospace, Menlo, monospace" font-size="12" fill="#f5f5f4" fill-opacity=".55" letter-spacing="2">
    <text x="24" y="34">MYSAC / ${LABEL[category]}</text>
    <text x="${W - 24}" y="34" text-anchor="end">${num}</text>
    <text x="24" y="${H - 22}">QRO · MX</text>
  </g>
  <rect x=".5" y=".5" width="${W - 1}" height="${H - 1}" fill="none" stroke="#fff" stroke-opacity=".08"/>
</svg>`

  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`
}
