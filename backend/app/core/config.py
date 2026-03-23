from dotenv import load_dotenv
import os

# Obtiene la ruta absoluta del directorio donde está config.py

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
load_dotenv(dotenv_path=os.path.join(BASE_DIR, '../../.env'))

DB_SERVER: str = os.getenv("DB_SERVER")
DB_NAME: str = os.getenv("DB_NAME")
DB_USER: str = os.getenv("DB_USER")
DB_PASSWORD: str = os.getenv("DB_PASSWORD")