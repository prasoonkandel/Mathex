import json
import random
from pathlib import Path

# Path to quotes.json in the Backend directory
JSON_FILE = Path(__file__).parent / "quotes.json"

def quotes():

    with open(JSON_FILE, "r") as kitab:
        data = json.load(kitab)

    quote = random.choice(data["quotes"])   

    return quote

def printer():

    quote = quotes()

    print(f"{quote['quote']} \n - {quote['author']}") 



