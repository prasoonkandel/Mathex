import requests

API_URL = "https://random-math-quote-api.herokuapp.com/"

def quote():
    try:

        response = requests.get(API_URL, timeout=5)
        response.raise_for_status()
        return response.json()
    
    except requests.RequestException as e:

        return {"error": f"Can't fetch quote due to: {e}"}

def printer():

    print("This is a random quote:")
    
    quote_data = quote()

    if "error" in quote_data:
        print(quote_data["error"])
    else:
        print(f'"{quote_data.get("quote", "No quote")}" - {quote_data.get("author", "Unknown")}')
