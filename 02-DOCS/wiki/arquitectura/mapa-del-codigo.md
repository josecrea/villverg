---
type: article
title: Mapa del código
description: Mapa en anchura del repo — dónde está cada cosa, no cómo funciona por dentro.
tags: [onboarding]
timestamp: 2026-11-01T00:00:00Z
topic: arquitectura
status: draft
sources: []
---

# Mapa del código

## Stack
{lenguajes, framework y versiones, gestor de paquetes, scripts}

## Puntos de entrada
{main, arranque del servidor, registro de rutas, comandos}

## Flujo de una petición
{UNA ruta real trazada: entrada → lógica → persistencia, con ficheros}

## Módulos y responsables
{transporte / negocio / persistencia / interfaz}

## Comportamiento oculto
{crons, webhooks, workers, listeners, ramas por entorno}

## Puntos calientes
{ficheros con más cambios y más complejos = más riesgo}

## Cómo arrancarlo
{comandos exactos para levantarlo y probar una ruta en local}
