# OrBIai

A simple chat application powered by LLaMA 2 via Ollama.

## Project Structure

```
orbiai/
├── backend/         # FastAPI backend with LLaMA 2 via Ollama
│   ├── app/
│   │   ├── api/     # Routes
│   │   ├── models/  # Data models
│   │   ├── services/# LLM and logic
│   │   └── main.py
│   └── requirements.txt
│
├── frontend/        # React + Tailwind + Vite
│   ├── src/
│   ├── index.html
│   └── vite.config.js
│
├── .env             # Environment variables
└── README.md
```

## Prerequisites

- Python 3.8+ for the backend
- Node.js 16+ for the frontend
- [Ollama](https://ollama.ai/) installed and running with LLaMA 2 model pulled

## Installation

### 1. Clone the repository

```bash
git clone https://github.com/yourusername/orbiai.git
cd orbiai
```

### 2. Set up the backend

```bash
cd backend
pip install -r requirements.txt
```

### 3. Set up the frontend

```bash
cd frontend
npm install
```

### 4. Pull LLaMA 2 in Ollama (if not already done)

```bash
ollama pull llama2
```

## Running the Application

### 1. Start the backend

```bash
cd backend
uvicorn app.main:app --reload
```

### 2. Start the frontend

```bash
cd frontend
npm run dev
```

### 3. Access the application

Open your browser and navigate to:
```
http://localhost:5173
```

## Environment Variables

You can customize the behavior by editing the `.env` file:

- `OLLAMA_API_URL`: URL of the Ollama API (default: http://localhost:11434/api/chat)
- `LLAMA_MODEL`: Name of the model to use (default: llama2)
- `VITE_BACKEND_URL`: URL of the backend API (default: http://localhost:8000)

## License

MIT 
