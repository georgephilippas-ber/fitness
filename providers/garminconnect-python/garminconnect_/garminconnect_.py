import json
import uuid
from typing import Any, List, Dict, Optional

from requests.exceptions import HTTPError

from garminconnect import GarminConnectAuthenticationError, GarminConnectConnectionError, \
    GarminConnectTooManyRequestsError, Garmin

from datetime import datetime, timedelta
from schema.daily_activity import DailyActivityType, ActiveZoneMinutesType
from schema.activities import ActivityInterfaceBase, to_activity


def connect(email: str, password: str) -> Optional[Garmin]:
    try:
        return Garmin(email=email, password=password)

    except (HTTPError, GarminConnectConnectionError, GarminConnectTooManyRequestsError,
            GarminConnectAuthenticationError) as e:
        print(e)
        return None


class GarminConnect:
    garmin: Optional[Garmin]

    def __init__(self, email: str, password: str):
        self.garmin = connect(email, password)
        self.garmin.login()

    def disconnect(self) -> bool:
        if self.garmin is not None:
            self.garmin.logout()
            return True
        else:
            return False

    def activities_latest_dictionary(self) -> Optional[Dict]:
        if self.garmin:
            try:
                dict_ = self.garmin.get_last_activity()
                with open("JSON/activities_latest.json", "w") as file_:
                    file_.write(json.dumps(dict_, indent=4))
                return dict_
            except (HTTPError, GarminConnectConnectionError, GarminConnectTooManyRequestsError) as e:
                print(e)
                return None

    def activities_period_dictionary(self, beginning: datetime = datetime.now() - timedelta(days=360),
                                     end: datetime = datetime.now()) -> Optional[List[Dict]]:
        if self.garmin:
            try:
                dict_ = self.garmin.get_activities_by_date(beginning.strftime('%Y-%m-%d'), end.strftime('%Y-%m-%d'))

                with open("JSON/activities_period.json", "w") as file_:
                    file_.write(json.dumps(dict_, indent=4))
                return dict_
            except (HTTPError, GarminConnectConnectionError, GarminConnectTooManyRequestsError, AttributeError) as e:
                print(e)
                return None

    def activities_period_dataclass(self, user_id: int, beginning: datetime = datetime.now() - timedelta(days=365),
                                    end: datetime = datetime.now()) -> Optional[List[ActivityInterfaceBase]]:
        raw_activities = self.activities_period_dictionary(beginning, end)

        if raw_activities:
            return [to_activity(user_id, raw_activity) for raw_activity in raw_activities]
        else:
            return None

    def daily_activity_dictionary(self, date: datetime = datetime.now()) -> Optional[Dict]:
        if self.garmin:
            try:
                dict_ = self.garmin.get_stats(date.isoformat())
                with open("JSON/activity.json", "w") as file_:
                    file_.write(json.dumps(dict_, indent=4))
                return dict_
            except (HTTPError, GarminConnectConnectionError, GarminConnectTooManyRequestsError) as e:
                print(e)
                return None

    def activity_dataclass(self, user_id: int, date: datetime = datetime.now()) -> Optional[DailyActivityType]:
        dict_ = self.daily_activity_dictionary(date)

        if dict_:
            active_zone_minutes = ActiveZoneMinutesType(fatBurnActiveZoneMinutes=dict_["activeSeconds"] / 60,
                                                        cardioActiveZoneMinutes=dict_["highlyActiveSeconds"] / 60,
                                                        peakActiveZoneMinutes=dict_["vigorousIntensityMinutes"],
                                                        activeZoneMinutes=0)

            daily_activity = DailyActivityType(id=uuid.uuid4().hex,
                                               activity_calories=dict_["activeKilocalories"],
                                               active_zone_minutes=active_zone_minutes,
                                               referenceDate=int(date.now().timestamp() * 1.e3),
                                               calories=dict_["totalKilocalories"],
                                               distance=dict_["totalDistanceMeters"],
                                               elevation=dict_["floorsAscendedInMeters"],
                                               user_id=user_id, calories_BMR=dict_["bmrKilocalories"],
                                               floors=dict_["floorsAscended"],
                                               steps=dict_["totalSteps"])

            return daily_activity
        else:
            return None
