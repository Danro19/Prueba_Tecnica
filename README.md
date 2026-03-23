# Gestión de Productos — Prueba Técnica Fullstack

Aplicación web para la gestión de productos y categorías, desarrollada con FastAPI, React y SQL Server.

---

## Demo

| Servicio | URL |
|---|---|
| Frontend | https://prueba-tecnica-peach.vercel.app |
| Backend API | https://prueba-tecnica-api-rd-c8b3gfa8f5bubpec.brazilsouth-01.azurewebsites.net |
| Documentación Swagger | https://prueba-tecnica-api-rd-c8b3gfa8f5bubpec.brazilsouth-01.azurewebsites.net/docs |

---

## Tecnologías

**Backend**
- Python 3.11
- FastAPI
- SQLAlchemy ORM
- SQL Server (local: Windows Authentication / producción: Azure SQL Database)
- Pydantic v2

**Frontend**
- React 18
- Vite
- Tailwind CSS v4
- Axios
- React Router DOM

**Infraestructura**
- Azure App Service (backend)
- Azure SQL Database (base de datos)
- Vercel (frontend)
- GitHub Actions (CI/CD)

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
│   │   │   ├── category_controller.py
│   │   │   └── product_controller.py
│   │   ├── core/
│   │   │   ├── config.py
│   │   │   └── database.py
│   │   ├── models/
│   │   │   ├── category.py
│   │   │   └── product.py
│   │   ├── repositories/
│   │   │   ├── category_repository.py
│   │   │   └── product_repository.py
│   │   ├── schemas/
│   │   │   ├── category_schema.py
│   │   │   └── product_schema.py
│   │   ├── services/
│   │   │   ├── category_service.py
│   │   │   └── product_service.py
│   │   └── main.py
│   ├── .env
│   └── requirements.txt
└── frontend/
    ├── src/
    │   ├── components/
    │   │   ├── layout/
    │   │   │   └── Navbar.jsx
    │   │   └── ui/
    │   │       ├── Button.jsx
    │   │       ├── Modal1.jsx
    │   │       ├── Table.jsx
    │   │       └── Toast.jsx
    │   ├── hooks/
    │   │   ├── useCategories.js
    │   │   ├── useProducts.js
    │   │   └── useToast.js
    │   ├── pages/
    │   │   ├── categories/
    │   │   │   ├── CategoriesPage.jsx
    │   │   │   └── CategoryForm.jsx
    │   │   └── products/
    │   │       ├── DeleteModal.jsx
    │   │       ├── ProductForm.jsx
    │   │       └── ProductsPage.jsx
    │   ├── services/
    │   │   ├── categoryService.js
    │   │   └── productService.js
    │   ├── App.jsx
    │   └── main.jsx
    └── .env
```

---

## Requisitos previos (desarrollo local)

- Python 3.11+
- Node.js 18+
- SQL Server con Windows Authentication
- ODBC Driver 17 for SQL Server

---

## Configuración local

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

## Guía completa para entorno local

### 1. Clonar el repositorio
```bash
git clone https://github.com/Danro19/Prueba_Tecnica.git
cd Prueba_Tecnica
```

### 2. Configurar el backend

El backend usa **Windows Authentication** para conectarse a SQL Server local, por lo que no necesitas usuario ni contraseña en el `.env`.

Crea el archivo `backend/.env` con este contenido:
```env
DB_SERVER=localhost
DB_NAME=product_db
```

Si tu instancia de SQL Server tiene un nombre específico (por ejemplo `SQLEXPRESS`), cámbialo así:
```env
DB_SERVER=localhost\SQLEXPRESS
DB_NAME=product_db
```

El archivo `backend/app/core/database.py` usa Windows Authentication automáticamente con `trusted_connection=yes`, por lo que no se necesitan credenciales adicionales.

### 3. Crear la base de datos

Abre SQL Server Management Studio o cualquier cliente SQL y ejecuta:
```sql
CREATE DATABASE product_db;
```

Las tablas `categories` y `products` se crean automáticamente al levantar el backend por primera vez.

### 4. Instalar dependencias del backend
```bash
cd backend
pip install -r requirements.txt
```

### 5. Levantar el backend
```bash
uvicorn app.main:app --reload
```

Verifica que funcione en: `http://localhost:8000/docs`

### 6. Configurar el frontend

Crea el archivo `frontend/.env` con este contenido:
```env
VITE_API_URL=http://localhost:8000
```

Este archivo le indica al frontend dónde está el backend. En local apunta a `localhost:8000`, en producción apunta a la URL de Azure.

### 7. Instalar dependencias del frontend
```bash
cd frontend
npm install
```

### 8. Levantar el frontend
```bash
npm run dev
```

Verifica que funcione en: `http://localhost:5173`

---

## Diferencias entre entorno local y producción

| Aspecto | Local | Producción |
|---|---|---|
| Base de datos | SQL Server local con Windows Auth | Azure SQL Database con SQL Auth |
| Autenticación DB | Windows Authentication (sin usuario/contraseña) | Usuario y contraseña en variables de entorno de Azure |
| Backend URL | `http://localhost:8000` | `https://prueba-tecnica-api-rd-c8b3gfa8f5bubpec.brazilsouth-01.azurewebsites.net` |
| Frontend URL | `http://localhost:5173` | `https://prueba-tecnica-peach.vercel.app` |
| CORS | Solo `localhost:5173` | URL de Vercel configurada en `ALLOWED_ORIGINS` |
| Variables de entorno | Archivo `.env` local | Variables configuradas en Azure App Service y Vercel |

---

## Cambios necesarios si clonas y corres en local

El proyecto está configurado para funcionar en local sin modificar código. Solo necesitas:

1. Tener **SQL Server** instalado con **Windows Authentication**
2. Tener **ODBC Driver 17 for SQL Server** instalado
3. Crear los archivos `.env` tal como se indica arriba
4. Crear la base de datos `product_db`
5. Instalar dependencias y levantar los servidores

No necesitas cambiar ningún archivo de código — toda la configuración se maneja a través de los archivos `.env`.

## Despliegue en producción

### Infraestructura utilizada

| Servicio | Proveedor | Nombre |
|---|---|---|
| Base de datos | Azure SQL Database | `product_db` en `ptserver-dr-2026` |
| Backend | Azure App Service | `prueba-tecnica-api-rd` |
| Frontend | Vercel | `prueba-tecnica-peach` |
| CI/CD | GitHub Actions | Automático en push a `main` |

### Variables de entorno en producción

**Azure App Service — Environment variables:**

| Variable | Descripción |
|---|---|
| `DB_SERVER` | Host del servidor Azure SQL |
| `DB_NAME` | Nombre de la base de datos |
| `DB_USER` | Usuario SQL |
| `DB_PASSWORD` | Contraseña SQL |
| `ALLOWED_ORIGINS` | URL del frontend en Vercel |

**Vercel — Environment variables:**

| Variable | Descripción |
|---|---|
| `VITE_API_URL` | URL del backend en Azure |

---

## Funcionalidades

### Productos
- Listar productos
- Buscar por código (búsqueda parcial)
- Filtrar por categoría
- Crear producto con validación de código único
- Editar producto
- Eliminar producto con confirmación

### Categorías
- Listar categorías
- Crear categoría
- Editar categoría
- Eliminar categoría con validación de productos asociados

---

## Endpoints

### Productos

| Método | Endpoint | Descripción |
|---|---|---|
| GET | `/products/` | Listar productos |
| GET | `/products/?code=PRD` | Buscar por código |
| GET | `/products/?category_id=1` | Filtrar por categoría |
| GET | `/products/{id}` | Obtener por ID |
| POST | `/products/` | Crear producto |
| PUT | `/products/{id}` | Actualizar producto |
| DELETE | `/products/{id}` | Eliminar producto |

### Categorías

| Método | Endpoint | Descripción |
|---|---|---|
| GET | `/categories/` | Listar categorías |
| GET | `/categories/{id}` | Obtener por ID |
| POST | `/categories/` | Crear categoría |
| PUT | `/categories/{id}` | Actualizar categoría |
| DELETE | `/categories/{id}` | Eliminar categoría |

---

## Decisiones técnicas

- **Windows Authentication** en desarrollo local — sin credenciales expuestas
- **Azure SQL Database** en producción con SQL Authentication
- **Eager loading** con `joinedload` en productos para evitar el problema N+1
- **Filtros como query params** para mantener un solo endpoint de listado
- **Toast notifications** para feedback visual en todas las operaciones CRUD
- **Modal de confirmación** en eliminaciones para prevenir borrados accidentales
- **Validación de integridad** al eliminar categorías con productos asociados
- **GitHub Actions** para CI/CD automático al hacer push a `main`
- **Startup tolerante a fallos** — la app arranca aunque la DB no esté disponible temporalmente


# SQL — El reporte incompleto

### Problema

El query usa `WHERE e.IsActive = 1` después del `LEFT JOIN`. Esto hace que los departamentos sin empleados desaparezcan del resultado, porque cuando no hay empleados el join retorna `NULL` en los campos de `Employees`, y la condición `NULL = 1` es falsa — por eso se filtran.

### Query original (incorrecto)
```sql
SELECT
    d.DepartmentName,
    e.FirstName,
    e.LastName
FROM Departments d
LEFT JOIN Employees e ON d.DepartmentID = e.DepartmentID
WHERE e.IsActive = 1;
```

### Solución
```sql
SELECT
    d.DepartmentName,
    e.FirstName,
    e.LastName
FROM Departments d
LEFT JOIN Employees e ON d.DepartmentID = e.DepartmentID
    AND e.IsActive = 1;
```

### ¿Por qué funciona?

Mover el filtro al `ON` del join hace que la condición se evalúe durante la unión de tablas, no después. De esa forma solo se excluyen los empleados inactivos, pero los departamentos que no tienen empleados siguen apareciendo en el resultado con `NULL` en los campos de nombre.
