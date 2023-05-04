from pydantic import BaseModel
from datetime import datetime

# > This class is used to register a new PAN
class IGS_REQ_PAN_RGST(BaseModel):
    
    req_id : str 
    aadhar : str
    created_by : str = "admin"
    updated_by : str = "admin"
    created_at : datetime = datetime.now()
    updated_at : datetime = datetime.now()

    class Config:
        orm_mode = True