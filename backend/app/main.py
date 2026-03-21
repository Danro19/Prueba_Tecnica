from fastapi import FastAPI
from app.core.database import engine

app = FastAPI()

@app.get("/")
def test_db():
    try:
        with engine.connect() as connection:
            return {"message": "Conexión exitosa"}
    except Exception as e:
        return {"error": str(e)}