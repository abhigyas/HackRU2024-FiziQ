import os
import json
import requests
import urllib3.exceptions

url = "https://localhost:5713/api/create-workout"

folder_path = b"C:\Users\devpa\Documents\GitHub\HackRU2024-FiziQ\src\workouts_JSON"

for filename in os.listdir(folder_path):
    if filename.endswith(b".json"):
        file_path = os.path.join(folder_path, filename)

    with open(file_path, 'r') as file:
        workout_data = json.load(file)

    try:
        response = requests.post(url, json=workout_data)
        if response.status_code == 201:
            print(f"Workout {filename} created successfully")
        else:
            print(f"Failed to create workout {filename}")
            print(response.text)
    except (urllib3.exceptions.NewConnectionError, requests.exceptions.ConnectionError) as e:
        print(f"Failed to establish a connection: {e}")
