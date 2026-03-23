import os
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.controllers import category_controller, product_controller
from app.core.database import Base, engine

app = FastAPI(
    title="Product API",
    description="API para gestión de productos y categorías",
    version="1.0.0"
)

# En producción permite cualquier origen, en desarrollo solo localhost
allowed_origins = os.getenv("ALLOWED_ORIGINS", "http://localhost:5173").split(",")

app.add_middleware(
    CORSMiddleware,
    allow_origins=allowed_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(category_controller.router)
app.include_router(product_controller.router)


@app.on_event("startup")
async def startup():
    """Crea las tablas al arrancar. Si falla no detiene la app."""
    try:
        Base.metadata.create_all(bind=engine)
    except Exception as e:
        print(f"Warning: No se pudo conectar a la DB al arrancar: {e}")


@app.get("/", tags=["Health"])
def health_check():
    """Verifica que la API esté corriendo."""
    return {"status": "ok"}