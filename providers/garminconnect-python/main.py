from database_manager.database_manager import DatabaseManager
from garminconnect_client.garminconnect_client import GarminConnect

from update.update import Update
from garminconnect_client.credentials import get_credentials

database_manager = DatabaseManager()


def update(user_id: int):
    if get_credentials(user_id):
        garmin_connect = GarminConnect(**get_credentials(user_id))
        update_database = Update(database_manager, garmin_connect)

        if not garmin_connect.is_connected():
            garmin_connect.connect()

        print(update_database.update_activities(user_id))
        print(update_database.update_daily_activity(user_id))

        print("disconnect", garmin_connect.disconnect())
    else:
        print("!user_id")


if __name__ == "__main__":
    update(-2)
