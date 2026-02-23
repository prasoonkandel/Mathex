# Mathex

AI-powered mathematics platform for students.
<p>
  <a href="https://mathex.prasoonkandel.com" target="_blank">
<img src="https://img.shields.io/badge/Open Website-992600?style=for-the-badge&logo=vercel&logoColor=white" />
</p>

## Project Structure

```
Mathex/
├── Backend/
│   ├── main.py
│   ├── engine.py
│   ├── qngen.py
│   ├── formula.py
│   ├── bar_chart.py
│   ├── pie_chart.py
│   ├── quotes.py
│   ├── quotes.json
│   └── .env
│
├── public/
│   ├── index.html
│   ├── 404.html
│   ├── css/
│   ├── js/
│   ├── assets/
│   └── vercel.json
│
└── requirements.txt
```

## Setup

1. Clone the repository

```bash
git clone https://github.com/prasoonkandel/Mathex.git
cd Mathex
```

2. Install dependencies

```bash
pip install -r requirements.txt
```

3. Configure environment

```bash
cd Backend
echo "GEMINI_API_KEY=your_api_key_here" > .env
```

4. Run backend

```bash
python main.py
```

5. Run frontend (new terminal)

```bash
cd public
python -m http.server 3000
```

6. Open browser at http://localhost:3000



