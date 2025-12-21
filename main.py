from flask import Flask, request, jsonify, render_template
from engine import answer
from qngen import makequiz
from quotes import quotes as get_quote
from formula import get_4mula
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route("/")
def home():
    return render_template("index.html")

@app.route("/api/solve", methods=["POST"])
def solve():
    try:
        data = request.get_json()
        question = data.get("question", "")
        
        if not question:
            return jsonify({"error": "No question provided"}), 400
    
        result = answer(question)
        
        return jsonify({"answer": result})
    
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    
@app.route("/api/quiz", methods=["POST"])
def quiz_api():
    try:
        data = request.get_json()
        description = data.get("description", "")
        grade_level = data.get("grade_level", "")
        
        if not description or not grade_level:
            return jsonify({"error": "Description and grade level are required"}), 400
          
        result = makequiz(f"Generate a quiz for grade {grade_level} on the topic: {description}")
        
        return jsonify({"quiz": result})
    
    except Exception as e:
        return jsonify({"error": str(e)}), 500    
    

@app.route("/api/quotes", methods=["GET"])
def quotes_api():
    try:
        quote_data = get_quote()
        return jsonify(quote_data)
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    

@app.route("/api/formula", methods=["POST"])
def formula():
    try:
        data = request.get_json()
        formula_query = data.get("formula", "")
        
        if not formula_query:
            return jsonify({"error": "No formula requested"}), 400
    
        result = get_4mula(formula_query)
        
        return jsonify({"formula": result})
    
    except Exception as e:
        return jsonify({"error": str(e)}), 500    

if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0", port=5000)




