from dotenv import load_dotenv
import os

load_dotenv()

DB_SERVER: str = os.getenv("DB_SERVER")
DB_NAME: str = os.getenv("DB_NAME")
DB_USER: str = os.getenv("DB_USER")
DB_PASSWORD: str = os.getenv("DB_PASSWORD")