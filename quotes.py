import json
import random

JSON_FILE = "quotes.json"

def quotes():

    with open(JSON_FILE, "r") as kitab:
        data = json.load(kitab)

    quote = random.choice(data["quotes"])   

    return quote

def printer():

    quote = quotes()

    print(f"{quote['quote']} \n - {quote['author']}") 



printer()    