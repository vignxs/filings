from pydantic import BaseModel
from datetime import date , datetime

class IGS_JOB_SUPPORT(BaseModel):

    candidate_name : str
    mobile : int
    technology : str
    start_date : date
    followup_date : date
    resource : str
    status : str
    feedback : str
    created_by: str = "admin"
    updated_by: str = "admin"
    created_at: datetime = datetime.now()
    updated_at: datetime = datetime.now()
    
    class Config:
        orm_mode = True


class IGS_JOB_SUPPORT_GU(BaseModel):

    id : int
    candidate_name: str
    mobile: int
    technology: str
    start_date: date
    followup_date: date
    resource: str
    status: str
    feedback: str
    created_by: str = "admin"
    updated_by: str = "admin"
    created_at: datetime = datetime.now()
    updated_at: datetime = datetime.now()

    class Config:
        orm_mode = True