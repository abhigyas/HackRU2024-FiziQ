import os
import json
import requests

url = "https://localhost:5713/api/create-workout"

folder_path = b"C:\Users\Kashyap Tanuku\Desktop\MUSIC\HackRU2024-FiziQ\src\workouts_JSON"

for filename in os.listdir(folder_path):
    if filename.endswith(b".json"):
        file_path = os.path.join(folder_path, filename)

    with open(file_path, 'r') as file:
        workout_data = json.load(file)

    response = requests.post(url, json=workout_data)

    if response.status.code == 201:
        print(f"Workout {filename} created successfully")
    else:
        print(f"Failed to create workout {filename}")
        print(response.text)