---
type: article
title: Verificación
description: Qué comprueba la fábrica en el navegador antes de dar algo por bueno.
tags: [qa]
timestamp: 2026-11-01T00:00:00Z
topic: fabrica
status: draft
---

# Verificación

> Guía para agentes y personas. Los COMANDOS que la fábrica ejecuta de verdad viven en
> `fabrica.toml` (config de Jose), no aquí: el contenido de un repo nunca decide qué se ejecuta.

## Rutas críticas y qué debe verse
| Ruta | Qué debe aparecer | Qué NO debe pasar |
|---|---|---|
| `/` | titular «Electricidad y vivienda en el sur de Tenerife», botones «Ir a #Okservice.es» e «Ir a Villa's Properties», CIF B19430115 | errores en consola, scroll horizontal, huecos donde van fotos |
| `/aviso-legal.html` | razón social VILLVERG SOLUCIONES INTEGRALES SL, CIF y datos registrales | — |
| `/404.html` | «Página no encontrada» con enlace «Volver al inicio» | — |

## Anchos
390 y 1440 px como mínimo; nada debe salirse de la pantalla de 320 a 1920 px.
Por debajo de 380 px la cabecera solo muestra el teléfono (es intencionado).

## Trampa al capturar
Las fotos de marca y la banda de paisaje llevan `loading="lazy"`: en una captura de página entera
hay que hacer scroll antes, o salen huecos que no son un fallo real.
