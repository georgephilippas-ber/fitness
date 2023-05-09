from __future__ import annotations

from dataclasses import dataclass

from enum import Enum
from typing import Optional, Dict

from datetime import datetime


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


def to_running(user_id: int, activity: Dict) -> Optional[RunningInterface]:
    name = activity.get("activityType", {}).get("typeKey")

    if name in ["running", "walking"]:
        return RunningInterface(calories=activity["calories"],
                                distance=activity["distance"],
                                referenceDate=int(
                                    datetime.fromisoformat(activity["startTimeLocal"]).timestamp() * 1.e3),
                                user_id=user_id,
                                steps=activity["steps"],
                                id=str(activity["activityId"]),
                                raw_name=activity.get("activityType", {}).get("typeKey"),
                                duration=activity["duration"],
                                averagePace=(activity["duration"] / 60) / (activity["distance"] / 1.e3),
                                maximumSpeed=activity["maxSpeed"],
                                maximumHeartRate=activity["maxHR"],
                                averageHeartRate=activity["averageHR"],
                                locationName=activity["locationName"],
                                activeZoneMinutes=0,
                                name=name)
    else:
        return None


def to_cycling_bike(user_id: int, activity: Dict) -> Optional[CyclingBikeInterface]:
    name = activity.get("activityType", {}).get("typeKey")

    if name in ["cycling"]:
        return CyclingBikeInterface(calories=activity["calories"],
                                    distance=activity["distance"],
                                    referenceDate=int(
                                        datetime.fromisoformat(activity["startTimeLocal"]).timestamp() * 1.e3),
                                    user_id=user_id,
                                    id=str(activity["activityId"]),
                                    raw_name=activity.get("activityType", {}).get("typeKey"),
                                    duration=activity["duration"],
                                    averageHeartRate=activity["averageHR"],
                                    locationName=activity["locationName"],
                                    activeZoneMinutes=activity.get("moderateIntensityMinutes", 0) + activity.get(
                                        "vigorousIntensityMinutes", 0),
                                    name="cycling-bike", speed=activity["averageSpeed"])
    else:
        return None


def to_activity(user_id: int, activity: Dict) -> Optional[ActivityInterfaceBase]:
    match activity.get("activityType", {}).get("typeKey"):
        case "running" | "walking":
            return to_running(user_id, activity)
        case "cycling":
            return to_cycling_bike(user_id, activity)
        case _:
            return None
