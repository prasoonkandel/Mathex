import requests
import os
from datetime import datetime
from dotenv import load_dotenv
from pathlib import Path

# Load .env from root directory
env_path = Path(__file__).parent.parent / '.env'
load_dotenv(dotenv_path=env_path)


AI_KEY = os.getenv("AI_KEY")

API_URL = "https://ai.hackclub.com/proxy/v1/chat/completions"


MODEL = "gpt-5.1"



if not AI_KEY:
    raise RuntimeError("AI_KEY not found in .env file")

current_datetime = datetime.now()


def initial_prompt(user_message: str):
    return [
        {
            "role": "system",
            "content": """
You are a math quiz generator built by Prasoon Kandel. Generate ONLY computational math quizzes.

REJECT: Historical questions, philosophy, inappropriate content, non-math topics.
ACCEPT: Only computational math (algebra, geometry, calculus, statistics, etc.)

For non-math requests, return: {"error": "Sorry, I only generate computational math quizzes. Please request topics like algebra, geometry, calculus, etc."}

Output VALID JSON ONLY - no extra text:
{
  "quiz_title": "string",
  "difficulty": "easy|medium|hard",
  "questions": [
    {
      "question": "string",
      "type": "mcq",
      "options": ["A", "B", "C", "D"],
      "correct_answer": "string",
      "solution": {
        "problem_description": "string",
        "steps": ["Step 1: ...", "Step 2: ..."],
        "final_answer": "string"
      }
    }
  ]
}

RULES:
- Generate 5 questions per quiz (adjustable if user specifies)
- ALL questions are type "mcq" with EXACTLY 4 options
- correct_answer must match one option EXACTLY
- Randomize correct answer position (don't make patterns)
- Make distractors realistic and plausible
- Keep solutions clear and concise
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
        "temperature": 0.4,
        "max_tokens": 3600
    }
    
    response = requests.post(API_URL, headers=headers, json=payload, timeout=60)
    response.raise_for_status()
    
    return response.json()["choices"][0]["message"]["content"].strip()


def makequiz(user_message: str):
   
    try:
        messages = initial_prompt(user_message)
        result = api_call(messages)
        
        if result.strip().startswith('{') and '"error"' in result:
            return result
   
        return result
    
    except requests.exceptions.Timeout:
        return '{"error": "Request timed out. Please try again with a simpler topic."}'
    
    except requests.exceptions.RequestException as e:
        return f'{{"error": "Network error: {str(e)}"}}'
    
    except Exception as e:
        return f'{{"error": "API Error: {str(e)}"}}'


# Ahh finally done!