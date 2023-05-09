from garminconnect_.garminconnect_ import GarminConnect

from dataclasses import asdict
from database.database import DatabaseProvider

if __name__ == "__main__":
    garminConnect = GarminConnect("george.philippas@outlook.com", "4AANmBuG3kyKT5r4")

    databaseProvider = DatabaseProvider()

    # print(databaseProvider.update_activity(garminConnect.activity_dataclass(-2)))

    print(garminConnect.activities_latest_dictionary())
    print(garminConnect.activities_period_dictionary())

    print(garminConnect.disconnect())
