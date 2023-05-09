from garminconnect_.garminconnect_ import GarminConnect

if __name__ == "__main__":
    garminConnect = GarminConnect("george.philippas@outlook.com", "4AANmBuG3kyKT5r4")

    print(garminConnect.activity_dataclass(-2))

    print(garminConnect.disconnect())
