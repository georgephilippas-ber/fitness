import json
import uuid
from datetime import datetime, timedelta
from typing import List, Dict, Optional

from garminconnect import GarminConnectAuthenticationError, GarminConnectConnectionError, \
    GarminConnectTooManyRequestsError, Garmin
from requests.exceptions import HTTPError

from schema.activities import ActivityInterfaceBase, to_activity
from schema.daily_activity import DailyActivityType, ActiveZoneMinutesType


def connect(email: str, password: str) -> Optional[Garmin]:
    try:
        return Garmin(email=email, password=password)

    except (HTTPError, GarminConnectConnectionError, GarminConnectTooManyRequestsError,
            GarminConnectAuthenticationError) as e:
        print(e)
        return None


class GarminConnect:
    __garmin: Optional[Garmin]
    __is_connected: bool

    def __init__(self, email: str, password: str):
        self.__garmin = connect(email, password)

        self.__is_connected = self.__garmin.login()

    def connect(self) -> bool:
        if self.__garmin and not self.__is_connected:
            self.__is_connected = self.__garmin.login()
        else:
            self.__is_connected = False

        return self.__is_connected

    def disconnect(self) -> bool:
        if self.__garmin is not None and self.__is_connected:
            self.__garmin.logout()
            return True
        else:
            return False

    def is_connected(self):
        return self.__is_connected

    def activities_period_dictionary(self, beginning: datetime = datetime.now() - timedelta(days=360),
                                     end: datetime = datetime.now()) -> Optional[List[Dict]]:
        if self.__is_connected:
            try:
                dict_ = self.__garmin.get_activities_by_date(beginning.strftime('%Y-%m-%d'), end.strftime('%Y-%m-%d'))

                with open("JSON/activities_period.json", "w") as file_:
                    file_.write(json.dumps(dict_, indent=4))
                return dict_
            except (HTTPError, GarminConnectConnectionError, GarminConnectTooManyRequestsError, AttributeError) as e:
                print(e)
                return None
        else:
            return None

    def activities_period_dataclass(self, user_id: int, beginning: datetime = datetime.now() - timedelta(days=365),
                                    end: datetime = datetime.now()) -> Optional[List[ActivityInterfaceBase]]:
        raw_activities = self.activities_period_dictionary(beginning, end)

        if raw_activities is not None:
            return [to_activity(user_id, raw_activity) for raw_activity in raw_activities]
        else:
            return None

    def daily_activity_dictionary(self, date: datetime = datetime.now()) -> Optional[Dict]:
        if self.__is_connected:
            try:
                dict_ = self.__garmin.get_stats(date.strftime('%Y-%m-%d'))
                with open("JSON/activity.json", "w") as file_:
                    file_.write(json.dumps(dict_, indent=4))
                return dict_
            except (HTTPError, GarminConnectConnectionError, GarminConnectTooManyRequestsError) as e:
                print(e)
                return None
        else:
            return None

    def daily_activity_dataclass(self, user_id: int, date: datetime = datetime.now()) -> Optional[DailyActivityType]:
        dict_ = self.daily_activity_dictionary(date)

        # TODO: dict_.get("totalKilocalories") is not None: garminconnect invalid activities, most fields null, rewrite

        if dict_ and dict_.get("totalKilocalories") is not None:
            active_zone_minutes = ActiveZoneMinutesType(fatBurnActiveZoneMinutes=dict_.get("activeSeconds", 0.) / 60.,
                                                        cardioActiveZoneMinutes=dict_.get("highlyActiveSeconds",
                                                                                          0) / 60,
                                                        peakActiveZoneMinutes=dict_.get("vigorousIntensityMinutes", 0),
                                                        activeZoneMinutes=0)

            daily_activity = DailyActivityType(id=uuid.uuid4().hex,
                                               activity_calories=dict_["activeKilocalories"],
                                               active_zone_minutes=active_zone_minutes,
                                               referenceDate=int(date.timestamp() * 1.e3),
                                               calories=dict_["totalKilocalories"],
                                               distance=dict_["totalDistanceMeters"],
                                               elevation=dict_["floorsAscendedInMeters"],
                                               user_id=user_id, calories_BMR=dict_["bmrKilocalories"],
                                               floors=dict_["floorsAscended"],
                                               steps=dict_["totalSteps"])

            return daily_activity
        else:
            return None
