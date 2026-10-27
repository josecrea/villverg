#!/usr/bin/env node
// Genera el sitio estático de villverg.com en la raíz del repositorio.
// Cabecera, pie y <head> se escriben UNA vez aquí y se comparten entre páginas:
// así el NAP y los datos legales no pueden divergir de una página a otra.
// Uso: node tools/build.js

'use strict';
const fs = require('fs');
const path = require('path');

const RAIZ = path.join(__dirname, '..');
// Se sirve como sitio de proyecto de GitHub Pages: josecrea.github.io/villverg.
// Todas las rutas internas llevan BASE delante; si algún día se apunta villverg.com,
// basta con BASE = '' y SITIO = 'https://villverg.com' (y volver a añadir el CNAME).
const BASE = '/villverg';
const SITIO = `https://josecrea.github.io${BASE}`;

// Datos de la sociedad. Única fuente de verdad del sitio.
const EMPRESA = {
  razonSocial: 'VILLVERG SOLUCIONES INTEGRALES SL',
  cif: 'B19430115',
  domicilio: 'C/ Mencey Anaga 23, portal 1-19',
  cp: '38639',
  localidad: 'San Miguel de Abona',
  provincia: 'Santa Cruz de Tenerife',
  telefono: '+34679325222',
  telefonoVisible: '679 32 52 22',
  email: 'villverg@gmail.com',
};

const MARCAS = [
  {
    nombre: '#Okservice.es',
    url: 'https://okservice.es/',
    dominio: 'okservice.es',
    eyebrow: 'Instalaciones eléctricas',
    texto: 'Electricista autorizado en Tenerife Sur: averías los 7 días, boletines CIE, cuadros, puntos de recarga y fotovoltaica.',
    detalle: 'Empresa instaladora habilitada en baja tensión, nº 25094 del Gobierno de Canarias, con base en Granadilla de Abona y el precio dicho antes de salir.',
  },
  {
    nombre: "Villa's Properties",
    url: 'https://villasproperties.es/',
    dominio: 'villasproperties.es',
    eyebrow: 'Inmobiliaria',
    texto: 'Compraventa de viviendas en el sur de Tenerife, con valoraciones apoyadas en precios escriturados y Catastro.',
    detalle: 'Para quien vende, quien compra y quien invierte desde fuera de la isla.',
  },
  {
    nombre: 'biovida.shop',
    url: null, // la tienda no responde por HTTPS a 27-oct-2026: no se enlaza hasta que funcione
    dominio: 'biovida.shop',
    eyebrow: 'Tienda online',
    texto: 'La línea de comercio electrónico del grupo.',
    detalle: 'Facturada por la misma sociedad, con el mismo CIF y la misma numeración que el resto de marcas.',
  },
];

const ICONO_RAYO = '<svg class="ico-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M13 2 4.5 13.5H11l-1 8.5 8.5-11.5H12l1-8.5Z"/></svg>';
const ICONO_CASA = '<svg class="ico-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 10.5 12 3l9 7.5"/><path d="M5 9.5V21h14V9.5"/><path d="M10 21v-6h4v6"/></svg>';
const ICONO_BOLSA = '<svg class="ico-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 7h14l-1 14H6L5 7Z"/><path d="M9 7a3 3 0 0 1 6 0"/></svg>';
const ICONOS = [ICONO_RAYO, ICONO_CASA, ICONO_BOLSA];

const escapar = (s) => String(s)
  .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

function schemaOrganizacion() {
  const marcasConWeb = MARCAS.filter((m) => m.url);
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${SITIO}/#organization`,
    name: 'VILLVERG',
    legalName: EMPRESA.razonSocial,
    vatID: `ES${EMPRESA.cif}`,
    taxID: EMPRESA.cif,
    url: `${SITIO}/`,
    telephone: EMPRESA.telefono,
    email: EMPRESA.email,
    address: {
      '@type': 'PostalAddress',
      streetAddress: EMPRESA.domicilio,
      postalCode: EMPRESA.cp,
      addressLocality: EMPRESA.localidad,
      addressRegion: EMPRESA.provincia,
      addressCountry: 'ES',
    },
    brand: MARCAS.map((m) => ({ '@type': 'Brand', name: m.nombre })),
    subOrganization: marcasConWeb.map((m) => ({ '@type': 'Organization', name: m.nombre, url: m.url })),
  };
}

function head({ titulo, descripcion, ruta, indexable = true, schema = null }) {
  const canonical = `${SITIO}${ruta}`;
  const ld = schema ? `\n<script type="application/ld+json">\n${JSON.stringify(schema, null, 1)}\n</script>` : '';
  return `<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${escapar(titulo)}</title>
<meta name="description" content="${escapar(descripcion)}">
<meta name="robots" content="${indexable ? 'index,follow' : 'noindex,follow'}">
<link rel="canonical" href="${canonical}">
<meta name="theme-color" content="#111827">
<meta name="author" content="${EMPRESA.razonSocial}">
<meta property="og:type" content="website">
<meta property="og:site_name" content="VILLVERG">
<meta property="og:locale" content="es_ES">
<meta property="og:title" content="${escapar(titulo)}">
<meta property="og:description" content="${escapar(descripcion)}">
<meta property="og:url" content="${canonical}">
<meta property="og:image" content="${SITIO}/assets/img/hero-poster.jpg">
<link rel="icon" href="${BASE}/favicon.svg" type="image/svg+xml">
<link rel="preload" as="font" type="font/woff2" href="${BASE}/assets/fonts/assistant-latin.woff2" crossorigin>
<link rel="stylesheet" href="${BASE}/assets/css/site.css">
<link rel="stylesheet" href="${BASE}/assets/css/villverg.css">${ld}
</head>`;
}

function cabecera(activa) {
  const enlace = (href, texto, clave) => (clave === activa
    ? `<a href="${href}" class="is-active" aria-current="page">${texto}</a>`
    : `<a href="${href}">${texto}</a>`);
  return `<body>
<a class="skip" href="#contenido">Ir al contenido</a>

<header class="site-head">
  <div class="nav-pill">
    <a class="brand brand-texto" href="${BASE}/" aria-label="VILLVERG — inicio">VILL<span>VERG</span></a>
    <nav class="site-nav" aria-label="Navegación principal">
      ${enlace(`${BASE}/`, 'Inicio', 'inicio')}
      <a href="${BASE}/#marcas">Marcas</a>
      <a href="${BASE}/#sociedad" class="is-optional">La sociedad</a>
      <a href="${BASE}/#contacto" class="is-optional">Contacto</a>
      <a class="btn btn-accion btn-sm" href="tel:${EMPRESA.telefono}">Llamar</a>
    </nav>
  </div>
</header>
`;
}

function pie() {
  const anio = new Date().getFullYear();
  const listaMarcas = MARCAS.map((m) => (m.url
    ? `<li><a href="${m.url}" rel="noopener">${escapar(m.nombre)}</a></li>`
    : `<li>${escapar(m.nombre)}</li>`)).join('\n            ');
  return `
<footer class="site-foot">
  <div class="wrap">
    <div class="foot-top">
      <div class="foot-marca">
        <a class="brand-texto" href="${BASE}/">VILL<span>VERG</span></a>
        <p>Una sola sociedad en Tenerife Sur detrás de varias marcas: instalaciones eléctricas, inmobiliaria y comercio online.</p>
        <ul class="foot-atajos">
          <li><a href="tel:${EMPRESA.telefono}"><strong>${EMPRESA.telefonoVisible}</strong></a></li>
          <li><a href="mailto:${EMPRESA.email}">${EMPRESA.email}</a></li>
        </ul>
      </div>
      <div class="foot-cols">
        <div>
          <h2>Marcas</h2>
          <ul>
            ${listaMarcas}
          </ul>
        </div>
        <div>
          <h2>Información legal</h2>
          <ul>
            <li><a href="${BASE}/aviso-legal.html">Aviso legal</a></li>
            <li><a href="${BASE}/privacidad.html">Política de privacidad</a></li>
          </ul>
        </div>
      </div>
    </div>
    <div class="legal">
      <p><strong>${EMPRESA.razonSocial}</strong> · CIF ${EMPRESA.cif} · ${EMPRESA.domicilio}, ${EMPRESA.cp} ${EMPRESA.localidad} (${EMPRESA.provincia})</p>
      <p>© ${anio} VILLVERG. En Canarias las operaciones llevan IGIC, no IVA.</p>
    </div>
  </div>
</footer>
</body>
</html>
`;
}

function tarjetaMarca(m, i) {
  const contenido = `
          <span class="ico">${ICONOS[i] || ICONO_RAYO}</span>
          <p class="eyebrow">${escapar(m.eyebrow)}</p>
          <h3>${escapar(m.nombre)}</h3>
          <p>${escapar(m.texto)}</p>
          <p class="detail">${escapar(m.detalle)}</p>
          <span class="marca-url">${escapar(m.dominio)}</span>`;
  return m.url
    ? `        <a class="service" href="${m.url}" rel="noopener">${contenido}
          <span class="tag">Visitar la web</span>
        </a>`
    : `        <div class="service sin-enlace">${contenido}
        </div>`;
}

function paginaInicio() {
  return `${head({
    titulo: 'VILLVERG · Sociedad de Tenerife Sur detrás de #Okservice.es y Villa\'s Properties',
    descripcion: 'VILLVERG SOLUCIONES INTEGRALES SL (CIF B19430115): una sola sociedad en Tenerife Sur con varias marcas — instalaciones eléctricas, inmobiliaria y tienda online.',
    ruta: '/',
    schema: schemaOrganizacion(),
  })}
${cabecera('inicio')}
<main id="contenido">

  <section class="hero" aria-labelledby="h-hero">
    <div class="wrap hero-grid">
      <div>
        <p class="eyebrow eyebrow-claro">VILLVERG SOLUCIONES INTEGRALES SL</p>
        <h1 id="h-hero">Una sociedad,<br><span class="ray">varias marcas</span></h1>
        <p class="hero-lead">Desde Tenerife Sur damos servicio con nombres distintos según lo que necesites: electricidad, vivienda o compra online.</p>
        <p class="hero-lead hero-lead-2">Detrás de todas está la misma empresa, con el mismo CIF y la misma responsabilidad.</p>
        <div class="hero-actions">
          <a class="btn btn-accion" href="#marcas">Ver las marcas</a>
          <a class="btn btn-linea" href="#contacto">Contacto</a>
        </div>
      </div>
      <aside class="price-card" aria-labelledby="h-ficha">
        <p class="eyebrow" id="h-ficha">Ficha de la sociedad</p>
        <dl class="datos">
          <div><dt>Razón social</dt><dd>VILLVERG SOLUCIONES INTEGRALES SL</dd></div>
          <div><dt>CIF</dt><dd>${EMPRESA.cif}</dd></div>
          <div><dt>Domicilio</dt><dd>${EMPRESA.localidad} (Tenerife)</dd></div>
          <div><dt>Instalador autorizado BT</dt><dd>nº 25094</dd></div>
        </dl>
      </aside>
    </div>
  </section>

  <div class="trust">
    <div class="wrap">
      <span>${ICONO_RAYO.replace('ico-svg', 'ico-mini')} Sociedad única · <b>CIF ${EMPRESA.cif}</b></span>
      <span>Base en <b>Tenerife Sur</b></span>
      <span>Facturación con <b>IGIC</b></span>
    </div>
  </div>

  <section class="section" id="marcas" aria-labelledby="h-marcas">
    <div class="wrap">
      <div class="section-head">
        <p class="eyebrow">Nuestras marcas</p>
        <h2 id="h-marcas">Cada necesidad, <span class="mark">su marca</span></h2>
        <p>Cada marca tiene su web, su equipo y su forma de trabajar. Ninguna es una empresa aparte: todas son VILLVERG.</p>
      </div>
      <div class="services">
${MARCAS.map(tarjetaMarca).join('\n')}
      </div>
    </div>
  </section>

  <section class="section section-warm" id="sociedad" aria-labelledby="h-soc">
    <div class="wrap">
      <div class="section-head">
        <p class="eyebrow">La sociedad</p>
        <h2 id="h-soc">Por qué <span class="mark">una sola empresa</span></h2>
      </div>
      <ol class="steps">
        <li class="step"><h3>Un solo responsable</h3><p>Contratas con la marca que conoces, pero quien responde es la sociedad, con su CIF y su domicilio.</p></li>
        <li class="step"><h3>Una sola numeración</h3><p>Todas las marcas facturan con la misma serie correlativa: lo que exige la normativa de facturación.</p></li>
        <li class="step"><h3>Arraigo local</h3><p>Domicilio en San Miguel de Abona y trabajo diario en el sur de Tenerife.</p></li>
      </ol>
    </div>
  </section>

  <section class="section" id="contacto" aria-labelledby="h-contacto">
    <div class="wrap hero-grid">
      <div class="section-head section-head-flush">
        <p class="eyebrow">Contacto</p>
        <h2 id="h-contacto">Hablemos</h2>
        <p>Para un servicio concreto, lo más rápido es la web de la marca. Para asuntos de la sociedad —proveedores, administración, colaboraciones— escríbenos o llámanos.</p>
        <div class="hero-actions">
          <a class="btn btn-accion" href="tel:${EMPRESA.telefono}">Llamar ${EMPRESA.telefonoVisible}</a>
          <a class="btn btn-linea" href="mailto:${EMPRESA.email}">Escribir un correo</a>
        </div>
      </div>
      <div class="price-card">
        <p class="eyebrow">Datos de contacto</p>
        <dl class="datos">
          <div><dt>Teléfono</dt><dd><a href="tel:${EMPRESA.telefono}">${EMPRESA.telefonoVisible}</a></dd></div>
          <div><dt>Correo</dt><dd><a href="mailto:${EMPRESA.email}">${EMPRESA.email}</a></dd></div>
          <div><dt>Domicilio social</dt><dd>${EMPRESA.domicilio}<br>${EMPRESA.cp} ${EMPRESA.localidad}</dd></div>
        </dl>
      </div>
    </div>
  </section>

</main>
${pie()}`;
}

function paginaTexto({ archivo, titulo, descripcion, h1, cuerpo }) {
  return [archivo, `${head({ titulo: `${titulo} · VILLVERG`, descripcion, ruta: `/${archivo}`, indexable: false })}
${cabecera(null)}
<main id="contenido">
  <section class="section">
    <div class="wrap texto-legal">
      <p class="eyebrow">VILLVERG</p>
      <h1>${h1}</h1>
${cuerpo}
    </div>
  </section>
</main>
${pie()}`];
}

const DATOS_IDENTIFICATIVOS = `      <ul>
        <li>Titular: ${EMPRESA.razonSocial}</li>
        <li>CIF: ${EMPRESA.cif}</li>
        <li>Domicilio: ${EMPRESA.domicilio}, ${EMPRESA.cp} ${EMPRESA.localidad} (${EMPRESA.provincia})</li>
        <li>Teléfono: ${EMPRESA.telefonoVisible}</li>
        <li>Correo electrónico: <a href="mailto:${EMPRESA.email}">${EMPRESA.email}</a></li>
      </ul>`;

const AVISO_LEGAL = paginaTexto({
  archivo: 'aviso-legal.html',
  titulo: 'Aviso legal',
  descripcion: 'Aviso legal de villverg.com, titularidad de VILLVERG SOLUCIONES INTEGRALES SL.',
  h1: 'Aviso legal',
  cuerpo: `      <h2>Titular del sitio</h2>
      <p>En cumplimiento del artículo 10 de la Ley 34/2002, de servicios de la sociedad de la información y de comercio electrónico, se informa de los datos del titular de este sitio web:</p>
${DATOS_IDENTIFICATIVOS}
      <h2>Objeto</h2>
      <p>Este sitio presenta la sociedad y sus marcas comerciales. No se contratan servicios ni se venden productos desde aquí: cada marca tiene su propia web con sus condiciones.</p>
      <h2>Propiedad intelectual</h2>
      <p>Los textos, el diseño y las marcas que aparecen en este sitio pertenecen a ${EMPRESA.razonSocial} o se usan con autorización. No se permite su reproducción sin consentimiento.</p>
      <h2>Enlaces</h2>
      <p>Los enlaces a las webs de las marcas llevan a sitios de la misma sociedad. No respondemos del contenido de sitios de terceros.</p>
      <h2>Legislación aplicable</h2>
      <p>Este aviso se rige por la legislación española.</p>`,
});

const PRIVACIDAD = paginaTexto({
  archivo: 'privacidad.html',
  titulo: 'Política de privacidad',
  descripcion: 'Política de privacidad de villverg.com.',
  h1: 'Política de privacidad',
  cuerpo: `      <h2>Responsable del tratamiento</h2>
${DATOS_IDENTIFICATIVOS}
      <h2>Qué datos tratamos</h2>
      <p>Este sitio no tiene formularios, no usa cookies ni herramientas de analítica y no recoge datos personales al navegar. Solo tratamos los datos que nos facilites si nos escribes o nos llamas.</p>
      <h2>Para qué y con qué base</h2>
      <p>Para responder a tu consulta, con base en tu consentimiento al contactarnos (artículo 6.1.a del Reglamento (UE) 2016/679) o en la aplicación de medidas precontractuales si nos pides un servicio (artículo 6.1.b).</p>
      <h2>Cuánto tiempo</h2>
      <p>El necesario para atender la consulta y, si hay relación comercial, los plazos que exige la normativa fiscal y mercantil.</p>
      <h2>Tus derechos</h2>
      <p>Puedes ejercer los derechos de acceso, rectificación, supresión, oposición, limitación y portabilidad escribiendo a <a href="mailto:${EMPRESA.email}">${EMPRESA.email}</a>. Si no quedas conforme, puedes reclamar ante la Agencia Española de Protección de Datos (<a href="https://www.aepd.es" rel="noopener">aepd.es</a>).</p>
      <h2>Alojamiento</h2>
      <p>El sitio se sirve desde GitHub Pages (GitHub, Inc.), que puede registrar la dirección IP de las visitas por motivos técnicos y de seguridad, según su propia política de privacidad.</p>`,
});

const PAGINA_404 = ['404.html', `${head({ titulo: 'Página no encontrada · VILLVERG', descripcion: 'Esta página no existe.', ruta: '/404.html', indexable: false })}
${cabecera(null)}
<main id="contenido">
  <section class="section">
    <div class="wrap">
      <p class="eyebrow">Error 404</p>
      <h1 class="h-404">Esta página no existe</h1>
      <p>Puede que el enlace esté mal escrito o que la página se haya movido.</p>
      <div class="hero-actions"><a class="btn btn-accion" href="${BASE}/">Volver al inicio</a></div>
    </div>
  </section>
</main>
${pie()}`];

const FAVICON = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><rect width="64" height="64" rx="14" fill="#111827"/><path d="M14 16h9l9 24 9-24h9L37 50h-10Z" fill="#f1de27"/></svg>
`;

const SITEMAP = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url><loc>${SITIO}/</loc></url>
</urlset>
`;

const LLMS = `# VILLVERG

> ${EMPRESA.razonSocial} (CIF ${EMPRESA.cif}) es una única sociedad con domicilio en ${EMPRESA.localidad}, Tenerife (Canarias, España). Opera con varias marcas comerciales; ninguna es una empresa independiente.

## Marcas
${MARCAS.map((m) => `- ${m.nombre}${m.url ? ` (${m.url})` : ''}: ${m.texto}`).join('\n')}

## Contacto de la sociedad
- Teléfono: ${EMPRESA.telefonoVisible}
- Correo: ${EMPRESA.email}
- Domicilio social: ${EMPRESA.domicilio}, ${EMPRESA.cp} ${EMPRESA.localidad} (${EMPRESA.provincia})
`;

const SALIDAS = [
  ['index.html', paginaInicio()],
  AVISO_LEGAL,
  PRIVACIDAD,
  PAGINA_404,
  ['favicon.svg', FAVICON],
  ['sitemap.xml', SITEMAP],
  ['llms.txt', LLMS],
  ['.nojekyll', ''],
];

for (const [archivo, contenido] of SALIDAS) {
  fs.writeFileSync(path.join(RAIZ, archivo), contenido);
  console.log(`escrito ${archivo}`);
}
