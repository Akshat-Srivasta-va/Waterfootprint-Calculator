import os
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.metrics import mean_squared_error
from sklearn.pipeline import Pipeline
from sklearn.compose import ColumnTransformer
from sklearn.preprocessing import OneHotEncoder, StandardScaler
from xgboost import XGBRegressor
import joblib

# --- CONFIG ---
CSV_PATH = os.path.join(os.path.dirname(__file__), "waterfootprint_dataset.csv")
MODEL_OUT = os.path.join(os.path.dirname(__file__), "model_pipeline.joblib")
RANDOM_SEED = 42
TEST_SIZE = 0.2

# mapping from CSV short names to the API feature names
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
    'waterFootprint': 'water_footprint'  # target
}

# --- LOAD DATA ---
df = pd.read_csv(CSV_PATH)

# rename columns to match API / training feature names
df = df.rename(columns=RENAME_MAP)

target = "water_footprint"
FEATURE_COLS = [c for c in df.columns if c != target]

X = df[FEATURE_COLS].copy()
y = df[target].copy()

# identify numeric and categorical
numeric_cols = X.select_dtypes(include=["number"]).columns.tolist()
# treat booleans and text as categorical
categorical_cols = [c for c in X.columns if c not in numeric_cols]

# convert boolean-like to string so OneHotEncoder treats consistently
for c in categorical_cols:
    X[c] = X[c].astype(str)

# pipeline
preprocessor = ColumnTransformer(
    transformers=[
        ("num", StandardScaler(), numeric_cols),
        ("cat", OneHotEncoder(handle_unknown="ignore", sparse_output=False), categorical_cols),
    ],
    remainder="drop",
)

pipeline = Pipeline([
    ("pre", preprocessor),
    ("xgb", XGBRegressor(objective="reg:squarederror", n_estimators=500, random_state=RANDOM_SEED, verbosity=0))
])

# --- TRAIN/VALID SPLIT ---
X_train, X_val, y_train, y_val = train_test_split(X, y, test_size=TEST_SIZE, random_state=RANDOM_SEED)

# train / eval
pipeline.fit(X_train, y_train)
preds = pipeline.predict(X_val)
mse = mean_squared_error(y_val, preds)
rmse = mse ** 0.5
print(f"Validation RMSE: {rmse:.4f}")

# --- EVALUATE & SAVE ---
# save pipeline
joblib.dump(pipeline, MODEL_OUT)
print(f"Pipeline saved to {MODEL_OUT}")