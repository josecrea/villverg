---
name: VILLVERG
description: Web corporativa clásica de grupo inmobiliario premium para una sola sociedad de Tenerife Sur con dos oficios, electricidad y vivienda.
colors:
  noche: "#0f2a3d"
  noche-hondo: "#0a1d2b"
  blanco: "#fbfaf7"
  piedra: "#ece7de"
  laton: "#7a5c2e"
  laton-claro: "#d2b07a"
  tinta: "#1d2329"
  tinta-suave: "#55606a"
  linea: "rgba(15, 42, 61, 0.14)"
  linea-clara: "rgba(251, 250, 247, 0.22)"
typography:
  display:
    fontFamily: "'Fraunces', Georgia, 'Times New Roman', serif"
    fontSize: "clamp(2.8rem, 1.6rem + 5vw, 5.75rem)"
    fontWeight: 600
    lineHeight: 1.06
    letterSpacing: "-0.012em"
  headline:
    fontFamily: "'Fraunces', Georgia, 'Times New Roman', serif"
    fontSize: "clamp(2.3rem, 1.6rem + 3vw, 3.9rem)"
    fontWeight: 500
    lineHeight: 1.06
    letterSpacing: "-0.012em"
  title:
    fontFamily: "'Fraunces', Georgia, 'Times New Roman', serif"
    fontSize: "clamp(1.2rem, 1.05rem + 0.6vw, 1.45rem)"
    fontWeight: 500
    lineHeight: 1.5
  body:
    fontFamily: "'Manrope', 'Helvetica Neue', Arial, sans-serif"
    fontSize: "1.0625rem"
    fontWeight: 400
    lineHeight: 1.65
  label:
    fontFamily: "'Manrope', 'Helvetica Neue', Arial, sans-serif"
    fontSize: "0.8125rem"
    fontWeight: 600
    lineHeight: 1.65
    letterSpacing: "0.01em"
rounded:
  none: "0px"
spacing:
  margen: "clamp(1.25rem, 0.5rem + 3.5vw, 4.5rem)"
  seccion: "clamp(5rem, 3.5rem + 7vw, 10rem)"
  ancho: "80rem"
  fila: "0.9rem"
components:
  button-claro:
    backgroundColor: "{colors.blanco}"
    textColor: "{colors.noche}"
    rounded: "{rounded.none}"
    padding: "0.85rem 1.6rem"
    height: "52px"
  button-claro-hover:
    backgroundColor: "{colors.laton-claro}"
  button-borde:
    backgroundColor: "transparent"
    textColor: "{colors.blanco}"
    rounded: "{rounded.none}"
    padding: "0.85rem 1.6rem"
    height: "52px"
  button-borde-hover:
    backgroundColor: "{colors.blanco}"
    textColor: "{colors.noche}"
  button-oscuro:
    backgroundColor: "{colors.noche}"
    textColor: "{colors.blanco}"
    rounded: "{rounded.none}"
    padding: "0.85rem 1.6rem"
    height: "52px"
  button-oscuro-hover:
    backgroundColor: "{colors.noche-hondo}"
  marca-fila:
    backgroundColor: "{colors.piedra}"
    textColor: "{colors.tinta-suave}"
  marca-fila-invertida:
    backgroundColor: "{colors.blanco}"
    textColor: "{colors.tinta-suave}"
  contacto-banda:
    backgroundColor: "{colors.noche}"
    textColor: "{colors.blanco}"
  pie:
    backgroundColor: "{colors.noche-hondo}"
    textColor: "{colors.blanco}"
---

# Design System: VILLVERG

## Overview

**Creative North Star: "El Registro con Vistas"**

Una sociedad seria que se deja ver con el paisaje delante. El sitio combina dos cosas que los grupos inmobiliarios premium (Engel & Völkers, Sotheby's International Realty, Lucas Fox) hacen bien: fotografía real y grande del sur de Tenerife a sangre, y la sobriedad de un documento mercantil, con datos comprobables en filetes finos. La portada es una foto con el titular en Fraunces; el resto alterna filas partidas foto/texto, una banda de paisaje y fichas de datos.

La densidad es baja y el aire es generoso (secciones de 5 a 10rem). La jerarquía sale de la escala: un serif de alto contraste muy grande frente a una sans de texto discreta. No hay tarjetas iguales en rejilla, ni insignias, ni sombras de caja, ni esquinas redondeadas. La marca reparte; no vende servicios, y el diseño debe dejarse leer como respaldo, no como protagonista.

**Key Characteristics:**
- Fotografía a sangre, sin marcos, sin sombras de caja, sin radios.
- Fraunces para titulares y cifras clave; Manrope para texto e interfaz.
- Azul noche atlántico, blanco cálido, piedra clara; latón como único acento.
- Datos en listas de definición (`dl`) con filetes finos, no en tarjetas.
- Movimiento solo en la entrada de la portada y en transiciones de estado.

## Colors

Paleta de noche atlántica sobre papel cálido, con un único metal. Los neutros están teñidos hacia el azul o hacia la piedra; no hay gris puro.

### Primary
- **Azul Noche Atlántico** (`noche`, #0f2a3d): color de titulares sobre claro, fondo de la banda de contacto, botón oscuro y color del logotipo en cabecera sólida. Es la voz principal.
- **Azul Noche Hondo** (`noche-hondo`, #0a1d2b): pie de página, hover del botón oscuro y base de los degradados que oscurecen la foto de portada.

### Secondary
- **Latón** (`laton`, #7a5c2e): acento sobre fondos claros, usado en el oficio de cada marca (Fraunces) y en las viñetas de los textos legales.
- **Latón Claro** (`laton-claro`, #d2b07a): acento sobre fondos oscuros y estado interactivo: filete bajo el correo de contacto, hover de enlaces sobre noche, hover del botón claro, anillo de foco y selección de texto.

### Neutral
- **Blanco Cálido** (`blanco`, #fbfaf7): fondo de página y texto sobre noche. Nunca #fff.
- **Piedra Clara** (`piedra`, #ece7de): fondo de las filas de marca alternas.
- **Tinta** (`tinta`, #1d2329): texto principal.
- **Tinta Suave** (`tinta-suave`, #55606a): párrafos secundarios, etiquetas (`dt`).
- **Filete** (`linea`, rgba(15,42,61,0.14)) y **Filete Claro** (`linea-clara`, rgba(251,250,247,0.22)): separadores de listas de datos sobre claro y sobre oscuro.

### Named Rules
**The One Metal Rule.** El latón es el único acento y aparece en pequeñas dosis: un oficio, un filete, un foco. Nunca como relleno de superficie ni como segundo color de botón.
**The Warm Paper Rule.** Los fondos claros son Blanco Cálido o Piedra; los textos sobre foto o noche son Blanco Cálido, no blanco puro.

## Typography

**Display Font:** Fraunces (con Georgia, serif), autoalojada, pesos 400-700, eje óptico 9-144, `font-optical-sizing: auto`.
**Body Font:** Manrope (con Helvetica Neue, Arial, sans-serif), autoalojada, pesos 300-800.

**Character:** Un serif didone de contraste extremo con una geométrica humanista y neutra: editorial y de registro a la vez. El serif habla, la sans informa.

### Hierarchy
- **Display** (600, clamp(2.8rem, 1.6rem + 5vw, 5.75rem), 1.06): solo el titular de la portada, máximo 14ch, en blanco sobre foto.
- **Headline** (500, clamp(2.3rem, 1.6rem + 3vw, 3.9rem), 1.06): h2 de sección y nombre de marca (h3), también h1 de textos legales y 404. `text-wrap: balance`.
- **Title** (500 serif, clamp(1.2rem, 1.05rem + 0.6vw, 1.45rem)): entradilla de la portada y párrafos de presentación en sans a este tamaño; el oficio de cada marca en serif.
- **Body** (400, 1.0625rem, 1.65): texto corrido, máximo 64ch (70ch en legales).
- **Label** (600, 0.8125rem a 0.9375rem, tracking 0.01em): botones, menú (500), `dt` de fichas, pies de foto. En minúsculas y mayúscula inicial; sin versalitas.
- **Logotipo** (Fraunces 600, 1.45rem, tracking 0.32em, mayúsculas por contenido): la palabra VILLVERG; 1.15rem en pantallas de menos de 420px y 1.1rem en el pie.

### Named Rules
**The Serif Speaks Rule.** Fraunces solo para titulares, cifras clave, oficio de marca, correo destacado y logotipo. Nada de interfaz (botones, menú, etiquetas) en serif.
**The Lining Figures Rule.** Cifras de datos con `tabular-nums` o `lining-nums` para que CIF, teléfono y registro se lean como documento.

## Layout

Contenedor de 80rem (`ancho`) con margen lateral fluido `clamp(1.25rem, 0.5rem + 3.5vw, 4.5rem)`. Ritmo vertical por sección `clamp(5rem, 3.5rem + 7vw, 10rem)`, con la presentación a 0,8 de ese valor por debajo. Las cuadrículas de dos columnas se activan a 960px (presentación 1.35fr/1fr, empresa 1fr/1.3fr, contacto 1.2fr/1fr) con huecos de 6rem; las filas de marca parten a 900px (1.15fr/1fr, alternando el lado de la foto) con altura mínima `min(86vh, 54rem)`.

La portada ocupa `max(100svh, 40rem)`, con el texto abajo a la izquierda. La cabecera es absoluta y transparente sobre la portada; en el resto de páginas es estática, con fondo claro y filete inferior. En menos de 720px se ocultan los enlaces opcionales del menú (queda Contacto y el teléfono) y el pie vertical de la foto. La banda de paisaje mide `clamp(22rem, 55vw, 44rem)`. Las cifras de presentación usan `auto-fit` con mínimo de 13rem.

### Named Rules
**The Split Row Rule.** Las marcas se presentan en filas partidas foto/texto que alternan lado y fondo (piedra, blanco). Nunca en rejilla de tarjetas iguales.

## Elevation & Depth

Plano. No hay sombras de caja en ningún componente: la profundidad la dan la fotografía, el cambio de fondo entre secciones (blanco, piedra, noche, noche hondo) y los filetes de 1px. Las únicas sombras son de texto, difusas y de legibilidad sobre foto (titular de portada, pie vertical, pie de la banda), y los degradados de noche que oscurecen la foto bajo el texto (50 % arriba en el 22 % superior; 90 % abajo hasta transparente).

### Named Rules
**The Flat Paper Rule.** Superficies planas en reposo y en hover. El hover cambia color de fondo, de texto o de filete; el único desplazamiento es el zoom lento de la foto de marca (scale 1.025 en 1.4s).

## Shapes

Esquina recta en todo: botones, fotos, filas, fichas. Radio cero es la regla del sistema. La forma la dan los filetes finos de 1px (sobre claro `linea`, sobre oscuro `linea-clara`, y el filete de 1px en noche que abre la ficha de empresa) y la fotografía a sangre sin marco. El botón de borde usa 1px en blanco al 75 % de opacidad.

## Components

### Buttons
- **Shape:** rectangular, sin radio, mínimo 52px de alto, relleno 0,85rem 1,6rem, Manrope 600 a 0,9375rem.
- **Claro (primario sobre foto):** fondo Blanco Cálido, texto noche. Hover: fondo Latón Claro.
- **Borde (secundario sobre foto):** transparente, filete blanco al 75 %, texto blanco. Hover: se rellena de blanco con texto noche.
- **Oscuro (sobre claro):** fondo noche, texto blanco. Hover: noche hondo.
- **Transición:** 0,35s con `--ease` cubic-bezier(0.16, 1, 0.3, 1). Foco: anillo de 2px en Latón Claro con desfase de 4px.

### Navigation
Cabecera con logotipo espaciado a la izquierda y menú a la derecha en Manrope 500 a 0,9375rem. Los enlaces subrayan con un filete de 1px que crece de izquierda a derecha en 0,45s al pasar el cursor. El teléfono va separado por un filete vertical al 35 % del color actual. Sobre portada es blanco; en cabecera sólida, noche.

### Fila de marca (componente firma)
Foto a sangre en un lado y texto en el otro: nombre de marca (Headline, noche), oficio en Fraunces latón, párrafo en tinta suave, lista de datos con filetes (`dt` tinta suave, `dd` 600 noche alineado a la derecha) y un botón oscuro. La foto se amplía ligeramente al pasar el cursor por la fila. Debajo, una línea sobria para marcas sin web propia (solo nombre en negrita, sin enlace).

### Ficha de datos
Lista de definición con filete superior de 1px en noche y filetes inferiores `linea`. En escritorio, rejilla de 11rem para el término y el resto para el valor; el término en Label tinta suave, el valor en tinta con cifras tabulares. Se usa para los datos de la sociedad y, en versión compacta, en cifras de presentación y contacto.

### Banda de contacto
Fondo noche, titular Headline en blanco, correo en Fraunces grande con filete de Latón Claro que cambia a texto latón claro al pasar el cursor, y lista de datos con filetes claros.

## Do's and Don'ts

### Do:
- **Do** abrir cada sección con fotografía real del sur de Tenerife a sangre o con un titular Fraunces de gran escala sobre aire.
- **Do** escribir «#Okservice.es» siempre con almohadilla y con .es, y «VILLVERG SOLUCIONES INTEGRALES SL» como razón social exacta.
- **Do** presentar datos de la sociedad como listas de definición con filetes de 1px, no como tarjetas.
- **Do** mantener esquina recta (0px) y superficies planas; que cambie el color, no la sombra.
- **Do** reservar el latón para una sola pieza pequeña por zona: oficio, filete o foco.
- **Do** respetar `prefers-reduced-motion`: la animación de entrada de la portada (2,2s la foto, 1,2s el texto, escalonado de 0,12s) es la única del sitio.

### Don't:
- **Don't** usar rejillas de tarjetas iguales ni insignias sobre la portada.
- **Don't** añadir sombras de caja, radios ni bordes decorativos a fotos y botones.
- **Don't** usar Fraunces para interfaz ni cuerpo de texto.
- **Don't** introducir un segundo acento junto al latón, ni blanco puro ni grises neutros.
- **Don't** inventar cifras, trayectoria ni testimonios: la ficha solo lleva datos comprobables.

## Notas de contraste (no canonizadas)

El build contiene dos desviaciones que este documento no convierte en regla. El contrato de dirección pedía «filetes finos de latón», pero la hoja usa filetes azul noche al 14 % casi en todo y latón solo en el correo, el oficio y las viñetas. El latón se oscureció de #8a6a38 a #7a5c2e para que el oficio de marca pase AA: 5,02:1 sobre piedra y 5,92:1 sobre blanco cálido.
