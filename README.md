# TABLEPREMIER | Hospitality Systems 🍽️

> **Plataforma Integral de Gestión de Salón, Planimetría 2D Arquitectónica y Reservas en Tiempo Real para Establecimientos Gastronómicos.**

---

## 🏛️ Estructura del Proyecto

El sistema está formalmente dividido en **Frontend** y **Backend** desacoplados:

```
proyecto-restaurant/
├── backend/                  # Servidor REST API + WebSockets en tiempo real
│   ├── src/
│   │   ├── index.ts          # Servidor Express + Socket.io (Puerto 4000)
│   │   ├── routes/           # Endpoints: /api/tables, /api/reservations, /api/metrics, /api/auth
│   │   ├── store/            # Motor de datos en memoria y cálculo de métricas
│   │   ├── sockets/          # Difusión y eventos bidireccionales por WebSockets
│   │   ├── data/             # Semillas iniciales del local (Salón Interior + Patio)
│   │   └── types/            # Contratos de TypeScript para mesas, reservas y usuarios
│   ├── package.json
│   └── tsconfig.json
│
├── frontend/                 # Aplicación Web React + TypeScript + Tailwind CSS (B2B UI)
│   ├── src/
│   │   ├── components/
│   │   │   ├── Header/       # Barra gerencial y de comensal
│   │   │   ├── FloorPlan/    # Renderizado 2D de Salón, Terraza, Mobiliario y Leyenda
│   │   │   ├── Client/       # Ficha de comensal, selector de turnos, reserva y certificado digital
│   │   │   ├── Admin/        # Consola gerencial, libro maestro, métricas e historial
│   │   │   └── UI/           # Notificaciones Toast flotantes y componentes visuales
│   │   ├── services/         # Cliente REST API, WebSockets (socket.io-client) y Web Audio API
│   │   ├── hooks/            # Hook reactivo de sincronización useRealtime()
│   │   └── types/            # Tipos de TypeScript
│   ├── package.json
│   ├── vite.config.ts        # Vite Dev Server (Puerto 3000)
│   └── tailwind.config.js    # Paleta de diseño corporativa (Luxury gold & deep obsidian)
│
└── package.json              # Scripts raíz para orquestar ambos entornos
```

---

## ⚡ Ejecución Rápida

### 1. Iniciar el Backend (Express + WebSockets)
```bash
npm run dev:backend
# Servidor escuchando en: http://localhost:4000
```

### 2. Iniciar el Frontend (React + Vite)
```bash
npm run dev:frontend
# Aplicación web disponible en: http://localhost:3000
```

---

## 📡 Endpoints del Backend (`http://localhost:4000/api`)

| Método | Endpoint | Descripción |
| :--- | :--- | :--- |
| `GET` | `/api/tables` | Lista todas las mesas del plano y su estado actual |
| `PATCH` | `/api/tables/:id/status` | Actualiza el estado de una mesa (`available`, `reserved`, `occupied`, `billing`) |
| `GET` | `/api/reservations` | Lista cronológica de todas las reservas registradas |
| `POST` | `/api/reservations` | Formaliza una nueva reserva y emite notificación a recepción |
| `PATCH` | `/api/reservations/:id/status` | Cambia estado (`confirmed`, `seated`, `completed`, `cancelled`) |
| `GET` | `/api/metrics` | Reporte de ocupación general, comensales proyectados y horarios pico |
| `POST` | `/api/auth/admin-login` | Autenticación corporativa de gerencia y salón |
| `POST` | `/api/metrics/reset-demo` | Restablece las mesas y datos al estado inicial para nuevas presentaciones |

---

## 🔑 Credenciales para la Demostración

* **Usuario Administrador**: `admin@restaurante.com`
* **Contraseña**: `admin123`
*(En la interfaz cuenta con botones de autocompletado rápido para facilitar presentaciones directas con dueños de restaurantes).*

