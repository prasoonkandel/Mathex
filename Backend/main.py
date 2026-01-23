from flask import Flask, request, jsonify
from engine import answer
from qngen import makequiz
from quotes import quotes as get_quote
from formula import get_4mula
from bar_chart import generate_chart as generate_bar_chart
from pie_chart import generate_chart as generate_pie_chart
from flask_cors import CORS
import os
import traceback

app = Flask(__name__)

CORS(app, resources={
    r"/*": {
        "origins": "*",
        "methods": ["GET", "POST", "OPTIONS"],
        "allow_headers": ["Content-Type", "Authorization"],
        "supports_credentials": False
    }
})

@app.after_request
def after_request(response):
    response.headers.add('Access-Control-Allow-Origin', '*')
    response.headers.add('Access-Control-Allow-Headers', 'Content-Type,Authorization')
    response.headers.add('Access-Control-Allow-Methods', 'GET,POST,OPTIONS')
    return response

@app.route("/api/health", methods=["GET"])
def health_check():
    return jsonify({"status": "ok", "message": "Mathex API is running"}), 200

@app.route("/api/solve", methods=["POST", "OPTIONS"])
def solve():
    if request.method == "OPTIONS":
        return jsonify({"status": "ok"}), 200
        
    try:
        data = request.get_json()
        question = data.get("question", "")
        
        if not question:
            return jsonify({"error": "No question provided"}), 400
    
        result = answer(question)
        
        return jsonify({"answer": result}), 200
    
    except Exception as e:
        traceback.print_exc()
        return jsonify({"error": str(e)}), 500
    
@app.route("/api/quiz", methods=["POST", "OPTIONS"])
def quiz_api():
    if request.method == "OPTIONS":
        return jsonify({"status": "ok"}), 200
        
    try:
        data = request.get_json()
        description = data.get("description", "")
        grade_level = data.get("grade_level", "")
        
        if not description or not grade_level:
            return jsonify({"error": "Description and grade level are required"}), 400
          
        result = makequiz(f"Generate a quiz for grade {grade_level} on the topic: {description}")
        
        return jsonify({"quiz": result}), 200
    
    except Exception as e:
        traceback.print_exc()
        return jsonify({"error": str(e)}), 500    
    

@app.route("/api/quotes", methods=["GET", "OPTIONS"])
def quotes_api():
    if request.method == "OPTIONS":
        return jsonify({"status": "ok"}), 200
        
    try:
        quote_data = get_quote()
        return jsonify(quote_data), 200
    except Exception as e:
        traceback.print_exc()
        return jsonify({"error": str(e)}), 500
    

@app.route("/api/formula", methods=["POST", "OPTIONS"])
def formula_api():
    if request.method == "OPTIONS":
        return jsonify({"status": "ok"}), 200
        
    try:
        data = request.get_json()
        query = data.get("formula", "")
        grade = data.get("grade_level")

        if not query:
            return jsonify({"error": "No formula query provided"}), 400
        formula_result = get_4mula(query, grade)
      
        return jsonify({
            "formula": formula_result,
            "grade_level": grade
        }), 200
    
    except Exception as e:
        traceback.print_exc()
        return jsonify({"error": str(e)}), 500    

@app.route("/api/barchart", methods=["POST", "OPTIONS"])
def barchart_api():
    if request.method == "OPTIONS":
        return jsonify({"status": "ok"}), 200
        
    try:
        data = request.get_json()
        labels = data.get("labels", [])
        values = data.get("values", [])
        xlabel = data.get("xlabel", "Categories")
        ylabel = data.get("ylabel", "Values")
        title = data.get("title", "Bar Chart")
        color = data.get("color", "#B52605")
        
        if not labels or not values:
            return jsonify({"error": "Labels and values are required"}), 400
        
        if len(labels) != len(values):
            return jsonify({"error": "Labels and values must have the same length"}), 400
        
        img_base64 = generate_bar_chart(labels, values, xlabel, ylabel, title, color)
        
        return jsonify({
            "image": f"data:image/png;base64,{img_base64}",
            "success": True
        }), 200
    
    except Exception as e:
        traceback.print_exc()
        return jsonify({"error": str(e)}), 500

@app.route("/api/piechart", methods=["POST", "OPTIONS"])
def piechart_api():
    if request.method == "OPTIONS":
        return jsonify({"status": "ok"}), 200
        
    try:
        data = request.get_json()
        labels = data.get("labels", [])
        values = data.get("values", [])
        title = data.get("title", "Pie Chart")
        
        if not labels or not values:
            return jsonify({"error": "Labels and values are required"}), 400
        
        if len(labels) != len(values):
            return jsonify({"error": "Labels and values must have the same length"}), 400
        
        img_base64 = generate_pie_chart(labels, values, title)
        
        return jsonify({
            "image": f"data:image/png;base64,{img_base64}",
            "success": True
        }), 200
    
    except Exception as e:
        traceback.print_exc()
        return jsonify({"error": str(e)}), 500

@app.errorhandler(404)
def page_not_found(e):
    return jsonify({"error": "Endpoint not found"}), 404


application = app


if __name__ == "__main__":
    port = int(os.environ.get('PORT', 8000))
    app.run(debug=False, host="0.0.0.0", port=port)




