---
type: article
title: Mapa del código
description: Mapa en anchura del repo — dónde está cada cosa, no cómo funciona por dentro.
tags: [onboarding]
timestamp: 2026-11-01T00:00:00Z
topic: arquitectura
status: draft
sources: []
---

# Mapa del código

## Stack
Sitio **estático** en GitHub Pages, sin framework ni dependencias: HTML generado por un script de Node
(`tools/build.js`, solo módulos nativos `fs` y `path`), una hoja CSS y fuentes autoalojadas
(Fraunces y Manrope, licencia OFL en `assets/fonts/`). Sin `package.json`, sin npm, sin JavaScript en el navegador.

## Puntos de entrada
- `tools/build.js` — **única fuente de verdad**. Genera en la raíz `index.html`, `aviso-legal.html`,
  `privacidad.html`, `404.html`, `sitemap.xml`, `llms.txt` y `favicon.svg`. Los datos de la sociedad
  están solo en la constante `EMPRESA`; cabecera, pie y `<head>` se escriben una vez y se comparten.
- `assets/css/villverg.css` — hoja única (tokens en `:root`).
- Los `.html` de la raíz **no se editan a mano**: se cambia `build.js` y se ejecuta `node tools/build.js`.

## Flujo de una petición
Navegador → GitHub Pages (rama `main`, raíz) → fichero estático. Dominio `villverg.com` por el fichero
`CNAME`; DNS en IONOS (A ×4 y AAAA ×4 de GitHub, `www` CNAME a josecrea.github.io). HTTPS obligatorio.

## Módulos y responsables
- Contenido y datos: `tools/build.js` (funciones `head()`, `paginaTexto()`, portada, `PAGINA_404`).
- Estilo: `assets/css/villverg.css`, regido por `DESIGN.md`.
- Imágenes: `assets/img/*.webp`, cada una con su `.json` de procedencia (de dónde sale y qué edición tiene).
- Producto y público: `PRODUCT.md`. Briefs de superficie: `.impeccable/surfaces/`.

## Comportamiento oculto
Ninguno: sin crons, formularios, cookies ni analítica. **Fusionar en `main` = publicar** en villverg.com
(Pages recompila solo en ~1 min).

## Puntos calientes
`tools/build.js` (todo el contenido y los datos legales) y `assets/css/villverg.css`.

## Cómo arrancarlo
```sh
node tools/build.js                       # regenera el HTML
python3 -m http.server 8801 --bind 127.0.0.1   # y abrir http://127.0.0.1:8801/
```
Prueba de coherencia (la que usa la fábrica): `node tools/build.js && git diff --exit-code -- '*.html' sitemap.xml llms.txt`
— falla si alguien editó un `.html` a mano o no regeneró tras cambiar `build.js`.
