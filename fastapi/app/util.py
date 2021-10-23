import datetime
from loguru import logger


def calculate_years_from_now(age):
    logger.debug(f"{type(age)=}")

    if type(age) == int:
        try:
            current_date = datetime.date(datetime.date.today().year - age, datetime.date.today().month,
                                         datetime.date.today().day)
            current_date = current_date.strftime("%Y-%m-%dT%H:%M:%S")
            logger.debug(f"{current_date=}")
            return current_date
        except Exception as e:
            logger.critical(f"Error while getting Date {e=}")
            return None
    return None


calculate_years_from_now(21)
