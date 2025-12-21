import requests
import os
from datetime import datetime
from dotenv import load_dotenv


load_dotenv()


AI_KEY = os.getenv("AI_KEY")

API_URL = "https://ai.hackclub.com/proxy/v1/chat/completions"



MODEL = "gpt-5.1"


if not AI_KEY:
    raise RuntimeError("AI_KEY not found in .env file")

current_datetime = datetime.now()

commands = {


    "bye": "Bye, have a nice day!"


}

def initial_prompt(user_message: str):
    return [
        {
            "role": "system",
            "content": """
You are a mathematics quiz generator.

Generate quizzes strictly according to the user's description and grade level.

IMPORTANT: ALL questions MUST be multiple choice with EXACTLY 4 options.

Output rules:
- Output VALID JSON ONLY.
- Do NOT include explanations outside the JSON.
- Do NOT make correct answer too easy to guess.
- Do NOT make correct answer same option for all questions.
- Do NOT include comments or trailing commas.
- Use UTF-8 math symbols only if necessary.

Required JSON format:
{
  "quiz_title": "string",
  "difficulty": "easy | medium | hard",
  "questions": [
    {
      "question": "string",
      "type": "mcq",
      "options": ["string", "string", "string", "string"],
      "correct_answer": "string",
      "solution": {
        "problem_description": "string",
        "steps": [
          "Step 1: ...",
          "Step 2: ..."
        ],
        "final_answer": "string"
      }
    }
  ]
}

Rules for questions:
- Generate ONLY mathematical questions.
- ALL questions MUST be type "mcq" (multiple choice).
- Difficulty must match the user's level.
- Use one standard and correct method per solution.
- Avoid unnecessary complexity.
- Steps must be clear, ordered, and notebook-style.

Rules for MCQs:
- MANDATORY: Provide EXACTLY four options.
- Only ONE option must be correct.
- Wrong options must be realistic and mathematically plausible.
- Do NOT include trivial or impossible distractors.
- Options should be distinct and clear.

Rules for answers:
- Integer answers must be numeric strings (e.g., "12").
- Fractional answers must be simplified.
- Sign (+/−) must match quadrant or condition.
- correct_answer must match one of the options EXACTLY.

Validation:
- If the request is mathematically incorrect or incomplete, return:
  { "error": "The question is incorrect or incomplete." }

- Minor spelling or typing mistakes may be corrected if intent is clear.

- If the request is NOT mathematical, return exactly:
  {
    "error": "Sorry that expression is not a mathematical problem. I am a mathematics problem-solving engine built by Prasoon Kandel. I can only assist with math problems."
  }

Strictness:
- Never assume missing data.
- Never invent constraints not stated or implied.
- Never explain the JSON structure in the output.
- ALWAYS include exactly 4 options for every question.
"""
        },
        {
            "role": "user",
            "content": user_message
        }
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


def makequiz(user_message: str):
    for key in commands:

        if key in user_message.lower():

            return commands[key]

    try:
        messages = initial_prompt(user_message)

        return api_call(messages)
    

    except Exception as e:

        eror_message = "Hack Club AI Error:" + str(e)
        return eror_message

