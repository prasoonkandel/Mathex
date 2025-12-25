# Mathex - Modern Math Tools

AI-powered mathematics platform with tools for solving problems, generating quizzes, and searching formulas.

## 🚀 Project Structure

```
Mathex/
├── Backend/              # 🐍 Flask API (Deploy to Render/PythonAnywhere)
│   ├── main.py          # Main Flask application
│   ├── engine.py        # Math solver
│   ├── qngen.py         # Quiz generator
│   ├── formula.py       # Formula search
│   ├── bar_chart.py     # Bar chart generator
│   ├── pie_chart.py     # Pie chart generator
│   ├── quotes.py        # Quote fetcher
│   ├── quotes.json      # Quote database
│   ├── .env             # Environment variables
│   └── README.md        # Backend documentation
│
├── public/              # 🌐 Frontend (Deploy to Vercel)
│   ├── index.html       # Main HTML file
│   ├── 404.html         # Error page
│   ├── css/             # Stylesheets
│   ├── js/              # JavaScript files
│   ├── assets/          # Images, favicon
│   ├── vercel.json      # Vercel config
│   ├── README.md        # Frontend documentation
│   └── DEPLOYMENT.md    # Deployment guide
│
└── requirements.txt     # Python dependencies
```

## 📦 Quick Start

### Backend Setup

```bash
# Install dependencies
pip install -r requirements.txt

# Navigate to Backend folder
cd Backend

# Create .env file and add your API key
echo "GEMINI_API_KEY=your_api_key_here" > .env

# Run server
python main.py
```

Backend runs at: http://localhost:5000

### Frontend Setup

```bash
# Navigate to public folder
cd public

# Serve with Python
python -m http.server 8000
```

Frontend runs at: http://localhost:8000
