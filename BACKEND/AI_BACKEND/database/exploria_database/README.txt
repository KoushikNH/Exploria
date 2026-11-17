Exploria AI Backend - database folder

Files
-----
database/__init__.py
    Exposes the shared database objects and helper functions.

database/connection.py
    Creates the SQLAlchemy engine, SessionLocal, get_db() dependency,
    and create_tables() helper.

Setup
-----
1. Copy the database folder into your AI_BACKEND directory, alongside
   main.py, models/, routers/, and services/.
2. Install dependencies from AI_BACKEND:
       pip install "SQLAlchemy>=2.0,<3.0" python-dotenv
3. Optionally add this to AI_BACKEND/.env:
       DATABASE_URL=sqlite:///./exploria.db
   If DATABASE_URL is omitted, the code creates exploria.db inside
   AI_BACKEND automatically.
4. In main.py, import and call create_tables() during application startup,
   for example:
       from database.connection import create_tables

       @app.on_event("startup")
       def on_startup():
           create_tables()

5. Use get_db as a FastAPI dependency in routes that need database access:
       from fastapi import Depends
       from sqlalchemy.orm import Session
       from database.connection import get_db

       def example_route(db: Session = Depends(get_db)):
           ...

Important
---------
This folder assumes the models folder contains base.py and the model files
created for Exploria. It does not create or migrate tables until
create_tables() is called. For production, use Alembic migrations and keep
DATABASE_URL credentials out of Git.
