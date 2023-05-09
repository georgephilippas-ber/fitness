from dataclasses import asdict
from datetime import datetime
from typing import Optional

from pymongo import MongoClient
from pymongo.database import Database

from schema.daily_activity import DailyActivityType
from time_.time_feature import today, When

mongodb_atlas_username: str = "georgephilippas-ber"
mongodb_atlas_password: str = "85D3qpDm5Ycfq4f6"
mongodb_atlas_cluster_name: str = "cluster0"


class DatabaseProvider:
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

    def update_activity(self, daily_activity: DailyActivityType) -> bool:
        daily_activity.referenceDate = int(
            today(datetime.fromtimestamp(daily_activity.referenceDate / 1.e3), When.BEGINNING).timestamp() * 1.e3)

        update_result = self.get_collection("ActivityManager").update_one(
            {"referenceDate": daily_activity.referenceDate, "user_id": daily_activity.user_id},
            {"$set": asdict(daily_activity)}, upsert=True)

        return update_result.modified_count > 0 or update_result.upserted_id is not None
