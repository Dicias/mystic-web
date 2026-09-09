# MySaC — Sitio Web

Sitio web de MySaC (venta, mantenimiento y soporte a computadoras: reparación de equipos, armado
de PCs personalizadas, redes e infraestructura, y CCTV). SPA construida con Vite + React +
TypeScript + Tailwind CSS + Framer Motion.

## Desarrollo local

```bash
npm install
npm run dev
```

## Contenido a reemplazar

Todo el contenido de ejemplo (textos de "por qué elegirnos", testimonios, imágenes del
portafolio) vive en `src/data/*.ts` — edítalo ahí, no dentro de los componentes. Los datos reales
del negocio (teléfono, dirección, horario) ya están cargados en `src/data/business.ts`.

## Build de producción

```bash
npm run build   # genera dist/
npm run preview # sirve dist/ localmente para verificarlo
```

El sitio es una SPA 100% estática: `dist/` puede subirse tal cual a cualquiera de las siguientes
plataformas.

### Vercel

1. Sube el proyecto a un repositorio de GitHub.
2. En Vercel, "Add New Project" → importa el repositorio.
3. Vercel detecta Vite automáticamente (build command `npm run build`, output `dist`). No se
   necesita configuración adicional.

### GitHub Pages

El repo incluye `.github/workflows/deploy-gh-pages.yml`, que compila y publica `dist/` a la rama
`gh-pages` en cada push a `main`. Pasos:

1. Sube el proyecto a un repositorio de GitHub (por ejemplo `mysac-web`).
2. En GitHub → Settings → Pages, configura "Source" como la rama `gh-pages`.
3. El workflow compila con `VITE_BASE_PATH=/<nombre-del-repo>/` para que las rutas funcionen bajo
   `https://<usuario>.github.io/<nombre-del-repo>/`. Si el nombre del repo cambia, actualiza esa
   variable en el workflow.

### HostGator (hosting compartido)

1. Corre localmente: `npm run build` (usa `base: '/'`, el default).
2. Sube **el contenido** de la carpeta `dist/` (no la carpeta en sí) a `public_html/` vía FTP o el
   Administrador de Archivos de cPanel.
3. Como es una SPA con rutas de cliente (React Router), agrega un archivo `.htaccess` en
   `public_html/` con:

   ```apache
   <IfModule mod_rewrite.c>
     RewriteEngine On
     RewriteBase /
     RewriteRule ^index\.html$ - [L]
     RewriteCond %{REQUEST_FILENAME} !-f
     RewriteCond %{REQUEST_FILENAME} !-d
     RewriteRule . /index.html [L]
   </IfModule>
   ```

   Esto evita errores 404 al recargar páginas internas como `/servicios`.
