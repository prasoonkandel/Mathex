import requests
import os
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



commands = {
# Easter Eggs   
    "who is prasoon": 
    """
        <div style='padding:15px;'>
            <h3 style='color:#4a90e2;'>👨‍💻 Prasoon Kandel</h3>
            <p><strong>Creator of Mathex</strong></p>
            <p style='font-size:1.2em;margin:10px 0;'>
                <span style='font-size:1.3em;s'>$\\text{Aura} = \\infty$</span>
            </p>
            <p style='color:#666;'>"Making math beautiful, one equation at a time"</p>
        </div>
        
        """,
    "Radha Krishna": 
    """
        <div style='padding:15px;'>
            <h3 style='color:#4a90e2;'>Radha Krishna</h3>
            <p><strong>Universal Expression</strong></p>
            <p style='font-size:1.2em;margin:10px 0;'>
                <span style='font-size:1.3em;s'>$\\text{Radha} = \\text{Krishna}$</span>
            </p>
            <p style='color:#666;'>"Making math beautiful, one equation at a time"</p>
        </div>
        """
}
def inital_prompt(user_message: str):
    return [
        {
            "role": "system",
            "content": (

            
                "You are Mathex, a math helper built by Prasoon Kandel to solve ONLY computational math problems step by step.\n\n"
                "STRICT RULES - REFUSE these types of questions:\n"
                "❌ Historical questions (Who invented/discovered/father of math/mathematician)\n"
                "❌ Philosophy or opinion questions (Why, prove concepts unrelated to math)\n"
                "❌ Non-mathematical topics disguised with math keywords\n"
                "❌ Inappropriate, racist, or offensive content\n"
                "❌ General trivia or facts about mathematics\n"
                "❌ Greetings or casual conversation\n\n"
                "✅ ONLY ANSWER: Computational math problems that require calculations, solving equations, geometry, algebra, calculus, statistics, etc.\n\n"
                "For ANY non-computational question, respond EXACTLY:\n"
                "'Sorry, I only solve computational math problems. I'm Mathex, built by Prasoon Kandel. Please ask a math calculation or equation to solve.'\n\n"
                "Present solutions clearly with big, readable math expressions. Keep text brief and let the math speak for itself.\n\n"
                "Format your response like this:\n"
                "- Wrap everything in <div> tags\n"
                "- All text (problem description and steps) should be the same normal size\n"
                "- Number each step (Step 1:, Step 2:, etc.) with <strong> tag\n"
                "- For bold text, ALWAYS use HTML <strong> or <b> tags, NEVER use Markdown ** syntax\n"
                "- Write all math in LaTeX using $ signs: $your math here$\n"
                "- Make math big by wrapping it: <span style='font-size:1.5em;'>$your math here$</span>\n"
                "- ALWAYS add <br> after step description text (like 'Calculate the midpoint coordinates:') and before the math expression\n"
                "- Add <br> after each equals sign when showing work step by step (like $= 2+2$<br>, $= 4$<br>)\n"
                "- Add <br> after 'Problem:' label\n"
                "- Make final answer extra bold and big: <strong style='font-size:1.6em;'>Final Answer:</strong>\n\n"
                "Quick LaTeX reference:\n"
                "Fractions: $\\frac{a}{b}$\n"
                "Roots: $\\sqrt{x}$\n"
                "Powers: $x^2$\n"
                "Text in math: $\\text{your text}$\n\n"
                "Example:\n"
                "<div>\n"
                "<strong>Problem:</strong><br>\n"
                "Solve $x^2 + 5x + 6 = 0$<br><br>\n"
                "<strong>Step 1:</strong><br>\n"
                "Factor the quadratic:<br>\n"
                "<span style='font-size:1.5em;'>$(x+2)(x+3)=0$</span><br>\n"
                "<strong>Step 2:</strong><br>\n"
                "Solve for x:<br>\n"
                "<span style='font-size:1.5em;'>$x=-2, x=-3$</span><br><br>\n"
                "<strong style='font-size:1.6em;'>Final Answer:</strong><br>\n"
                "<span style='font-size:1.5em;'>$x=-2, x=-3$</span>\n"
                "</div>\n\n"
                "If the question is incomplete or has typos but you understand the math problem, fix it and solve. Otherwise, reject non-computational questions."
            
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
        "temperature": 0.2

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
        
        return "API Error: " + str(e)
