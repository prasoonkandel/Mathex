from flask import Flask, request, jsonify, render_template
from Backend.engine import answer
from Backend.qngen import makequiz
from quotes import quotes as get_quote
from Backend.formula import get_4mula
from Backend.bar_chart import generate_chart as generate_bar_chart
from Backend.pie_chart import generate_chart as generate_pie_chart

from flask_cors import CORS
import json

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
def formula_api():
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
        })
    
    except Exception as e:
        return jsonify({"error": str(e)}), 500    

@app.route("/api/barchart", methods=["POST"])
def barchart_api():
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
        })
    
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route("/api/piechart", methods=["POST"])
def piechart_api():
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
        })
    
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0", port=5000)




