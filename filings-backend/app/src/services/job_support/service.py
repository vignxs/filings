from sqlalchemy.orm import Session
from . import models, schemas
from datetime import datetime, timedelta
from typing import Optional
from sqlalchemy import select, update, delete


def create_request(db: Session, request: schemas.IGS_JOB_SUPPORT):
    db_req = models.IGS_JOB_SUPPORT(**request.dict())
    db.add(db_req)
    db.commit()
    db.refresh(db_req)
    return db_req.id


def get_requests(db: Session):
    return db.query(models.IGS_JOB_SUPPORT).all()

def delete_request(db: Session, request: schemas.IGS_JOB_SUPPORT) -> int:
    db_req= delete(models.IGS_JOB_SUPPORT).where(models.IGS_JOB_SUPPORT.id==request.id)
    db.execute(db_req)
    db.commit()
    return request.id

def update_request(db: Session, request: schemas.IGS_JOB_SUPPORT) -> int:
    db_req = models.IGS_JOB_SUPPORT(**request.dict())
    db_req.id = request.id
    db.merge(db_req)
    db.commit()
    return request.id

