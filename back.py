import requests
import os
from datetime import datetime
from dotenv import load_dotenv


load_dotenv()


AI_KEY = os.getenv("AI_KEY")
API_URL = "https://ai.hackclub.com/proxy/v1/chat/completions"


MODEL = "openai/gpt-5-mini"


if not AI_KEY:
    raise RuntimeError("AI_KEY not found in .env file")

current_datetime = datetime.now()

commands = {
    "bye": "Bye, have a nice day!"
}



def inital_prompt(user_message: str):
    return [
        {
            "role": "system",
          "content": (
                "You are Mathex, a mathematics problem-solving engine.\n\n"
                "Write solutions in notebook style.\n"

                "Use one clear method.\n"
                "Include a short problem description.\n"
                "Write steps in order with brief captions.\n"
                "End with a final answer.\n\n"
                "Format:\n"
                "Problem Description:\n"
                "Step 1:\n"
                "Step 2:\n"
                "Final Answer:"
                "Note: If the question is incorrect or incomplete, inform the user it is incorrect or incomplete only do not correct the question. \n"
                "Note: If the question is not mathematical, inform the user that you can only assist with math problems by telling exact this phrase: 'Sorry that expression is not a mathematical problem. I am a mathematics problem-solving engine built by Prasoon Kandel. I can only assist with math problems.'"

            )
        },
        {"role": "user", "content": user_message}
    ]


def api_call(messages):
    headers = {
        "Authorization": f"Bearer {AI_KEY}",
        "Content-Type": "application/json"
    }

    payload = {


        "model": MODEL,
        "messages": messages,
        "temperature": 0.2,

    
    }

    response = requests.post(API_URL, headers=headers, json=payload)

    response.raise_for_status()
    
    return response.json()["choices"][0]["message"]["content"].strip()


def answer(user_message: str):
    for key in commands:

        if key in user_message.lower():

            return commands[key]

    try:
        messages = inital_prompt(user_message)

        return api_call(messages)
    

    except Exception as e:

        eror_message = "Hack Club AI Error:" + str(e)
        return eror_message
