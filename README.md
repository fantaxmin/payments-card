
# Payments Card

Aplicación web para la gestión y recordatorio de pagos, desarrollada con React, TypeScript y Vite.

## Descripción

Payments Card es una app que permite crear, editar, eliminar y recordar pagos pendientes o vencidos. Los datos se almacenan de forma persistente en el navegador usando LocalStorage, pero la arquitectura está preparada para migrar fácilmente a una base de datos o backend en el futuro.

## Tecnologías utilizadas

- **React 19**: Librería principal para la construcción de interfaces de usuario.
- **TypeScript**: Tipado estático para mayor robustez y mantenibilidad.
- **Vite**: Herramienta de build y desarrollo ultrarrápida.
- **ESLint**: Linter para mantener la calidad y consistencia del código.
- **CSS Modules**: Organización de estilos por componente.

## Estructura del proyecto

```
├── public/
│   └── sw.js
├── src/
│   ├── assets/                # Imágenes y recursos estáticos
│   ├── components/
│   │   ├── features/
│   │   │   └── payments/      # Componentes principales de pagos (Card, Form, List, etc)
│   │   └── layout/            # Componentes de layout y estructura general
│   ├── constants/             # Constantes globales (categorías, estados, etc)
│   ├── context/               # Contexto global de pagos (PaymentsContext)
│   ├── hooks/                 # Custom hooks
│   ├── services/              # Lógica de persistencia (paymentsStorage)
│   ├── styles/                # Archivos CSS globales y por componente
│   ├── types/                 # Tipos y contratos TypeScript
│   └── utils/                 # Utilidades y datos mock
├── index.html
├── package.json
├── tsconfig*.json
└── vite.config.ts
```

## Principales funcionalidades

- Listado de pagos pendientes y vencidos
- Crear, editar y eliminar pagos
- Recordatorio de pagos (con integración lista para notificaciones push)
- Persistencia local automática (LocalStorage)
- Arquitectura desacoplada para migrar a backend fácilmente

## Buenas prácticas aplicadas

- **Separación de responsabilidades**: Lógica de UI, contexto y persistencia bien diferenciadas.
- **Componentes reutilizables**: Cada parte de la UI es un componente autocontenible.
- **Tipado estricto**: Uso de TypeScript en todo el proyecto.
- **Persistencia centralizada**: Todas las operaciones de almacenamiento pasan por `src/services/paymentsStorage.ts`.
- **Fácil migración a backend**: Solo hay que cambiar la implementación de las funciones de storage.
- **Estilos organizados**: Un CSS por componente y estilos globales separados.
- **Linter y configuración estricta**: ESLint y tsconfig con reglas estrictas para evitar errores comunes.

## ¿Cómo correr el proyecto?

1. Clona el repositorio
2. Instala dependencias:
   ```bash
   bun install
   ```
3. Inicia el entorno de desarrollo:
   ```bash
   bun run dev
   ```
4. Abre [http://localhost:5173](http://localhost:5173) en tu navegador

## Futuras mejoras

- Integración con backend y autenticación
- Notificaciones push reales (OneSignal u otros)
- Tests unitarios y de integración
- Mejoras de accesibilidad y mobile

---
Proyecto desarrollado con buenas prácticas de arquitectura, escalabilidad y mantenibilidad en mente.
