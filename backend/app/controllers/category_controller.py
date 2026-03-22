from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.core.database import SessionLocal
from app.repositories.category_repository import CategoryRepository
from app.services.category_service import CategoryService
from app.schemas.category_schema import CategoryCreate, CategoryUpdate, CategoryResponse

# Router con prefijo y tag para agrupar en la documentación de Swagger
router = APIRouter(prefix="/categories", tags=["Categories"])


def get_db():
    """Genera y cierra la sesión de base de datos por cada request."""
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


def get_service(db: Session = Depends(get_db)) -> CategoryService:
    """Construye el servicio con sus dependencias inyectadas."""
    repository = CategoryRepository(db)
    return CategoryService(repository)


@router.get("/", response_model=list[CategoryResponse])
def get_all(service: CategoryService = Depends(get_service)):
    """Retorna todas las categorías."""
    return service.get_all()


@router.get("/{category_id}", response_model=CategoryResponse)
def get_by_id(category_id: int, service: CategoryService = Depends(get_service)):
    """Retorna una categoría por su ID."""
    return service.get_by_id(category_id)


@router.post("/", response_model=CategoryResponse, status_code=201)
def create(data: CategoryCreate, service: CategoryService = Depends(get_service)):
    """Crea una nueva categoría."""
    return service.create(data)


@router.put("/{category_id}", response_model=CategoryResponse)
def update(category_id: int, data: CategoryUpdate, service: CategoryService = Depends(get_service)):
    """Actualiza una categoría existente."""
    return service.update(category_id, data)


@router.delete("/{category_id}", status_code=204)
def delete(category_id: int, service: CategoryService = Depends(get_service)):
    """Elimina una categoría por su ID."""
    service.delete(category_id)