from sqlalchemy.orm import Session, joinedload
from sqlalchemy import or_
from app.models.product import Product
from app.schemas.product_schema import ProductCreate, ProductUpdate


class ProductRepository:
    """Repositorio de productos. Único punto de acceso a la base de datos para esta entidad."""

    def __init__(self, db: Session):
        self.db = db

    def get_all(self, category_id: int = None, code: str = None) -> list[Product]:
        """
        Retorna productos con filtros opcionales.
        - category_id: filtra por categoría
        - code: filtra por código (búsqueda parcial)
        """
        query = self.db.query(Product).options(joinedload(Product.category))

        if category_id:
            query = query.filter(Product.category_id == category_id)

        if code:
            # LIKE para búsqueda parcial — busca el código en cualquier posición
            query = query.filter(Product.code.ilike(f"%{code}%"))

        return query.all()

    def get_by_id(self, product_id: int) -> Product | None:
        """Retorna un producto por su ID incluyendo su categoría."""
        return (
            self.db.query(Product)
            .options(joinedload(Product.category))
            .filter(Product.id == product_id)
            .first()
        )

    def get_by_code(self, code: str) -> Product | None:
        """Retorna un producto por su código exacto. Usado para validar duplicados."""
        return self.db.query(Product).filter(Product.code == code).first()

    def create(self, data: ProductCreate) -> Product:
        """Crea y persiste un nuevo producto en la base de datos."""
        product = Product(**data.model_dump())
        self.db.add(product)
        self.db.commit()
        self.db.refresh(product)
        return product

    def update(self, product: Product, data: ProductUpdate) -> Product:
        """Actualiza los campos de un producto existente."""
        changes = data.model_dump(exclude_unset=True)
        for field, value in changes.items():
            setattr(product, field, value)
        self.db.commit()
        self.db.refresh(product)
        return product

    def delete(self, product: Product) -> None:
        """Elimina un producto de la base de datos."""
        self.db.delete(product)
        self.db.commit()