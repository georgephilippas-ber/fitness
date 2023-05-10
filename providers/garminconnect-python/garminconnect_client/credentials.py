from typing import Dict, Optional

_credentials = [
    {
        "user_id": -2,
        "email": "george.philippas@outlook.com",
        "password": "4AANmBuG3kyKT5r4"
    }
]


def get_credentials(user_id: int) -> Optional[Dict[str, str]]:
    filtered = list(filter(lambda x: x.get("user_id") == user_id, _credentials))
    if filtered:
        return {"email": filtered[0]["email"], "password": filtered[0]["password"]}
    else:
        return None


if __name__ == "__main__":
    print(get_credentials(-2))
