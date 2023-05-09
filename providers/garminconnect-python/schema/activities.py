from __future__ import annotations

from dataclasses import dataclass

from enum import Enum
from typing import Optional


class ActivityNameType(Enum):
    CYCLING_BIKE = 0
    RUNNING = 1
    WALKING = 2
    TREADMILL_RUNNING = 3
    OTHER = 4

    @staticmethod
    def to_name(activity_name_enum: ActivityNameType):
        match activity_name_enum:
            case ActivityNameType.CYCLING_BIKE:
                return "cycling-bike"
            case ActivityNameType.WALKING:
                return "walking"
            case ActivityNameType.RUNNING:
                return "running"
            case ActivityNameType.TREADMILL_RUNNING:
                return "treadmill-running"
            case ActivityNameType.OTHER:
                return "other"


@dataclass
class ActivityInterfaceBase:
    id: str
    user_id: int
    referenceDate: int
    calories: float
    locationName: Optional[str]
    duration: int
    name: str
    raw_name: Optional[str]
    activeZoneMinutes: int
    distance: float


@dataclass
class RunningInterface(ActivityInterfaceBase):
    maximumSpeed: int

    averageHeartRate: int
    maximumHeartRate: int

    averagePace: float

    steps: int


@dataclass
class CyclingBikeInterface(ActivityInterfaceBase):
    speed: float
    averageHeartRate: int

