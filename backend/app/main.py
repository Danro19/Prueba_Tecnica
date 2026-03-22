from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.controllers import category_controller, product_controller
from app.core.database import Base, engine

# Crea todas las tablas en la base de datos si no existen
Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="Product API",
    description="API para gestión de productos y categorías",
    version="1.0.0"
)

# Permite peticiones desde el frontend en desarrollo
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Registro de routers
app.include_router(category_controller.router)
app.include_router(product_controller.router)


@app.get("/", tags=["Health"])
def health_check():
    """Verifica que la API esté corriendo."""
    return {"status": "ok"}