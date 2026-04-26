from fastapi import FastAPI, HTTPException, Header
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Optional
import os, joblib, pandas as pd, uvicorn
from datetime import datetime
from sklearn.metrics import mean_squared_error
from dotenv import load_dotenv

load_dotenv()

from database import users_collection, history_collection
from auth import hash_password, verify_password, create_access_token, decode_token

# --- Training CSV category mapping ---
TRAIN_CSV = os.path.join(os.path.dirname(__file__), "waterfootprint_dataset.csv")
RENAME_MAP = {
    'faucetDuration': 'Average faucet durations (minutes)',
    'faucetPressure': 'Faucet pressure (low/high)',
    'dishwasher': 'Uses dishwasher (yes/no)',
    'dishwasherTimes': 'Times dishwasher used daily',
    'toiletFlushes': 'Times toilet flushed daily',
    'toiletType': 'Toilet type (low flow/dual flush)',
    'showerTimes': 'Times showered daily',
    'showerDuration': 'Average shower duration (minutes)',
    'hasGarden': 'Has garden (yes/no)',
    'gardenType': 'Garden type',
    'gardenWaterTimes': 'Times garden watered weekly',
    'clothesWashTimes': 'Times clothes washed weekly',
    'washingMachineType': 'Washing machine type',
    'moppingTimes': 'Times mopped weekly',
    'moppingMethod': 'Mopping method',
    'vehicleType': 'Vehicle type',
    'vehicleWashTimes': 'Times vehicle washed weekly',
    'hasRO': 'Has RO (yes/no)',
    'houseSize': 'House size (square feet)',
    'householdMembers': 'Household members',
    'waterFootprint': 'water_footprint'
}

_category_levels = {}
try:
    _train_df = pd.read_csv(TRAIN_CSV).rename(columns=RENAME_MAP)
    for col in [
        "Faucet pressure (low/high)", "Toilet type (low flow/dual flush)",
        "Garden type", "Washing machine type", "Mopping method",
        "Vehicle type", "Has RO (yes/no)", "Uses dishwasher (yes/no)", "Has garden (yes/no)"
    ]:
        if col in _train_df.columns:
            _category_levels[col] = _train_df[col].astype("category").cat.categories.tolist()
except Exception as e:
    print("Error reading training CSV:", e)

app = FastAPI()

ALLOWED_ORIGINS = [
    "http://localhost:3000", "http://127.0.0.1:3000",
    "http://localhost:5173", "http://127.0.0.1:5173",
    "https://waterfootprint-calculator-psi.vercel.app",
    "https://waterfootprint-calculator-ar888s4m2.vercel.app",
    "*"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=ALLOWED_ORIGINS,
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allow_headers=["*"],
    expose_headers=["*"],
    max_age=3600,
)

# Load model
try:
    PIPELINE_PATH = os.path.join(os.path.dirname(__file__), "model_pipeline.joblib")
    model_pipeline = joblib.load(PIPELINE_PATH)
except Exception as e:
    print("Error loading model pipeline:", e)
    raise

# ─────────────────────────────────────────
# Pydantic Models
# ─────────────────────────────────────────

class RegisterData(BaseModel):
    name: str
    email: str
    password: str

class LoginData(BaseModel):
    email: str
    password: str

class InputData(BaseModel):
    faucetDuration: int
    faucetPressure: str
    dishwasher: bool
    dishwasherTimes: int
    toiletFlushes: int
    toiletType: str
    showerTimes: float
    showerDuration: int
    hasGarden: bool
    gardenType: str
    gardenWaterTimes: int
    clothesWashTimes: int
    washingMachineType: str
    moppingTimes: float
    moppingMethod: str
    vehicleType: str
    vehicleWashTimes: int
    hasRO: bool
    houseSize: int
    householdMembers: int

# ─────────────────────────────────────────
# Helper: Get current user from token
# ─────────────────────────────────────────

def get_current_user(authorization: Optional[str] = None):
    if not authorization or not authorization.startswith("Bearer "):
        return None
    token = authorization.split(" ")[1]
    payload = decode_token(token)
    if not payload:
        return None
    return payload.get("sub")  # returns email

# ─────────────────────────────────────────
# Health Check
# ─────────────────────────────────────────

@app.get("/")
async def root():
    return {"message": "Water Footprint API is running"}

# ─────────────────────────────────────────
# Auth Endpoints
# ─────────────────────────────────────────

@app.post("/register")
def register(data: RegisterData):
    existing = users_collection.find_one({"email": data.email})
    if existing:
        raise HTTPException(status_code=400, detail="Email already registered")
    hashed = hash_password(data.password)
    users_collection.insert_one({
        "name": data.name,
        "email": data.email,
        "password": hashed,
        "created_at": datetime.utcnow()
    })
    token = create_access_token({"sub": data.email, "name": data.name})
    return {"token": token, "name": data.name, "email": data.email}

@app.post("/login")
def login(data: LoginData):
    user = users_collection.find_one({"email": data.email})
    if not user or not verify_password(data.password, user["password"]):
        raise HTTPException(status_code=401, detail="Invalid email or password")
    token = create_access_token({"sub": data.email, "name": user["name"]})
    return {"token": token, "name": user["name"], "email": data.email}

# ─────────────────────────────────────────
# Recommendations Helper
# ─────────────────────────────────────────

def calculate_recommendations(input_data):
    recommendations = {
        "faucet": [], "dishwasher": [], "toilet": [],
        "shower": [], "garden": [], "clothes_wash": [], "mopping": [], "ro": []
    }
    average_usage = {
        "faucetDuration": 2, "dishwasherTimes": 2, "toiletFlushes": 2,
        "showerTimes": 1, "showerDuration": 6, "gardenWaterTimes": 2,
        "clothesWashTimes": 2, "moppingTimes": 2, "vehicleWashTimes": 1, "houseSize": 1220
    }
    if input_data.faucetDuration > average_usage["faucetDuration"]:
        recommendations["faucet"].append("Turn off the tap while brushing teeth, shaving, or scrubbing hands. Impact: Saves up to 30L per person per day!")
        recommendations["faucet"].append("Install a low-flow faucet aerator. Impact: Reduces water flow without sacrificing pressure.")
    if input_data.dishwasherTimes > average_usage["dishwasherTimes"]:
        recommendations["dishwasher"].append("Use the eco-mode setting. Impact: Saves water and energy during the wash cycle.")
        recommendations["dishwasher"].append("Wash full loads only. Impact: Maximizes water efficiency.")
    if input_data.toiletFlushes > average_usage["toiletFlushes"]:
        recommendations["toilet"].append("Install a dual-flush toilet. Impact: Saves 30-50% water per flush.")
    if input_data.showerTimes > average_usage["showerTimes"] or input_data.showerDuration > average_usage["showerDuration"]:
        recommendations["shower"].append("Reduce shower time and install a low-flow showerhead. Impact: Saves water per shower.")
    if input_data.gardenWaterTimes > average_usage["gardenWaterTimes"]:
        recommendations["garden"].append("Water between 5-8 AM or after 6 PM and use drip irrigation. Impact: Saves water.")
    if input_data.clothesWashTimes > average_usage["clothesWashTimes"]:
        recommendations["clothes_wash"].append("Switch to front-load washing machine and wash full loads only. Impact: Saves water per load.")
    if input_data.moppingTimes > average_usage["moppingTimes"]:
        recommendations["mopping"].append("Use a microfiber mop or reuse mop water for outdoor cleaning. Impact: Saves water.")
    if input_data.houseSize > average_usage["houseSize"] or input_data.hasRO:
        recommendations["ro"].append("Collect RO waste in a bucket or use it for gardening. Impact: Saves tens of liters per day.")
        recommendations["ro"].append("Install a water-efficient RO system if replacing an old one.")
    return recommendations

# ─────────────────────────────────────────
# Predict Endpoint (saves to history if logged in)
# ─────────────────────────────────────────

@app.post("/predict")
def predict(input_data: InputData, authorization: Optional[str] = Header(None)):
    data_dict = {
        "Average faucet durations (minutes)": input_data.faucetDuration,
        "Faucet pressure (low/high)": input_data.faucetPressure,
        "Uses dishwasher (yes/no)": input_data.dishwasher,
        "Times dishwasher used daily": input_data.dishwasherTimes,
        "Times toilet flushed daily": input_data.toiletFlushes,
        "Toilet type (low flow/dual flush)": input_data.toiletType,
        "Times showered daily": input_data.showerTimes,
        "Average shower duration (minutes)": input_data.showerDuration,
        "Has garden (yes/no)": input_data.hasGarden,
        "Garden type": input_data.gardenType,
        "Times garden watered weekly": input_data.gardenWaterTimes,
        "Times clothes washed weekly": input_data.clothesWashTimes,
        "Washing machine type": input_data.washingMachineType,
        "Times mopped weekly": input_data.moppingTimes,
        "Mopping method": input_data.moppingMethod,
        "Vehicle type": input_data.vehicleType,
        "Times vehicle washed weekly": input_data.vehicleWashTimes,
        "Has RO (yes/no)": input_data.hasRO,
        "House size (square feet)": input_data.houseSize,
        "Household members": input_data.householdMembers,
    }
    df = pd.DataFrame([data_dict])
    for col in df.columns:
        if df[col].dtype == "bool":
            df[col] = df[col].astype(str)

    pred = model_pipeline.predict(df)
    pred_value = float(pred[0])

    recommendations = calculate_recommendations(input_data)

    # Save to history if user is logged in
    email = get_current_user(authorization)
    if email:
        history_collection.insert_one({
            "email": email,
            "timestamp": datetime.utcnow(),
            "prediction": pred_value,
            "inputs": input_data.dict()
        })

    return {"prediction": pred_value, "recommendations": recommendations}

# ─────────────────────────────────────────
# History Endpoint
# ─────────────────────────────────────────

@app.get("/history")
def get_history(authorization: Optional[str] = Header(None)):
    email = get_current_user(authorization)
    if not email:
        raise HTTPException(status_code=401, detail="Not authenticated")
    records = list(history_collection.find(
        {"email": email},
        {"_id": 0}
    ).sort("timestamp", -1).limit(20))
    for r in records:
        r["timestamp"] = r["timestamp"].isoformat()
    return {"history": records}

# ─────────────────────────────────────────
# Personalized Recommendations Endpoint
# ─────────────────────────────────────────

@app.get("/personalized-recommendations")
def personalized_recommendations(authorization: Optional[str] = Header(None)):
    email = get_current_user(authorization)
    if not email:
        raise HTTPException(status_code=401, detail="Not authenticated")

    records = list(history_collection.find({"email": email}, {"_id": 0}).sort("timestamp", -1).limit(10))
    if len(records) < 2:
        return {"tips": [], "message": "Submit the calculator at least 2 times to get personalized recommendations."}

    numeric_fields = [
        "faucetDuration", "showerDuration", "toiletFlushes",
        "dishwasherTimes", "gardenWaterTimes", "clothesWashTimes",
        "vehicleWashTimes", "moppingTimes", "showerTimes"
    ]

    field_labels = {
        "faucetDuration": "Faucet Duration",
        "showerDuration": "Shower Duration",
        "toiletFlushes": "Toilet Flushes",
        "dishwasherTimes": "Dishwasher Usage",
        "gardenWaterTimes": "Garden Watering",
        "clothesWashTimes": "Clothes Washing",
        "vehicleWashTimes": "Vehicle Washing",
        "moppingTimes": "Mopping Frequency",
        "showerTimes": "Shower Frequency"
    }

    field_tips = {
        "faucetDuration": "Try turning off the tap while brushing teeth or washing hands to reduce faucet time.",
        "showerDuration": "Reducing your shower by just 2 minutes can save up to 20 litres per shower.",
        "toiletFlushes": "Consider using a dual-flush toilet to save water on each flush.",
        "dishwasherTimes": "Run the dishwasher only when fully loaded and use eco mode.",
        "gardenWaterTimes": "Water your garden early morning or evening to reduce evaporation.",
        "clothesWashTimes": "Wash clothes only with full loads to maximise water efficiency.",
        "vehicleWashTimes": "Use a bucket instead of a hose when washing your vehicle.",
        "moppingTimes": "Use a microfiber mop which requires less water per session.",
        "showerTimes": "Bathing less frequently or switching to quick showers can significantly reduce usage."
    }

    # calculate personal averages from older records (exclude latest)
    older = records[1:]
    averages = {}
    for field in numeric_fields:
        vals = [r["inputs"].get(field, 0) for r in older if "inputs" in r]
        averages[field] = sum(vals) / len(vals) if vals else 0

    latest = records[0].get("inputs", {})
    tips = []

    for field in numeric_fields:
        avg = averages.get(field, 0)
        current = latest.get(field, 0)
        if avg > 0 and current > avg * 1.1:
            pct = round(((current - avg) / avg) * 100)
            tips.append({
                "field": field_labels.get(field, field),
                "current": round(current, 2),
                "your_average": round(avg, 2),
                "increase_pct": pct,
                "tip": field_tips.get(field, "Try to reduce usage in this area.")
            })

    tips = sorted(tips, key=lambda x: x["increase_pct"], reverse=True)[:4]
    return {"tips": tips, "message": "Based on your last {} calculations.".format(len(records))}

# ─────────────────────────────────────────
# Debug endpoint
# ─────────────────────────────────────────

@app.get("/_debug_train_eval")
def debug_train_eval():
    try:
        td = pd.read_csv(TRAIN_CSV).rename(columns=RENAME_MAP)
    except Exception as e:
        return {"error": f"can't read train CSV: {e}"}
    target = "water_footprint"
    if target not in td.columns:
        return {"error": f"target {target} not in training CSV"}
    X_td = td[[c for c in td.columns if c != target]].copy()
    for col in X_td.columns:
        if X_td[col].dtype == "bool":
            X_td[col] = X_td[col].astype(str)
    try:
        preds = model_pipeline.predict(X_td)
    except Exception as e:
        return {"error": f"pipeline predict failed: {e}"}
    mse = mean_squared_error(td[target], preds)
    rmse = mse ** 0.5
    sample = [{"true": float(td[target].iloc[i]), "pred": float(preds[i])} for i in range(min(5, len(preds)))]
    return {"train_rmse": rmse, "sample": sample}

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)