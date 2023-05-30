from typing import Tuple

from database_manager.database_manager import DatabaseManager
from garminconnect_client.garminconnect_client import GarminConnect

from database_manager.database_manager import ManagerType
from datetime import datetime, timedelta
from features.time_feature.time_feature import day, When

global_beginning = day(datetime.now().replace(day=1), When.BEGINNING_OF_CURRENT_DAY)


class Update:
    __database_manager: DatabaseManager
    __garmin_connect: GarminConnect

    def __init__(self, database_manager: DatabaseManager, garmin_connect: GarminConnect):
        self.__database_manager = database_manager
        self.__garmin_connect = garmin_connect

    def update_daily_activity(self, user_id: int) -> Tuple[int, datetime]:
        latest_date_candidate = self.__database_manager.get_latest_date(user_id,
                                                                        ManagerType.DailyActivity)

        latest_date = max(latest_date_candidate,
                          global_beginning) if latest_date_candidate is not None else global_beginning

        current = latest_date
        counter = 0
        while current <= day(datetime.now(), When.END_OF_CURRENT_DAY):
            activity_ = self.__garmin_connect.daily_activity_dataclass(user_id, current)

            if activity_:
                self.__database_manager.update_daily_activity(activity_)
                counter += 1

            current += timedelta(days=1)

        return counter, current - timedelta(days=1)

    def update_activities(self, user_id: int) -> int:
        latest_date_candidate = self.__database_manager.get_latest_date(user_id,
                                                                        ManagerType.DailyActivity)
        print(latest_date_candidate)

        latest_date = max(latest_date_candidate,
                          global_beginning) if latest_date_candidate is not None else global_beginning

        activities = self.__garmin_connect.activities_period_dataclass(user_id, day(latest_date, When.BEGINNING_OF_CURRENT_DAY))

        if activities is not None:
            self.__database_manager.update_activities(activities)
            return len(activities)
        else:
            return -1
