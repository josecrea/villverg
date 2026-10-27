# villverg.com

Web corporativa de **VILLVERG SOLUCIONES INTEGRALES SL** (CIF B19430115): la sociedad y sus marcas (#Okservice.es, Villa's Properties, biovida.shop).

Misma plantilla visual que la v2 de okservice (`assets/css/site.css` copiada de `okservice-landing`) más una capa propia (`assets/css/villverg.css`).

## Construir

```sh
node tools/build.js
```

Genera en la raíz `index.html`, `aviso-legal.html`, `privacidad.html`, `404.html`, `robots.txt`, `sitemap.xml`, `llms.txt`, `CNAME` y `favicon.svg`. Los datos de la sociedad y las marcas están solo en `tools/build.js` (`EMPRESA`, `MARCAS`): se cambian ahí y se vuelve a construir.

## Alojamiento

GitHub Pages desde `main` (raíz). Dominio propio `villverg.com` por `CNAME`. DNS en IONOS:

| Tipo | Host | Valor |
|------|------|-------|
| A | @ | 185.199.108.153 |
| A | @ | 185.199.109.153 |
| A | @ | 185.199.110.153 |
| A | @ | 185.199.111.153 |
| CNAME | www | josecrea.github.io |
