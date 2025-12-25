# Mathex - Modern Math Tools

AI-powered mathematics platform built to help students with math homework, practice, and learning. Features step-by-step problem solving, quiz generation, formula search, and data visualization tools.

![Mathex Banner](https://img.shields.io/badge/Built%20with-AI-blue) ![Python](https://img.shields.io/badge/Python-3.8%2B-green) ![Flask](https://img.shields.io/badge/Flask-3.0-orange) ![License](https://img.shields.io/badge/License-MIT-yellow)

## ✨ Features

### 🧮 Core AI-Powered Tools
- **Math Solver** - Get step-by-step solutions to algebra, calculus, geometry, and more
- **Quiz Generator** - Create customized practice quizzes for any grade level (1-12)
- **Formula Library** - Instant search for mathematical formulas with LaTeX formatting

### 📊 Additional Tools
- **Bar Chart Generator** - Create customizable bar charts from your data
- **Pie Chart Generator** - Visualize proportions with pie charts
- **Distance Converter** - Convert between meters, kilometers, miles, feet, and more

### 🎨 Modern Interface
- Light/Dark theme toggle with localStorage persistence
- Responsive mobile-first design
- Single Page Application (SPA) with hash-based routing
- Clean, modern UI with smooth animations

## 🚀 Project Structure

```
Mathex/
├── Backend/              # 🐍 Flask REST API
│   ├── main.py          # Flask app with API routes
│   ├── engine.py        # Math problem solver (Gemini AI)
│   ├── qngen.py         # Quiz generator (Gemini AI)
│   ├── formula.py       # Formula search (Gemini AI)
│   ├── bar_chart.py     # Bar chart generator (Matplotlib)
│   ├── pie_chart.py     # Pie chart generator (Matplotlib)
│   ├── quotes.py        # Math quotes fetcher
│   ├── quotes.json      # Quote database
│   └── .env             # Environment variables (GEMINI_API_KEY)
│
├── public/              # 🌐 Static Frontend (HTML/CSS/JS)
│   ├── index.html       # Main SPA page
│   ├── 404.html         # Error page
│   ├── vercel.json      # Vercel deployment config
│   ├── css/             # 9 CSS files (root, home, solver, etc.)
│   ├── js/              # 8 JS files + config
│   └── assets/          # Favicon and images
│
├── requirements.txt     # Python dependencies
├── .gitignore          # Git ignore rules
└── README.md           # This file
```

## 📦 Installation & Setup

### Prerequisites
- Python 3.8 or higher
- Google Gemini API key ([Get one here](https://makersuite.google.com/app/apikey))
- Git

### Local Development

1. **Clone the repository**
   ```bash
   git clone https://github.com/prasoonkandel/Mathex.git
   cd Mathex
   ```

2. **Install Python dependencies**
   ```bash
   pip install -r requirements.txt
   ```

3. **Set up environment variables**
   ```bash
   cd Backend
   echo "GEMINI_API_KEY=your_api_key_here" > .env
   ```

4. **Run the backend server**
   ```bash
   python main.py
   ```
   Backend will run at http://localhost:5000

5. **Serve the frontend** (in a new terminal)
   ```bash
   cd public
   python -m http.server 8000
   ```
   Frontend will run at http://localhost:8000

6. **Open your browser**
   Navigate to http://localhost:8000

## 🔌 API Endpoints

All endpoints return JSON responses.

### `POST /api/solve`
Solve math problems with step-by-step explanations.
```json
Request:  { "question": "Solve x² + 5x + 6 = 0" }
Response: { "answer": "Step-by-step solution..." }
```

### `POST /api/quiz`
Generate custom quizzes.
```json
Request:  { "grade_level": "9", "description": "Linear equations" }
Response: { "quiz": { "questions": [...] } }
```

### `GET /api/quotes`
Get random mathematical quotes.
```json
Response: { "quote": "...", "author": "..." }
```

### `POST /api/formula`
Search for mathematical formulas.
```json
Request:  { "formula": "quadratic formula", "grade_level": "Grade 9" }
Response: { "formula": "LaTeX formatted formula...", "grade_level": "Grade 9" }
```

### `POST /api/barchart`
Generate bar charts (returns base64 PNG).
```json
Request:  { "labels": ["A","B"], "values": [10,20], "title": "Chart" }
Response: { "image": "data:image/png;base64,...", "success": true }
```

### `POST /api/piechart`
Generate pie charts (returns base64 PNG).
```json
Request:  { "labels": ["Food","Rent"], "values": [300,500], "title": "Budget" }
Response: { "image": "data:image/png;base64,...", "success": true }
```

## 🚢 Deployment

### Backend (Render / PythonAnywhere / Railway)

**Deploy to Render:**
1. Push `Backend` folder to GitHub
2. Create new Web Service on [Render](https://render.com)
3. Set Build Command: `pip install -r ../requirements.txt`
4. Set Start Command: `cd Backend && python main.py`
5. Add environment variable: `GEMINI_API_KEY`

### Frontend (Vercel / Netlify)

**Deploy to Vercel:**
1. Update API URL in `public/js/config.js`:
   ```javascript
   const API_BASE_URL = 'https://your-backend-url.onrender.com';
   ```
2. Deploy `public` folder:
   ```bash
   cd public
   vercel --prod
   ```

**Or use Vercel Dashboard:**
- Import your repository
- Set Root Directory: `public`
- Deploy!

## 🛠️ Tech Stack

### Backend
- **Flask 3.0** - Python web framework
- **Google Gemini AI** - AI-powered math solving, quiz generation, formula search
- **Matplotlib** - Chart generation
- **Flask-CORS** - Cross-origin resource sharing

### Frontend
- **HTML5** - Semantic markup
- **CSS3** - Custom properties, flexbox, grid, animations
- **Vanilla JavaScript** - No frameworks, pure ES6+
- **MathJax** - LaTeX mathematical notation rendering
- **SPA Architecture** - Hash-based routing for seamless navigation

## 📝 Environment Variables

Create `Backend/.env`:
```env
GEMINI_API_KEY=your_google_gemini_api_key_here
PORT=5000
FLASK_ENV=production
```

## 🤝 Contributing

Contributions are welcome! Here's how:

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Make your changes
4. Commit: `git commit -m 'Add some feature'`
5. Push: `git push origin feature-name`
6. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Developer

**Prasoon Kandel**
- 🌐 Website: [prasoonkandel.me](https://prasoonkandel.me)
- 💻 GitHub: [@prasoonkandel](https://github.com/prasoonkandel)
- 🐦 Twitter: [@prasoonkandel](https://twitter.com/prasoonkandel)
- 📷 Instagram: [@prasoonkandel](https://instagram.com/prasoonkandel)
- 📧 Email: prasoonkandel1029@gmail.com

*High School Programmer & Tech Enthusiast from Butwal, Nepal*

## 🙏 Acknowledgments

- Google Gemini for powerful AI capabilities
- Flask community for excellent documentation
- MathJax for beautiful LaTeX rendering
- All contributors and users of Mathex

## 📸 Screenshots

*(Add screenshots of your app here)*

## 🔮 Future Plans

- [ ] Mobile app (React Native)
- [ ] Graphing calculator
- [ ] Step-by-step equation solver
- [ ] Study session tracking
- [ ] User accounts and progress saving
- [ ] More visualization tools

---

**Built with ❤️ by a student, for students**

*Star ⭐ this repo if you find it helpful!*
