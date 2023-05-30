from datetime import datetime
from datetime import timedelta
from random import randint
from uuid import uuid4

from mimesis import Numeric, Address

from features.time_feature.time_feature import day, When

from schema.activities import RunningInterface
from typing import List

numeric = Numeric()
address = Address()


def random_datetime(beginning=None, end=None) -> datetime:
    if beginning is None:
        beginning = datetime.now()
    if end is None:
        end = datetime.now()

    if beginning > end:
        raise ValueError()

    difference_ = (end - beginning).total_seconds()
    random_seconds = randint(0, int(difference_))

    return beginning + timedelta(seconds=random_seconds)


def running(user_id: int) -> RunningInterface:
    return RunningInterface(
        id=uuid4().hex,
        user_id=user_id,
        referenceDate=int(random_datetime(day(datetime.now(), When.BEGINNING_OF_CURRENT_WEEK)).timestamp() * 1.e3),
        calories=numeric.integer_number(start=100, end=200),
        locationName=address.city(),
        duration=numeric.integer_number(start=120, end=240),
        name="running",
        raw_name="",
        activeZoneMinutes=numeric.integer_number(start=4, end=16),
        distance=numeric.integer_number(start=int(1.e3), end=int(2.e3)),
        maximumSpeed=0,
        averageHeartRate=numeric.integer_number(start=120, end=160),
        maximumHeartRate=numeric.integer_number(start=160, end=180),
        averagePace=numeric.float_number(start=4.0, end=7),
        steps=numeric.integer_number(start=100, end=500)
    )


def running_activities(user_id: int, cardinality: int = 0x04):
    return [running(user_id) for index_ in range(0, cardinality)]


def distance(running_activities_: List[RunningInterface]):
    return list(map(lambda x: x.distance, running_activities_))


def duration(running_activities_: List[RunningInterface]):
    return list(map(lambda x: x.duration, running_activities_))


if __name__ == "__main__":
    print(distance(running_activities(-2)))
    print(duration(running_activities(-2)))
