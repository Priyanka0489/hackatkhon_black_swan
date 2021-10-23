
from typing import Optional
from loguru import logger
from fastapi import FastAPI, APIRouter, HTTPException
from pydantic import BaseModel
from starlette import status
from starlette.middleware.cors import CORSMiddleware

from app.database import search, search_non_pan, search_car

app = FastAPI()
# router = APIRouter(prefix="/elastic_search", tags=["Elastic Search"])
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class ESRequest(BaseModel):
    text: str


@app.get("/")
def read_root():
    return {"Hello": "World"}


@app.post("/search")
async def people_search(request: ESRequest,
                        index: str = "analystt.*",
                        limit: int = 10,
                        ):
    logger.info(f"In elastic Search: ..{request}")
    try:
        # text = decode
        if not request.text:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST, detail="Please enter valid text"
            )
        if not (results := await search(index=index, query=request.text, limit=limit)):
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND, detail="No Search Results"
            )

        logger.debug(f"{len(results)=}")
        # logger.debug(results)
        return results
    except Exception as e:
        logger.error(f"Error in elastic search: {e=}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail="Error in elastic search"
        )


@app.post("/search_non_pan")
async def people_search_non_pan(
                        index: str = "analystt.*",
                        limit: int = 10,
                        ):
    logger.info(f"In elastic Search: ..")
    try:

        if not (results := await search_non_pan(index=index,  limit=limit)):
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND, detail="No Search Results"
            )

        logger.debug(f"{len(results)=}")
        # logger.debug(results)
        return results
    except Exception as e:
        logger.error(f"Error in elastic search: {e=}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail="Error in elastic search"
        )


@app.post("/search_car")
async def people_search_car(request: ESRequest,
                        index: str = "analystt.*",
                        limit: int = 10,
                        ):
    logger.info(f"In elastic Search: ..{request}")
    try:
        # text = decode
        if not request.text:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST, detail="Please enter valid text"
            )
        if not (results := await search_car(index=index, query=request.text, limit=limit)):
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND, detail="No Search Results"
            )

        logger.debug(f"{len(results)=}")
        # logger.debug(results)
        return results
    except Exception as e:
        logger.error(f"Error in elastic search: {e=}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail="Error in elastic search"
        )