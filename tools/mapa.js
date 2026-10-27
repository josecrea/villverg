// Mapa de curvas de nivel del sur de Tenerife, generado al construir (SVG en línea, sin JS).
// No es cartografía exacta: es la ladera sur bajando del Teide al Atlántico, con la
// posición relativa real de los sitios de la empresa (Granadilla al este de San Miguel,
// Las Chafiras junto a la costa). Determinista: misma semilla, mismo dibujo.

'use strict';

const ANCHO = 720;
const ALTO = 640;
const CUMBRE = { x: 300, y: -70 }; // el Teide, fuera del encuadre por arriba
const NIVELES = 26;
const NIVEL_COSTA = 17;            // a partir de aquí, mar
const PUNTOS_POR_CURVA = 96;

// Ruido suave y determinista: suma de senos con fases fijas.
function ruido(angulo, nivel) {
  return 0.075 * Math.sin(3 * angulo + 0.7 + nivel * 0.21)
    + 0.05 * Math.sin(5 * angulo + 2.1 + nivel * 0.37)
    + 0.028 * Math.sin(9 * angulo + 4.3 + nivel * 0.53)
    + 0.016 * Math.sin(14 * angulo + 1.3 + nivel * 0.11);
}

function radio(nivel) {
  // Más juntas arriba (ladera empinada), más separadas al llegar a la costa.
  return 60 + 20 * nivel + 0.55 * nivel * nivel;
}

function puntosCurva(nivel) {
  const r = radio(nivel);
  return Array.from({ length: PUNTOS_POR_CURVA }, (_, i) => {
    const a = (i / PUNTOS_POR_CURVA) * Math.PI * 2;
    const k = 1 + ruido(a, nivel);
    // Ladera sur más larga que la norte: elipse algo estirada hacia abajo.
    return { x: CUMBRE.x + Math.cos(a) * r * 1.18 * k, y: CUMBRE.y + Math.sin(a) * r * k };
  });
}

// Catmull-Rom cerrada → Bézier cúbicas.
function trazo(p) {
  const n = p.length;
  const f = (v) => v.toFixed(1);
  let d = `M${f(p[0].x)} ${f(p[0].y)}`;
  for (let i = 0; i < n; i += 1) {
    const p0 = p[(i - 1 + n) % n];
    const p1 = p[i];
    const p2 = p[(i + 1) % n];
    const p3 = p[(i + 2) % n];
    const c1 = { x: p1.x + (p2.x - p0.x) / 6, y: p1.y + (p2.y - p0.y) / 6 };
    const c2 = { x: p2.x - (p3.x - p1.x) / 6, y: p2.y - (p3.y - p1.y) / 6 };
    d += `C${f(c1.x)} ${f(c1.y)} ${f(c2.x)} ${f(c2.y)} ${f(p2.x)} ${f(p2.y)}`;
  }
  return `${d}Z`;
}

/**
 * @param {{x:number,y:number,titulo:string,detalle:string,lado?:'izq'|'der'}[]} sitios
 * @returns {string} SVG
 */
function mapa(sitios) {
  const curvas = Array.from({ length: NIVELES }, (_, i) => i + 1);
  const costa = trazo(puntosCurva(NIVEL_COSTA));
  const tierra = curvas.filter((n) => n < NIVEL_COSTA)
    .map((n) => `<path class="curva${n % 5 === 0 ? ' curva-maestra' : ''}" style="--i:${n}" d="${trazo(puntosCurva(n))}"/>`)
    .join('');
  const mar = curvas.filter((n) => n > NIVEL_COSTA)
    .map((n) => `<path class="isobata" style="--i:${n}" d="${trazo(puntosCurva(n))}"/>`)
    .join('');
  const marcas = sitios.map((s) => {
    const izq = s.lado === 'izq';
    const tx = izq ? s.x - 14 : s.x + 14;
    const ancla = izq ? 'end' : 'start';
    return `<g class="sitio">
      <circle class="sitio-halo" cx="${s.x}" cy="${s.y}" r="11"/>
      <circle class="sitio-punto" cx="${s.x}" cy="${s.y}" r="5"/>
      <text x="${tx}" y="${s.y - 2}" text-anchor="${ancla}" class="sitio-titulo">${s.titulo}</text>
      <text x="${tx}" y="${s.y + 15}" text-anchor="${ancla}" class="sitio-detalle">${s.detalle}</text>
    </g>`;
  }).join('');

  return `<svg class="mapa" viewBox="0 0 ${ANCHO} ${ALTO}" role="img" aria-labelledby="mapa-t mapa-d" preserveAspectRatio="xMidYMin slice">
  <title id="mapa-t">El sur de Tenerife en curvas de nivel</title>
  <desc id="mapa-d">La ladera sur baja del Teide al Atlántico. Marcados: Granadilla de Abona, base de #Okservice.es, y Las Chafiras, en San Miguel de Abona, domicilio de la sociedad y de Villa's Properties.</desc>
  <rect class="mar" width="${ANCHO}" height="${ALTO}"/>
  ${mar}
  <path class="tierra" d="${costa}"/>
  ${tierra}
  <path class="costa" d="${costa}"/>
  <text class="rotulo-mar" x="${ANCHO * 0.6}" y="${ALTO - 30}" text-anchor="middle">Océano Atlántico</text>
  ${marcas}
</svg>`;
}

module.exports = { mapa };
