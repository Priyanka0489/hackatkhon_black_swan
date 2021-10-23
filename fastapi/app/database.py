import sys

from loguru import logger
from fastapi import FastAPI, APIRouter, HTTPException

from starlette import status
from elasticsearch import AsyncElasticsearch
from app.config import API_CONFIG_ELASTICSEARCH_URL_WITH_USER_PASS, APP_CONFIG_DIAGNOSTIC_TYPE1, \
    APP_CONFIG_DIAGNOSTIC_TYPE2, APP_CONFIG_DIAGNOSTIC_TYPE3, APP_CONFIG_DIAGNOSTIC_TYPE4, APP_CONFIG_DIAGNOSTIC_TYPE5
from app.util import calculate_years_from_now

es = AsyncElasticsearch(
    [API_CONFIG_ELASTICSEARCH_URL_WITH_USER_PASS],
    verify_certs=True,
)


async def search(index: str, query: str, limit: int):
    gt_date = None
    lt_date = None
    match_phrase = None
    if not es:
        logger.warning("Elasticsearch not initialized")
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST, detail="Elasticsearch not initialized"
        )

    try:
        logger.debug(f"{query=}")
        if query == APP_CONFIG_DIAGNOSTIC_TYPE1:
            logger.debug(f"In APP_CONFIG_DIAGNOSTIC_TYPE1")
            gt_date = calculate_years_from_now(40)
            lt_date = calculate_years_from_now(21)
            match_phrase = [{"match": {"gender": "male"}},
                            {"match": {"gender": "female"}}]

            logger.debug(f"{gt_date=}, {lt_date=}")
        if query == APP_CONFIG_DIAGNOSTIC_TYPE2:
            logger.debug(f"In APP_CONFIG_DIAGNOSTIC_TYPE2")
            gt_date = calculate_years_from_now(80)
            lt_date = calculate_years_from_now(21)
            match_phrase = [{"match": {"gender": "male"}}]

            logger.debug(f"{gt_date=}, {lt_date=}")
        if query == APP_CONFIG_DIAGNOSTIC_TYPE3:
            logger.debug(f"In APP_CONFIG_DIAGNOSTIC_TYPE3")
            gt_date = calculate_years_from_now(80)
            lt_date = calculate_years_from_now(21)
            match_phrase = [{"match": {"gender": "female"}}]
            logger.debug(f"{gt_date=}, {lt_date=}")
        if query == APP_CONFIG_DIAGNOSTIC_TYPE4:
            logger.debug(f"In APP_CONFIG_DIAGNOSTIC_TYPE4")
            gt_date = calculate_years_from_now(40)
            lt_date = calculate_years_from_now(21)
            match_phrase = [{"match": {"gender": "female"}}]
            logger.debug(f"{gt_date=}, {lt_date=}")
        if query == APP_CONFIG_DIAGNOSTIC_TYPE5:
            logger.debug(f"In APP_CONFIG_DIAGNOSTIC_TYPE5")
            gt_date = calculate_years_from_now(100)
            lt_date = calculate_years_from_now(60)
            match_phrase = [{"match": {"gender": "male"}},
                            {"match": {"gender": "female"}}]

            logger.debug(f"{gt_date=}, {lt_date=}")

        if not (
                results := await es.search(
                    index=index,
                    body={
                        "query": {
                            "bool": {
                                "must": [],
                                "filter": [
                                    {
                                        "match_all": {}
                                    },
                                    {
                                        "range": {
                                            "birth_date": {
                                                "gte": gt_date,
                                                "lt": lt_date
                                            }
                                        }

                                    }
                                ],
                                "should": match_phrase,
                                "must_not": []
                            }
                        }

                    }
                    ,
                    size=limit,
                    request_timeout=30
                )
        ):
            logger.warning("No Search Results")
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND, detail="Record Not Found"
            )
        logger.debug(f"{type(results)=}, {results}")

        return [
            x.get('_source', {}).get('doc') or x.get('_source', {}) | {"_index": x["_index"], "_id": x["_id"]}
            for x in results["hits"]["hits"]
        ]
        # return None

    except Exception as e:
        logger.critical("Exception Searching Elasticsearch: " + str(e))
        exc_type, exc_obj, exc_tb = sys.exc_info()
        print("line->" + str(exc_tb.tb_lineno))
        print('Exception' + str(e))
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="Record Not Found"
        )


async def search_non_pan(index: str,  limit: int):
    if not es:
        logger.warning("Elasticsearch not initialized")
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST, detail="Elasticsearch not initialized"
        )

    try:

        if not (
                results := await es.search(
                    index=index,
                    body={
                        "query": {
                            "bool": {
                                "must": [],
                                "filter": [
                                    {
                                        "match_all": {}
                                    }
                                ],
                                "should": [],
                                "must_not": [
                                    {
                                        "exists": {
                                            "field": "doc.InvPAN"
                                        }
                                    }
                                ]
                            }
                        }
                    },
                    size=limit,
                    request_timeout=30
                )
        ):
            logger.warning("No Search Results")
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND, detail="Record Not Found"
            )
        logger.debug(f"{type(results)=}, {results}")

        return [
            x.get('_source', {}).get('doc') or x.get('_source', {}) | {"_index": x["_index"], "_id": x["_id"]}
            for x in results["hits"]["hits"]
        ]

    except Exception as e:
        logger.critical("Exception Searching Elasticsearch: " + str(e))
        exc_type, exc_obj, exc_tb = sys.exc_info()
        print("line->" + str(exc_tb.tb_lineno))
        print('Exception' + str(e))
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="Record Not Found"
        )

async def search_car(index: str, query: str, limit: int):
    if not es:
        logger.warning("Elasticsearch not initialized")
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST, detail="Elasticsearch not initialized"
        )

    try:
        logger.debug(f"{query=}")

        if not (
                results := await es.search(
                    index=index,
                    body={
                        "query": {
                            "bool": {
                                "must": [],
                                "filter": [
                                    {
                                        "multi_match": {
                                            "type": "best_fields",
                                            "query": query,
                                            "lenient": True
                                        }
                                    },
                                    {
                                        "exists": {
                                            "field": "doc.Carmodel"
                                        }
                                    }
                                ],
                                "should": [],
                                "must_not": []
                            }
                        },
                    },
                    size=limit,
                    request_timeout=30
                )
        ):
            logger.warning("No Search Results")
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND, detail="Record Not Found"
            )
        logger.debug(f"{type(results)=}, {results}")

        return [
            x.get('_source', {}).get('doc') or x.get('_source', {}) | {"_index": x["_index"], "_id": x["_id"]}
            for x in results["hits"]["hits"]
        ]

    except Exception as e:
        logger.critical("Exception Searching Elasticsearch: " + str(e))
        exc_type, exc_obj, exc_tb = sys.exc_info()
        print("line->" + str(exc_tb.tb_lineno))
        print('Exception' + str(e))
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="Record Not Found"
        )
