from datetime import datetime, timedelta
from enum import Enum

from pytz import utc


class When(Enum):
    BEGINNING_OF_CURRENT_DAY = 0
    END_OF_CURRENT_DAY = 1
    BEGINNING_OF_CURRENT_WEEK = 2


def day(date: datetime, when: When):
    if when == When.BEGINNING_OF_CURRENT_DAY:
        return date.replace(hour=0, minute=0, second=0, microsecond=0, tzinfo=utc)
    elif when == When.END_OF_CURRENT_DAY:
        return date.replace(hour=23, minute=59, second=59, microsecond=999_999, tzinfo=utc)
    elif when == When.BEGINNING_OF_CURRENT_WEEK:
        return (date - timedelta(days=date.weekday())).replace(hour=0, minute=0, second=0, microsecond=0)


if __name__ == "__main__":
    print(day(datetime.now(), When.BEGINNING_OF_CURRENT_DAY).timestamp())
    print(day(datetime.now(), When.BEGINNING_OF_CURRENT_WEEK))
