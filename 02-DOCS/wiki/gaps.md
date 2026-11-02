# Huecos de conocimiento

> Append-only. Lo que el proyecto sabe que NO sabe: temas sin página, preguntas que no se
> pudieron responder bien. Los agentes añaden aquí en vez de inventar.

- 2026-11-01 · **biovida.shop:** qué vende o hace. La web no responde por HTTPS; se menciona sin enlace como «la tienda online del grupo». Falta descripción de Jose.
- 2026-11-01 · **README.md** sigue describiendo el alojamiento antiguo (josecrea.github.io/villverg); la web ya está en villverg.com.
- 2026-11-01 · No hay fotos reales de okservice de más resolución que `hero-electricista.webp` (1504 px).
- 2026-11-02 · **DNS de villverg.com:** el brain no guarda los valores exactos de los registros A/AAAA ni dónde está el script o la API de IONOS que los gestiona. Los AAAA del README son los publicados por GitHub Pages, sin contrastar con el DNS real (`dig +short AAAA villverg.com`; el sandbox no tenía red).
- 2026-11-02 · **README.md:13** dice que `tools/build.js` genera `robots.txt` y `CNAME`, pero no los escribe (ver `SALIDAS`; tampoco hay `robots.txt` en el repo) y omite `.nojekyll`, que sí genera.
