from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.core.database import SessionLocal
from app.repositories.product_repository import ProductRepository
from app.repositories.category_repository import CategoryRepository
from app.services.product_service import ProductService
from app.schemas.product_schema import ProductCreate, ProductUpdate, ProductResponse

# Router con prefijo y tag para agrupar en la documentación de Swagger
router = APIRouter(prefix="/products", tags=["Products"])


def get_db():
    """Genera y cierra la sesión de base de datos por cada request."""
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


def get_service(db: Session = Depends(get_db)) -> ProductService:
    """Construye el servicio con sus dependencias inyectadas."""
    product_repository = ProductRepository(db)
    category_repository = CategoryRepository(db)
    return ProductService(product_repository, category_repository)


@router.get("/", response_model=list[ProductResponse])
def get_all(service: ProductService = Depends(get_service)):
    """Retorna todos los productos."""
    return service.get_all()


@router.get("/{product_id}", response_model=ProductResponse)
def get_by_id(product_id: int, service: ProductService = Depends(get_service)):
    """Retorna un producto por su ID."""
    return service.get_by_id(product_id)


@router.post("/", response_model=ProductResponse, status_code=201)
def create(data: ProductCreate, service: ProductService = Depends(get_service)):
    """Crea un nuevo producto."""
    return service.create(data)


@router.put("/{product_id}", response_model=ProductResponse)
def update(product_id: int, data: ProductUpdate, service: ProductService = Depends(get_service)):
    """Actualiza un producto existente."""
    return service.update(product_id, data)


@router.delete("/{product_id}", status_code=204)
def delete(product_id: int, service: ProductService = Depends(get_service)):
    """Elimina un producto por su ID."""
    service.delete(product_id)