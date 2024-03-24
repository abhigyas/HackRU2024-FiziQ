import os
import json
import requests

url = "https://localhost:5713/api/create-workout"

folder_path = "C:\Users\devpa\Documents\GitHub\HackRU2024-FiziQ\src\workouts_JSON"

for filename in os.listdir(folder_path):
    if filename.endswith(".json"):
        file_path = os.path.join(folder_path, filename)

    with open(file_path, 'r') as file:
        workout_data = json.load(file)
            