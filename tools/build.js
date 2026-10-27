#!/usr/bin/env node
// Genera el sitio estático de VILLVERG en la raíz del repositorio.
// Cabecera, pie y <head> se escriben UNA vez aquí y se comparten entre páginas:
// así los datos de la sociedad no pueden divergir de una página a otra.
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

// Datos de la sociedad: única fuente de verdad del sitio. Los legales son los mismos
// que publican okservice.es y villasproperties.es, porque es la misma empresa.
const EMPRESA = {
  razonSocial: 'VILLVERG SOLUCIONES INTEGRALES SL',
  cif: 'B19430115',
  domicilio: 'C/ Mencey Anaga 23, portal 1, puerta 19, Residencial Biltmore, Las Chafiras',
  cp: '38639',
  localidad: 'San Miguel de Abona',
  provincia: 'Santa Cruz de Tenerife',
  telefono: '+34679325222',
  telefonoVisible: '679 32 52 22',
  email: 'info@villverg.com',
  instalador: '25094',
  // Datos registrales tal como figuran en el pie de factura de Odoo (res.company 1).
  // La hoja «TF» corresponde al Registro Mercantil de Santa Cruz de Tenerife.
  registro: 'Registro Mercantil de Santa Cruz de Tenerife, sección 8, hoja TF-73004, inscripción 2 (27/09/2024)',
  irus: '1000429977910',
};

const escapar = (s) => String(s)
  .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

function schemaOrganizacion() {
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
    brand: [
      { '@type': 'Brand', name: '#Okservice.es', url: 'https://okservice.es/' },
      { '@type': 'Brand', name: "Villa's Properties", url: 'https://villasproperties.es/' },
      { '@type': 'Brand', name: 'biovida.shop' },
    ],
  };
}

function head({ titulo, descripcion, ruta, indexable = true, schema = null, precarga = '' }) {
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
<meta name="theme-color" content="#0f2a3d">
<meta name="author" content="${EMPRESA.razonSocial}">
<meta property="og:type" content="website">
<meta property="og:site_name" content="VILLVERG">
<meta property="og:locale" content="es_ES">
<meta property="og:title" content="${escapar(titulo)}">
<meta property="og:description" content="${escapar(descripcion)}">
<meta property="og:url" content="${canonical}">
<meta property="og:image" content="${SITIO}/assets/img/portada-1400.webp">
<link rel="icon" href="${BASE}/favicon.svg" type="image/svg+xml">
<link rel="preload" as="font" type="font/woff2" href="${BASE}/assets/fonts/bodoni-moda-latin.woff2" crossorigin>
<link rel="preload" as="font" type="font/woff2" href="${BASE}/assets/fonts/manrope-latin.woff2" crossorigin>${precarga}
<link rel="stylesheet" href="${BASE}/assets/css/villverg.css">${ld}
</head>`;
}

// En la portada la cabecera va transparente sobre la foto; en el resto, sólida.
function cabecera({ solida = false } = {}) {
  return `<body>
<a class="saltar" href="#contenido">Ir al contenido</a>
<header class="cabecera${solida ? ' cabecera-solida' : ''}">
  <div class="cabecera-fila">
    <a class="logotipo" href="${BASE}/" aria-label="VILLVERG, inicio">VILLVERG</a>
    <nav class="menu" aria-label="Principal">
      <a class="menu-opcional" href="${BASE}/#marcas">Marcas</a>
      <a class="menu-opcional" href="${BASE}/#empresa">La empresa</a>
      <a href="${BASE}/#contacto">Contacto</a>
      <a class="menu-telefono" href="tel:${EMPRESA.telefono}">${EMPRESA.telefonoVisible}</a>
    </nav>
  </div>
</header>
`;
}

function pie() {
  const anio = new Date().getFullYear();
  return `
<footer class="pie">
  <div class="contenedor pie-fila">
    <a class="logotipo" href="${BASE}/">VILLVERG</a>
    <p>© ${anio} ${EMPRESA.razonSocial}, CIF ${EMPRESA.cif}. ${EMPRESA.localidad}, Tenerife.</p>
    <nav aria-label="Información legal">
      <a href="${BASE}/aviso-legal.html">Aviso legal</a>
      <a href="${BASE}/privacidad.html">Privacidad</a>
    </nav>
  </div>
</footer>
</body>
</html>
`;
}

const IMG = `${BASE}/assets/img`;

function paginaInicio() {
  const precarga = `
<link rel="preload" as="image" href="${IMG}/portada-1400.webp" imagesrcset="${IMG}/portada-movil-900.webp 900w, ${IMG}/portada-1400.webp 1400w, ${IMG}/portada-2400.webp 2400w" imagesizes="(min-width: 1200px) 2400px, 100vw" fetchpriority="high">`;
  return `${head({
    titulo: "VILLVERG · Electricidad y vivienda en el sur de Tenerife",
    descripcion: `${EMPRESA.razonSocial} (CIF ${EMPRESA.cif}) es la empresa de San Miguel de Abona, Tenerife, detrás de #Okservice.es, electricista autorizado, y Villa's Properties, inmobiliaria.`,
    ruta: '/',
    schema: schemaOrganizacion(),
    precarga,
  })}
${cabecera()}
<main id="contenido">

  <section class="portada" aria-labelledby="h-portada">
    <picture class="portada-foto">
      <source media="(max-width: 719px)" srcset="${IMG}/portada-movil-900.webp">
      <img src="${IMG}/portada-1400.webp" srcset="${IMG}/portada-1400.webp 1400w, ${IMG}/portada-2400.webp 2400w" sizes="(min-width: 1200px) 2400px, 100vw" width="2400" height="1352" alt="Campo de golf de Amarilla junto al mar, en San Miguel de Abona" fetchpriority="high">
    </picture>
    <div class="portada-texto">
      <h1 id="h-portada">Electricidad y vivienda en el sur de Tenerife</h1>
      <p class="portada-entradilla">Una sola empresa con dos oficios: instalamos la luz de tu casa y te ayudamos a comprarla o venderla.</p>
      <div class="portada-acciones">
        <a class="boton boton-claro" href="https://okservice.es/" rel="noopener">Ir a #Okservice.es</a>
        <a class="boton boton-borde" href="https://villasproperties.es/" rel="noopener">Ir a Villa's Properties</a>
      </div>
    </div>
    <p class="portada-pie">Amarilla Golf, San Miguel de Abona</p>
  </section>

  <section class="presentacion" aria-labelledby="h-presentacion">
    <div class="contenedor">
      <div class="presentacion-rejilla">
        <h2 id="h-presentacion">Detrás de cada marca, la misma firma</h2>
        <p>VILLVERG trabaja con un nombre para cada oficio. Ninguna marca es una empresa aparte: todas facturan desde esta sociedad, con el mismo CIF y la misma responsabilidad.</p>
      </div>
      <dl class="cifras">
        <div><dt>Instalador autorizado en baja tensión</dt><dd>nº ${EMPRESA.instalador}</dd></div>
        <div><dt>Domicilio social</dt><dd>Las Chafiras, San Miguel</dd></div>
        <div><dt>CIF</dt><dd>${EMPRESA.cif}</dd></div>
      </dl>
    </div>
  </section>

  <div id="marcas">
    <article class="marca" aria-labelledby="h-okservice">
      <figure class="marca-foto">
        <img src="${IMG}/okservice-1280.webp" srcset="${IMG}/okservice-800.webp 800w, ${IMG}/okservice-1280.webp 1280w" sizes="(min-width: 900px) 55vw, 100vw" width="1280" height="720" loading="lazy" alt="Placas solares en una azotea">
      </figure>
      <div class="marca-texto">
        <h3 id="h-okservice">#Okservice.es</h3>
        <p class="marca-oficio">Electricista autorizado</p>
        <p>Averías los siete días, boletines eléctricos, cuadros, puntos de recarga para coche eléctrico y placas solares en el sur de Tenerife. El precio se dice antes de salir.</p>
        <dl class="marca-datos">
          <div><dt>Empresa instaladora</dt><dd>nº ${EMPRESA.instalador}</dd></div>
          <div><dt>Base</dt><dd>Granadilla de Abona</dd></div>
        </dl>
        <a class="boton boton-oscuro" href="https://okservice.es/" rel="noopener">Ir a okservice.es</a>
      </div>
    </article>

    <article class="marca marca-invertida" aria-labelledby="h-villas">
      <figure class="marca-foto">
        <img src="${IMG}/villas-1500.webp" srcset="${IMG}/villas-800.webp 800w, ${IMG}/villas-1500.webp 1500w" sizes="(min-width: 900px) 55vw, 100vw" width="1500" height="1000" loading="lazy" alt="Terraza con vistas a la piscina y las palmeras del Residencial Biltmore, en Las Chafiras">
      </figure>
      <div class="marca-texto">
        <h3 id="h-villas">Villa's Properties</h3>
        <p class="marca-oficio">Inmobiliaria</p>
        <p>Compra, venta e inversión en vivienda en el sur de Tenerife. Las valoraciones se apoyan en precios escriturados y en Catastro, no solo en lo que piden los anuncios.</p>
        <dl class="marca-datos">
          <div><dt>Zona</dt><dd>Sur de Tenerife</dd></div>
          <div><dt>Oficina</dt><dd>Las Chafiras</dd></div>
        </dl>
        <a class="boton boton-oscuro" href="https://villasproperties.es/" rel="noopener">Ir a villasproperties.es</a>
      </div>
    </article>

    <div class="otras-marcas">
      <div class="contenedor"><p>También forma parte de VILLVERG <strong>biovida.shop</strong>, la tienda online del grupo.</p></div>
    </div>
  </div>

  <figure class="banda">
    <img src="${IMG}/costa-1500.webp" srcset="${IMG}/costa-800.webp 800w, ${IMG}/costa-1500.webp 1500w" sizes="100vw" width="1500" height="1000" loading="lazy" alt="Jardines y piscina en Torviscas, Adeje, con La Gomera al fondo">
    <figcaption>Torviscas, Adeje. Al fondo, La Gomera.</figcaption>
  </figure>

  <section class="empresa" id="empresa" aria-labelledby="h-empresa">
    <div class="contenedor empresa-rejilla">
      <div>
        <h2 id="h-empresa">La empresa</h2>
        <p>VILLVERG es una sociedad limitada con domicilio en Las Chafiras, San Miguel de Abona. Si eres proveedor, banco o colaborador, estos son sus datos.</p>
      </div>
      <dl class="ficha">
        <div><dt>Razón social</dt><dd>${EMPRESA.razonSocial}</dd></div>
        <div><dt>CIF</dt><dd>${EMPRESA.cif}</dd></div>
        <div><dt>Domicilio social</dt><dd>${EMPRESA.domicilio}, ${EMPRESA.cp} ${EMPRESA.localidad} (${EMPRESA.provincia})</dd></div>
        <div><dt>Registro</dt><dd>${EMPRESA.registro}. IRUS ${EMPRESA.irus}</dd></div>
        <div><dt>Empresa instaladora</dt><dd>Autorizada en baja tensión, nº ${EMPRESA.instalador}, Gobierno de Canarias</dd></div>
        <div><dt>Impuesto indirecto</dt><dd>IGIC (Canarias)</dd></div>
      </dl>
    </div>
  </section>

  <section class="contacto" id="contacto" aria-labelledby="h-contacto">
    <div class="contenedor contacto-rejilla">
      <div>
        <h2 id="h-contacto">Hablemos</h2>
        <p>Para un trabajo eléctrico o una vivienda, lo más rápido es la web de cada marca. Para todo lo demás, escríbenos.</p>
        <a class="contacto-correo" href="mailto:${EMPRESA.email}">${EMPRESA.email}</a>
      </div>
      <dl class="contacto-lista">
        <div><dt>Teléfono</dt><dd><a href="tel:${EMPRESA.telefono}">${EMPRESA.telefonoVisible}</a></dd></div>
        <div><dt>Electricidad</dt><dd><a href="https://okservice.es/" rel="noopener">okservice.es</a></dd></div>
        <div><dt>Vivienda</dt><dd><a href="https://villasproperties.es/" rel="noopener">villasproperties.es</a></dd></div>
        <div><dt>Domicilio</dt><dd>Las Chafiras, ${EMPRESA.cp} ${EMPRESA.localidad}</dd></div>
      </dl>
    </div>
  </section>

</main>
${pie()}`;
}

function paginaTexto({ archivo, titulo, descripcion, entradilla, cuerpo }) {
  return [archivo, `${head({ titulo: `${titulo} · VILLVERG`, descripcion, ruta: `/${archivo}`, indexable: false })}
${cabecera({ solida: true })}
<main id="contenido" class="legal">
  <div class="contenedor">
    <h1>${titulo}</h1>
    <p class="entradilla">${entradilla}</p>
${cuerpo}
  </div>
</main>
${pie()}`];
}

const DATOS_TITULAR = `    <ul>
      <li>Denominación social: ${EMPRESA.razonSocial}</li>
      <li>CIF: ${EMPRESA.cif}</li>
      <li>Inscrita en el ${EMPRESA.registro}. IRUS ${EMPRESA.irus}</li>
      <li>Domicilio social: ${EMPRESA.domicilio}, ${EMPRESA.cp} ${EMPRESA.localidad}, ${EMPRESA.provincia}</li>
      <li>Teléfono: ${EMPRESA.telefonoVisible}</li>
      <li>Correo: <a href="mailto:${EMPRESA.email}">${EMPRESA.email}</a></li>
      <li>Empresa instaladora autorizada en baja tensión nº ${EMPRESA.instalador} ante la Dirección General de Industria del Gobierno de Canarias</li>
    </ul>`;

// Texto unificado con los avisos legales de villasproperties.es y okservice.es.
const AVISO_LEGAL = paginaTexto({
  archivo: 'aviso-legal.html',
  titulo: 'Aviso legal',
  descripcion: `Aviso legal del sitio de ${EMPRESA.razonSocial}.`,
  entradilla: 'Quién está detrás de esta web, con qué datos y en qué condiciones. Lo exige la Ley 34/2002 (LSSI-CE).',
  cuerpo: `    <h2>Titular del sitio</h2>
    <p>Este sitio web es propiedad de ${EMPRESA.razonSocial}, que opera con las marcas comerciales #Okservice.es, Villa's Properties y biovida.shop.</p>
${DATOS_TITULAR}
    <h2>Objeto</h2>
    <p>Este sitio presenta la sociedad y sus marcas. Desde aquí no se contratan servicios: cada marca tiene su web, con sus propias condiciones (<a href="https://okservice.es/terms" rel="noopener">okservice.es</a> y <a href="https://villasproperties.es/aviso-legal" rel="noopener">villasproperties.es</a>). El uso de la web implica la aceptación de estas condiciones.</p>
    <h2>Propiedad intelectual</h2>
    <p>Los textos, gráficos y el diseño de este sitio son de ${EMPRESA.razonSocial}, salvo que se indique otra cosa. Su reproducción total o parcial requiere autorización previa por escrito.</p>
    <h2>Enlaces</h2>
    <p>Las webs de las marcas pertenecen a la misma sociedad. De los sitios de terceros no controlamos ni respondemos de sus contenidos ni de sus políticas de privacidad.</p>
    <h2>Responsabilidad</h2>
    <p>${EMPRESA.razonSocial} no garantiza la disponibilidad continuada del sitio ni responde de los daños derivados de su uso, de su falta de disponibilidad o de errores en los contenidos, sin perjuicio de lo que disponga la normativa aplicable.</p>
    <h2>Protección de datos</h2>
    <p>El tratamiento de datos personales se explica en la <a href="${BASE}/privacidad.html">política de privacidad</a>.</p>
    <h2>Legislación y jurisdicción</h2>
    <p>Estas condiciones se rigen por la legislación española. Para cualquier controversia, las partes se someten a los juzgados y tribunales de Santa Cruz de Tenerife, salvo que la normativa de consumo establezca otro fuero.</p>
    <h2>Reclamaciones</h2>
    <p>Puedes dirigir cualquier reclamación a <a href="mailto:${EMPRESA.email}">${EMPRESA.email}</a>. La Comisión Europea ofrece además una plataforma de resolución de litigios en línea en <a href="https://ec.europa.eu/consumers/odr" rel="noopener">ec.europa.eu/consumers/odr</a>.</p>`,
});

const PRIVACIDAD = paginaTexto({
  archivo: 'privacidad.html',
  titulo: 'Política de privacidad',
  descripcion: `Política de privacidad del sitio de ${EMPRESA.razonSocial}.`,
  entradilla: 'Qué datos tratamos, para qué y cómo puedes ejercer tus derechos.',
  cuerpo: `    <h2>Responsable</h2>
    <p>${EMPRESA.razonSocial} es la responsable del tratamiento de los datos que nos facilites, tanto aquí como en las webs de sus marcas.</p>
${DATOS_TITULAR}
    <h2>Qué datos y para qué</h2>
    <p>Esta web no tiene formularios: solo tratamos los datos que nos des si nos escribes o nos llamas, para:</p>
    <ul>
      <li>Atender tu consulta y, si contratas, gestionar la relación con nosotros.</li>
      <li>Enviarte información sobre servicios parecidos a los que pediste, por interés legítimo en mantener la relación. Puedes oponerte cuando quieras.</li>
      <li>Cumplir las obligaciones fiscales, contables y legales.</li>
    </ul>
    <h2>Cuánto tiempo</h2>
    <p>El necesario para atender tu consulta y, si hay relación comercial, los plazos que fija la normativa fiscal y mercantil.</p>
    <h2>Tus derechos</h2>
    <p>Puedes ejercer los derechos de acceso, rectificación, supresión, oposición, limitación y portabilidad, y retirar cualquier consentimiento, escribiendo a <a href="mailto:${EMPRESA.email}">${EMPRESA.email}</a>. También puedes reclamar ante la Agencia Española de Protección de Datos (<a href="https://www.aepd.es" rel="noopener">aepd.es</a>).</p>
    <h2>Cookies</h2>
    <p>Esta web no usa cookies de análisis, de publicidad ni de perfilado, y no guarda nada en tu navegador. Las fuentes y los estilos se sirven desde el propio sitio.</p>
    <h2>Alojamiento</h2>
    <p>El sitio se sirve desde GitHub Pages (GitHub, Inc.), que puede registrar la dirección IP de las visitas por motivos técnicos y de seguridad según su propia política de privacidad.</p>`,
});

const PAGINA_404 = ['404.html', `${head({ titulo: 'Página no encontrada · VILLVERG', descripcion: 'Esta página no existe.', ruta: '/404.html', indexable: false })}
${cabecera({ solida: true })}
<main id="contenido" class="error">
  <div class="contenedor">
    <h1>Esta página no existe</h1>
    <p>Puede que el enlace esté mal escrito o que la página se haya movido.</p>
    <p><a class="boton boton-oscuro" href="${BASE}/">Volver al inicio</a></p>
  </div>
</main>
${pie()}`];

const FAVICON = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><rect width="64" height="64" rx="14" fill="#0f2a3d"/><path d="M14 16h9l9 24 9-24h9L37 50h-10Z" fill="#d2b07a"/></svg>
`;

const SITEMAP = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url><loc>${SITIO}/</loc></url>
</urlset>
`;

const LLMS = `# VILLVERG

> ${EMPRESA.razonSocial} (CIF ${EMPRESA.cif}) es una única sociedad con domicilio en ${EMPRESA.localidad}, Tenerife (Canarias, España). Opera con varias marcas comerciales; ninguna es una empresa independiente.

## Marcas
- #Okservice.es (https://okservice.es/): electricista autorizado en Tenerife Sur, empresa instaladora en baja tensión nº ${EMPRESA.instalador}.
- Villa's Properties (https://villasproperties.es/): inmobiliaria en el sur de Tenerife.
- biovida.shop: tienda online.

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
  process.stdout.write(`escrito ${archivo}\n`);
}
