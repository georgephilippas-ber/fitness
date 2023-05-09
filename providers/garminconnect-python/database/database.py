from pymongo import MongoClient
from pymongo.collection import Collection

from dataclasses import dataclass, asdict


@dataclass
class ActiveZoneMinutesType:
    fatBurnActiveZoneMinutes: float
    cardioActiveZoneMinutes: float
    peakActiveZoneMinutes: float
    activeZoneMinutes: float


@dataclass
class DailyActivityType:
    id: str
    user_id: int
    referenceDate: int
    activity_calories: int
    calories: int
    calories_BMR: int
    distance: int
    elevation: float
    floors: float
    steps: int
    active_zone_minutes: ActiveZoneMinutesType


class Database:
    mongoClient: MongoClient

    def __init__(self):
        self.mongoClient = MongoClient("")
