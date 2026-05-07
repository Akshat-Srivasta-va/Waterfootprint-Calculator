# 💧 Water Footprint Calculator

> A full-stack web application that uses **Machine Learning (XGBoost)** to predict a household's daily water footprint and provide personalized water-saving recommendations.

[![Live Demo](https://img.shields.io/badge/Live%20Demo-Vercel-black?style=for-the-badge&logo=vercel)](https://waterfootprint-calculator-psi.vercel.app)
[![Backend](https://img.shields.io/badge/Backend-FastAPI-009688?style=for-the-badge&logo=fastapi)](https://fastapi.tiangolo.com/)
[![Frontend](https://img.shields.io/badge/Frontend-React%20%2B%20Vite-61DAFB?style=for-the-badge&logo=react)](https://vitejs.dev/)
[![ML Model](https://img.shields.io/badge/Model-XGBoost-EF4444?style=for-the-badge)](https://xgboost.readthedocs.io/)
[![Database](https://img.shields.io/badge/Database-MongoDB-47A248?style=for-the-badge&logo=mongodb)](https://www.mongodb.com/)

---

## 📌 Table of Contents

- [Overview](#-overview)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [How It Works](#-how-it-works)
- [Getting Started](#-getting-started)
- [API Endpoints](#-api-endpoints)
- [Dataset & Model](#-dataset--model)
- [Screenshots](#-screenshots)
- [Limitations](#-limitations)
- [License](#-license)

---

## 🌊 Overview

The **Water Footprint Calculator** is a research-backed web application designed to raise awareness about household water consumption. Users fill out a detailed questionnaire about their daily water habits, and the system uses a trained **XGBoost regression model** to estimate their total daily water footprint in litres.

The app also provides:
- **Category-wise recommendations** based on above-average usage
- **Personalized tips** based on the user's own historical calculation trends
- **User authentication** with history tracking

This project was developed as part of an IEEE research paper on household water usage analysis.

---

## ✨ Features

| Feature | Description |
|---|---|
| 🤖 **ML-Powered Prediction** | XGBoost model trained on a 17MB real-world household dataset |
| 📋 **20-Parameter Calculator** | Captures faucet, shower, toilet, garden, clothes, vehicle, and RO usage |
| 💡 **Smart Recommendations** | Category-wise tips when usage exceeds average benchmarks |
| 📈 **Personalized Insights** | Historical trend analysis across multiple submissions |
| 🔐 **User Authentication** | Register/Login with JWT-based auth and bcrypt password hashing |
| 🕘 **Calculation History** | Stores last 20 calculations per user in MongoDB |
| 📰 **News & Articles** | Curated water conservation news section |
| 💰 **Donate Page** | Razorpay payment integration for donations |
| 📱 **Responsive UI** | Mobile-friendly React frontend |

---

## 🛠 Tech Stack

### Backend
- **FastAPI** — High-performance Python REST API
- **XGBoost** — Gradient boosted regression model for prediction
- **Scikit-learn** — Preprocessing pipeline (OneHotEncoder + StandardScaler)
- **MongoDB (PyMongo)** — User and history data storage
- **JWT (python-jose)** — Token-based authentication
- **Bcrypt / Passlib** — Secure password hashing
- **Joblib** — Model serialization
- **Uvicorn** — ASGI server

### Frontend
- **React 18** — Component-based UI
- **Vite** — Fast dev server and bundler
- **React Router** — Client-side navigation
- **Axios / Fetch** — API communication

### Deployment
- **Vercel** — Frontend hosting
- **MongoDB Atlas** — Cloud database

---

## 📁 Project Structure

```
waterfootprint/
├── backend/
│   ├── main.py                        # FastAPI app — all routes and logic
│   ├── train_model.py                 # XGBoost model training script
│   ├── model_pipeline.joblib          # Serialized trained model pipeline
│   ├── waterfootprint_xgboost_model.json  # XGBoost model JSON export
│   ├── waterfootprint_dataset.csv     # Training dataset (~17MB)
│   ├── database.py                    # MongoDB connection setup
│   ├── auth.py                        # JWT & password hashing utilities
│   ├── razorpay.js                    # Razorpay donation integration
│   ├── vercel.json                    # Vercel deployment config
│   ├── requirements.txt               # Python dependencies
│   └── .env                           # Environment variables (not committed)
│
├── frontend/
│   ├── src/
│   │   ├── pages/
│   │   │   ├── Home.jsx               # Landing page
│   │   │   ├── Form.jsx               # Main calculator form (20 inputs)
│   │   │   ├── Waterfootprint.jsx     # Results & recommendations page
│   │   │   ├── Dashboard.jsx          # User history & personalized tips
│   │   │   ├── Login.jsx              # Login page
│   │   │   ├── Register.jsx           # Registration page
│   │   │   ├── About.jsx              # About the project
│   │   │   ├── Contact.jsx            # Contact form
│   │   │   ├── NewsAndArticles.jsx    # Water conservation news
│   │   │   ├── WaterSavingTips.jsx    # General saving tips
│   │   │   └── Donate.jsx             # Razorpay donation page
│   │   ├── components/
│   │   │   └── Navbar.jsx             # Navigation bar
│   │   ├── context/                   # React context (auth state)
│   │   ├── config/                    # API config
│   │   └── App.jsx                    # Root component & routing
│   ├── index.html
│   ├── vite.config.js
│   └── package.json
│
├── model.py                           # Standalone model evaluation script
└── README.md
```

---

## ⚙️ How It Works

```
User fills form (20 parameters)
         ↓
React frontend sends POST /predict to FastAPI
         ↓
Backend maps inputs → Pandas DataFrame
         ↓
Scikit-learn Pipeline:
  ├── StandardScaler (numeric features)
  └── OneHotEncoder (categorical features)
         ↓
XGBoost Regressor → Predicted water footprint (litres/day)
         ↓
Rule-based engine generates category-wise recommendations
         ↓
If logged in → Result saved to MongoDB history
         ↓
Response returned to frontend with prediction + tips
```

### Personalized Recommendations
When a logged-in user has **2+ calculations** saved:
- The system compares the **latest submission** against the **average of all previous submissions**
- Fields where current usage is **>10% above the personal average** are flagged
- Top 4 highest-deviation habits are returned with targeted tips

---

## 🚀 Getting Started

### Prerequisites
- Python 3.9+
- Node.js 18+
- MongoDB Atlas account (or local MongoDB)

### 1. Clone the Repository
```bash
git clone https://github.com/Akshat-Srivasta-va/Waterfootprint-Calculator.git
cd Waterfootprint-Calculator
```

### 2. Backend Setup
```bash
cd backend

# Create and activate virtual environment
python -m venv venv
venv\Scripts\activate        # Windows
# source venv/bin/activate   # macOS/Linux

# Install dependencies
pip install -r requirements.txt

# Create .env file
```

Create a `backend/.env` file:
```env
MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/waterfootprint
SECRET_KEY=your_jwt_secret_key
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=10080
```

```bash
# Run the backend
uvicorn main:app --reload --port 8000
```

### 3. Frontend Setup
```bash
cd frontend
npm install
npm run dev
```

Frontend will be available at `http://localhost:5173`  
Backend API will be available at `http://localhost:8000`

### 4. (Optional) Retrain the Model
```bash
cd backend
python train_model.py
```
This will retrain the XGBoost model on the dataset and save a new `model_pipeline.joblib`.

---

## 📡 API Endpoints

| Method | Endpoint | Auth Required | Description |
|---|---|---|---|
| `GET` | `/` | No | Health check |
| `POST` | `/register` | No | Register a new user |
| `POST` | `/login` | No | Login and get JWT token |
| `POST` | `/predict` | Optional | Predict water footprint |
| `GET` | `/history` | Yes | Get last 20 calculations |
| `GET` | `/personalized-recommendations` | Yes | Get personalized tips |
| `GET` | `/_debug_train_eval` | No | Debug: evaluate model on training data |

### Example Request — `/predict`
```json
POST /predict
{
  "faucetDuration": 3,
  "faucetPressure": "high",
  "dishwasher": true,
  "dishwasherTimes": 2,
  "toiletFlushes": 5,
  "toiletType": "dual flush",
  "showerTimes": 1,
  "showerDuration": 8,
  "hasGarden": false,
  "gardenType": "none",
  "gardenWaterTimes": 0,
  "clothesWashTimes": 3,
  "washingMachineType": "front-load",
  "moppingTimes": 2,
  "moppingMethod": "bucket",
  "vehicleType": "car",
  "vehicleWashTimes": 1,
  "hasRO": true,
  "houseSize": 1200,
  "householdMembers": 4
}
```

### Example Response
```json
{
  "prediction": 342.76,
  "recommendations": {
    "shower": ["Reduce shower time and install a low-flow showerhead."],
    "ro": ["Collect RO waste in a bucket or use it for gardening."],
    ...
  }
}
```

---

## 📊 Dataset & Model

| Property | Details |
|---|---|
| **Dataset Size** | ~17 MB, thousands of household records |
| **Features** | 20 household water usage parameters |
| **Target Variable** | Daily water footprint (litres) |
| **Algorithm** | XGBoost Regressor (`n_estimators=500`) |
| **Preprocessing** | StandardScaler + OneHotEncoder via Scikit-learn Pipeline |
| **Train/Val Split** | 80% training / 20% validation |
| **Evaluation Metric** | RMSE (Root Mean Squared Error) |

The model pipeline is serialized using `joblib` and loaded at server startup for fast inference.

---

## ⚠️ Limitations

- Predictions are based on **simulated/generated dataset** patterns and are indicative, not clinically precise
- The model does not account for **regional water tariff differences** or seasonal variations
- **Razorpay donations** are in test mode — no real transactions are processed
- Personalized recommendations require **at least 2 prior calculations**

---

## 📄 License

This project is developed for **academic and research purposes** as part of an IEEE paper submission.

---

> 🌱 *"Every drop counts. Know your footprint, reduce your impact."*
