from database_manager.database_manager import DatabaseManager
from garminconnect_client.garminconnect_client import GarminConnect

from update.update import Update

database_manager = DatabaseManager()
garmin_connect = GarminConnect("george.philippas@outlook.com", "4AANmBuG3kyKT5r4")
update_database = Update(database_manager, garmin_connect)


def update(user_id: int):
    if not garmin_connect.is_connected():
        garmin_connect.connect()

    print(update_database.update_activities(user_id))
    print(update_database.update_daily_activity(user_id))

    print("disconnect", garmin_connect.disconnect())


if __name__ == "__main__":
    update(-2)
