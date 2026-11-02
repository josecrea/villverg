# villverg.com

Web corporativa de **VILLVERG SOLUCIONES INTEGRALES SL** (CIF B19430115): la sociedad y sus marcas (#Okservice.es, Villa's Properties, biovida.shop).

Diseño: web corporativa clásica al nivel de los grupos inmobiliarios premium (elegido por Jose). Fotografía real del sur de Tenerife a sangre, Fraunces + Manrope autoalojadas, azul noche, blanco cálido, piedra y latón (`assets/css/villverg.css`). Procedencia de cada foto en `assets/img/*.json`. Contexto de producto en `PRODUCT.md`; sistema en `DESIGN.md`.

## Construir

```sh
node tools/build.js
```

Genera en la raíz `index.html`, `aviso-legal.html`, `privacidad.html`, `404.html`, `robots.txt`, `sitemap.xml`, `llms.txt`, `CNAME` y `favicon.svg`. Los datos de la sociedad y las marcas están solo en `tools/build.js` (`EMPRESA`, `MARCAS`): se cambian ahí y se vuelve a construir.

## Alojamiento

El sitio se sirve en **https://villverg.com/** con GitHub Pages desde `main` (raíz). El fichero `CNAME` de la raíz fija el dominio; en `tools/build.js`, `BASE = ''` y `SITIO = 'https://villverg.com'`. josecrea.github.io/villverg redirige a villverg.com.

DNS en IONOS:

| Tipo | Host | Valor |
|------|------|-------|
| A | @ | 185.199.108.153 |
| A | @ | 185.199.109.153 |
| A | @ | 185.199.110.153 |
| A | @ | 185.199.111.153 |
| AAAA | @ | 2606:50c0:8000::153 |
| AAAA | @ | 2606:50c0:8001::153 |
| AAAA | @ | 2606:50c0:8002::153 |
| AAAA | @ | 2606:50c0:8003::153 |
| CNAME | www | josecrea.github.io |

HTTPS obligatorio (Enforce HTTPS activado en GitHub Pages).

Para volver a josecrea.github.io/villverg, mira el comentario de `BASE` en `tools/build.js`.
