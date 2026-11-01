---
type: decision
title: Decisiones
description: Registro append-only de cada decisión importante del proyecto.
tags: [decisiones]
timestamp: 2026-11-01T00:00:00Z
topic: harness
status: stable
---

# Decisiones

> **Append-only.** Nunca se edita ni se borra una entrada: si una decisión cambia, se añade otra
> que la sustituye y lo dice. Cada entrada: requisitos, **3 opciones**, la elegida y el porqué.
> Cualquier cambio a este fichero lo revisa Jose (lista negra de la compuerta).

## 2026-10-27 · Qué es villverg.com
- **Requisitos:** web de la sociedad que no compita en Google con okservice.es ni villasproperties.es.
- **Opciones:** 1. copia del contenido de okservice — contenido duplicado; 2. web corporativa (sociedad + marcas) — sin duplicado, reparte tráfico; 3. solo una página de contacto — no da confianza a bancos.
- **Elegida:** 2, web corporativa.
- **Por qué:** decisión de Jose; reparte a cada marca y da los datos de la sociedad.
- **Sustituye a:** —

## 2026-10-27 · Dirección visual
- **Requisitos:** que no parezca plantilla («muy cutre», Jose).
- **Opciones:** 1. canon corporativo clásico de inmobiliaria premium (E&V, Sotheby's, Lucas Fox); 2. y 3. dos direcciones atrevidas.
- **Elegida:** 1. Fraunces + Manrope, azul noche, blanco cálido, piedra y latón.
- **Por qué:** elección de Jose. Detalle en `DESIGN.md`.
- **Sustituye a:** —

## 2026-11-01 · Alojamiento y dominio
- **Requisitos:** gratis, sin servidor que mantener, dominio propio.
- **Opciones:** 1. GitHub Pages con CNAME; 2. VPS con Traefik; 3. hosting de IONOS.
- **Elegida:** 1. GitHub Pages desde `main`, DNS en IONOS por API.
- **Por qué:** cero mantenimiento; fusionar = publicar.
- **Sustituye a:** josecrea.github.io/villverg (ahora redirige a villverg.com).
