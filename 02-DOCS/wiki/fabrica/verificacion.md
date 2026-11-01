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
| `/` | {titular, botón principal} | {errores en consola, página en blanco} |

## Flujos que se prueban pulsando
{p. ej. «pulsar "Pedir presupuesto" abre el formulario»}
