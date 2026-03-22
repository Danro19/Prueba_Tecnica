from urllib.parse import quote_plus
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base
from app.core.config import DB_SERVER, DB_NAME, DB_USER, DB_PASSWORD

password = quote_plus(DB_PASSWORD)

DATABASE_URL = (
    f"mssql+pyodbc://{DB_USER}:{password}@{DB_SERVER},1433/{DB_NAME}"
    "?driver=ODBC+Driver+17+for+SQL+Server"
    "&Encrypt=yes"
    "&TrustServerCertificate=no"
    "&Connection+Timeout=30"
)

engine = create_engine(DATABASE_URL)

SessionLocal = sessionmaker(
    autocommit=False,
    autoflush=False,
    bind=engine
)

Base = declarative_base()