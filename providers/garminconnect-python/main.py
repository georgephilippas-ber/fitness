from garminconnect_.garminconnect_ import GarminConnect

from dataclasses import asdict
from database.database import DatabaseProvider

if __name__ == "__main__":
    garminConnect = GarminConnect("george.philippas@outlook.com", "4AANmBuG3kyKT5r4")

    databaseProvider = DatabaseProvider()

    databaseProvider.update_daily_activity(garminConnect.activity_dataclass(-2))
    databaseProvider.update_activities(garminConnect.activities_period_dataclass(-2))

    print(garminConnect.disconnect())
