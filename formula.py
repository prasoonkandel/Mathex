import requests
import os
from dotenv import load_dotenv 

load_dotenv()

AI_KEY = os.getenv("AI_KEY")

API_URL = "https://ai.hackclub.com/proxy/v1/chat/completions"

MODEL = "gpt-5.1"

if not AI_KEY:
    raise RuntimeError("AI_KEY not found in .env file")

def formula_prompt(user_message: str, grade:str):
    return [
        {
            "role": "system",
            "content": (
                "You are Mathex Formula Helper, built by Prasoon Kandel to provide mathematical formulas.\n\n"
                "When asked for a formula, provide ONLY the formula in clean LaTeX format with a brief description.\n\n"
                f"Provide formula according to the user's grade level: {grade}\n\n"
                f"Provide the forlmula which are most relevant to {grade} level, use simple mathmatical symbols for early highschool and under.\n\n"
                "Format your response like this:\n"
                "- Wrap everything in <div> tags\n"
                "- Start with a brief formula name/title in <strong> tag\n"
                "- Display the formula in big, readable LaTeX\n"
                "- Make the formula big: <span style='font-size:1.8em;'>$your formula here$</span>\n"
                "- Add a brief description below (2-3 lines max) explaining what each variable means\n"
                "- Keep it concise - formula first, minimal explanation\n\n"
                "LaTeX formatting:\n"
                "Fractions: $\\frac{a}{b}$\n"
                "Roots: $\\sqrt{x}$\n"
                "Powers: $x^2$\n"
                "Subscripts: $x_1$\n"
                "Greek letters: $\\pi, \\theta, \\alpha$\n"
                "Text in math: $\\text{your text}$\n\n"
                "Example:\n"
                "<div style='padding:15px;'>\n"
                "<strong>Quadratic Formula</strong><br><br>\n"
                "<span style='font-size:1.8em;'>$x = \\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}$</span><br><br>\n"
                "<p style='color:#666;'>For equation $ax^2 + bx + c = 0$<br>\n"
                "where $a$, $b$, $c$ are coefficients and $a \\neq 0$</p>\n"
                "</div>\n\n"
                "If the request is not about a mathematical formula, say: 'Sorry, I only provide math formulas. I'm Mathex Formula Helper, built by Prasoon Kandel.'"
            )
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
        "temperature": 0.3

    }

    response = requests.post(API_URL, headers=headers, json=payload)
    response.raise_for_status()
    return response.json()["choices"][0]["message"]["content"].strip()


def get_4mula(user_message: str, grade: str = "high school"):
    try:
        messages = formula_prompt(user_message, grade)
        return api_call(messages)
    except Exception as e:
        return "Hack Club AI Error: " + str(e)
