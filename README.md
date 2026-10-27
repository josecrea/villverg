# villverg.com

Web corporativa de **VILLVERG SOLUCIONES INTEGRALES SL** (CIF B19430115): la sociedad y sus marcas (#Okservice.es, Villa's Properties, biovida.shop).

Diseño propio (`assets/css/villverg.css`): paleta sacada del sur de Tenerife (basalto, toba, liquen, Atlántico), Bricolage Grotesque + Source Serif 4 autoalojadas, y un mapa de curvas de nivel del Teide a la costa generado en `tools/mapa.js` con las sedes marcadas. Textos legales unificados con los de okservice.es y villasproperties.es.

## Construir

```sh
node tools/build.js
```

Genera en la raíz `index.html`, `aviso-legal.html`, `privacidad.html`, `404.html`, `robots.txt`, `sitemap.xml`, `llms.txt`, `CNAME` y `favicon.svg`. Los datos de la sociedad y las marcas están solo en `tools/build.js` (`EMPRESA`, `MARCAS`): se cambian ahí y se vuelve a construir.

## Alojamiento

GitHub Pages desde `main` (raíz). Sitio de proyecto: **https://josecrea.github.io/villverg/** (`BASE` en `tools/build.js`). Si un día se quiere `villverg.com`: `BASE = ''`, añadir `CNAME` y estos DNS en IONOS:

| Tipo | Host | Valor |
|------|------|-------|
| A | @ | 185.199.108.153 |
| A | @ | 185.199.109.153 |
| A | @ | 185.199.110.153 |
| A | @ | 185.199.111.153 |
| CNAME | www | josecrea.github.io |
