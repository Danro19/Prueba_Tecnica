# Gestión de Productos — Prueba Técnica Fullstack

Aplicación web para la gestión de productos y categorías, desarrollada con FastAPI, React y SQL Server.

---

## Tecnologías

**Backend**
- Python 3.11+
- FastAPI
- SQLAlchemy ORM
- SQL Server (Windows Authentication)
- Pydantic v2

**Frontend**
- React 18
- Vite
- Tailwind CSS v4
- Axios
- React Router DOM

---

## Arquitectura

El proyecto sigue el patrón **MVC** con separación de capas:
```
Request → Controller → Service → Repository → Model → DB
```

- **Controller** — recibe y responde peticiones HTTP
- **Service** — lógica de negocio y validaciones
- **Repository** — único punto de acceso a la base de datos
- **Model** — entidades SQLAlchemy
- **Schema** — validación de entrada/salida con Pydantic

Se aplican los principios **SOLID**, **POO** y **Clean Code** en todas las capas.

---

## Estructura del proyecto
```
Prueba_Tecnica/
├── backend/
│   ├── app/
│   │   ├── controllers/
│   │   ├── core/
│   │   ├── models/
│   │   ├── repositories/
│   │   ├── schemas/
│   │   ├── services/
│   │   └── main.py
│   ├── .env
│   └── requirements.txt
└── frontend/
    ├── src/
    │   ├── components/
    │   ├── hooks/
    │   ├── pages/
    │   └── services/
    └── .env
```

---

## Requisitos previos

- Python 3.11+
- Node.js 18+
- SQL Server con Windows Authentication
- ODBC Driver 17 for SQL Server

---

## Configuración

### Base de datos

Crea la base de datos en SQL Server:
```sql
CREATE DATABASE product_db;
```

Las tablas se crean automáticamente al iniciar el backend.

### Variables de entorno

**`backend/.env`**
```env
DB_SERVER=localhost
DB_NAME=product_db
```

**`frontend/.env`**
```env
VITE_API_URL=http://localhost:8000
```

---

## Instalación y ejecución

### Backend
```bash
cd backend
pip install -r requirements.txt
uvicorn app.main:app --reload
```

API disponible en: `http://localhost:8000`
Documentación Swagger: `http://localhost:8000/docs`

### Frontend
```bash
cd frontend
npm install
npm run dev
```

Aplicación disponible en: `http://localhost:5173`

---

## Funcionalidades

### Productos
- Listar productos con paginación visual
- Buscar por código (búsqueda parcial)
- Filtrar por categoría
- Crear producto con validación de código único
- Editar producto
- Eliminar producto con confirmación

### Categorías
- Listar categorías
- Crear categoría
- Editar categoría
- Eliminar categoría (con validación de productos asociados)

---

## Endpoints principales

### Productos
| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | `/products/` | Listar productos |
| GET | `/products/?code=PRD` | Buscar por código |
| GET | `/products/?category_id=1` | Filtrar por categoría |
| GET | `/products/{id}` | Obtener producto por ID |
| POST | `/products/` | Crear producto |
| PUT | `/products/{id}` | Actualizar producto |
| DELETE | `/products/{id}` | Eliminar producto |

### Categorías
| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | `/categories/` | Listar categorías |
| GET | `/categories/{id}` | Obtener categoría por ID |
| POST | `/categories/` | Crear categoría |
| PUT | `/categories/{id}` | Actualizar categoría |
| DELETE | `/categories/{id}` | Eliminar categoría |

---

## Decisiones técnicas

- **Windows Authentication** en SQL Server — sin necesidad de credenciales en el `.env`
- **Eager loading** con `joinedload` en productos para evitar el problema N+1
- **Filtros como query params** en el backend para mantener un solo endpoint de listado
- **Toast notifications** para feedback visual en todas las operaciones CRUD
- **Modal de confirmación** en eliminaciones para prevenir borrados accidentales
- **Validación de integridad** al eliminar categorías con productos asociados