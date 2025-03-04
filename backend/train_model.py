import pandas as pd
import numpy as np
import pickle
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LogisticRegression
from sklearn.preprocessing import StandardScaler

data = {
    "previous_renewals": [1, 2, 0, 3, 1, 2, 4, 0, 3, 1],
    "lease_duration": [12, 24, 6, 36, 12, 24, 48, 6, 36, 12],
    "renewed": [1, 1, 0, 1, 1, 1, 1, 0, 1, 1]  
}

df = pd.DataFrame(data)

X = df[["previous_renewals", "lease_duration"]]
y = df["renewed"]

X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

scaler = StandardScaler()
X_train_scaled = scaler.fit_transform(X_train)
X_test_scaled = scaler.transform(X_test)

model = LogisticRegression()
model.fit(X_train_scaled, y_train)

with open("lease_model.pkl", "wb") as f:
    pickle.dump(model, f)

with open("scaler.pkl", "wb") as f:
    pickle.dump(scaler, f)

print("Model trained and saved successfully!")
