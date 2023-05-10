from dataclasses import asdict
from datetime import datetime
from enum import Enum
from typing import Optional, List

from pymongo import MongoClient, DESCENDING
from pymongo.database import Database

from schema.activities import ActivityInterfaceBase
from schema.daily_activity import DailyActivityType
from features.time_feature.time_feature import today, When

mongodb_atlas_username: str = "georgephilippas-ber"
mongodb_atlas_password: str = "85D3qpDm5Ycfq4f6"
mongodb_atlas_cluster_name: str = "cluster0"


class ManagerType(Enum):
    DailyActivity = 0
    Activities = 1


class DatabaseManager:
    mongoClient: MongoClient
    database: str

    def __init__(self, database: str = "corporate"):
        self.database = database

        self.mongoClient = MongoClient(
            f"mongodb+srv://{mongodb_atlas_username}:{mongodb_atlas_password}@{mongodb_atlas_cluster_name}.y9c01hn.mongodb.net/?retryWrites=true&w=majority")

    def get_database(self) -> Optional[Database]:
        return self.mongoClient.get_database(self.database) if self.mongoClient else None

    def get_collection(self, collection: str):
        return self.get_database().get_collection(collection)

    def update_daily_activity(self, daily_activity: DailyActivityType) -> bool:
        daily_activity.referenceDate = int(
            today(datetime.fromtimestamp(daily_activity.referenceDate / 1.e3), When.BEGINNING).timestamp() * 1.e3)

        update_result = self.get_collection("ActivityManager").update_one(
            {"referenceDate": daily_activity.referenceDate, "user_id": daily_activity.user_id},
            {"$set": asdict(daily_activity)}, upsert=True)

        return update_result.modified_count > 0 or update_result.upserted_id is not None

    def update_activities(self, activities: List[ActivityInterfaceBase]) -> None:
        for activity in activities:
            self.get_collection("ActivitiesManager").update_one({"user_id": activity.user_id, "id": activity.id},
                                                                {"$set": asdict(activity)}, upsert=True)

    def get_latest_date(self, user_id: int, manager: ManagerType) -> Optional[datetime]:
        match manager:
            case ManagerType.DailyActivity:
                collection = "ActivityManager"
            case ManagerType.Activities:
                collection = "ActivitiesManager"
            case _:
                collection = "ActivityManager"

        documents_ = list(self.get_collection(collection).find({"user_id": user_id}).sort(
            [("referenceDate", DESCENDING)]).limit(1))

        if documents_:
            return datetime.fromtimestamp(documents_[0].get("referenceDate") / 1.e3)
        else:
            return None
