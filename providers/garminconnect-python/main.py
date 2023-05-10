from database_manager.database_manager import DatabaseManager
from database_manager.database_manager import ManagerType
from garminconnect_client.garminconnect_client import GarminConnect

database_manager = DatabaseManager()


def client():
    garmin_connect = GarminConnect("george.philippas@outlook.com", "4AANmBuG3kyKT5r4")

    database_manager.update_daily_activity(garmin_connect.activity_dataclass(-2))
    database_manager.update_activities(garmin_connect.activities_period_dataclass(-2))

    print(garmin_connect.disconnect())


if __name__ == "__main__":
    print(database_manager.get_latest_date(-2, ManagerType.Activities))
