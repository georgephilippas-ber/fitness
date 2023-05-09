import json
from typing import Any, List, Dict, Optional

from requests.exceptions import HTTPError

from garminconnect import GarminConnectAuthenticationError, GarminConnectConnectionError, \
    GarminConnectTooManyRequestsError, Garmin

from datetime import datetime


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

    def activity(self, date: datetime = datetime.now()) -> Optional[Dict]:
        if self.garmin:
            try:
                dict_ = self.garmin.get_stats(date.isoformat())
                with open("JSON/activity.json", "w") as file_:
                    file_.write(json.dumps(dict_, indent=4))
                return dict_
            except (HTTPError, GarminConnectConnectionError, GarminConnectTooManyRequestsError) as e:
                print(e)
                return dict()
