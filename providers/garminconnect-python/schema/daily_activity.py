from dataclasses import dataclass


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
