from datetime import datetime
from enum import Enum

from pytz import utc


class When(Enum):
    BEGINNING = 0
    END = 1


def day(date: datetime, when: When):
    if when == When.BEGINNING:
        return date.replace(hour=0, minute=0, second=0, microsecond=0, tzinfo=utc)
    else:
        return date.replace(hour=23, minute=59, second=59, microsecond=999_999, tzinfo=utc)


if __name__ == "__main__":
    print(day(datetime.now(), When.BEGINNING).timestamp())
