import pandas as pd
import numpy as np
import pickle
from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler

data = {
    "previous_renewals": [1, 2, 0, 3, 1, 2, 4, 0, 3, 1, 5, 2, 4, 1, 0, 6, 3, 5],
    "lease_duration": [12, 24, 6, 36, 12, 24, 48, 6, 36, 12, 60, 18, 48, 12, 3, 72, 36, 60],
    "renewed": [1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1]  
}

df = pd.DataFrame(data)

df["renewal_rate"] = df["previous_renewals"] / df["lease_duration"]

X = df[["previous_renewals", "lease_duration", "renewal_rate"]]
y = df["renewed"]

X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)


scaler = StandardScaler()
X_train_scaled = scaler.fit_transform(X_train)
X_test_scaled = scaler.transform(X_test)

model = RandomForestClassifier(n_estimators=150, random_state=42)
model.fit(X_train_scaled, y_train)

with open("lease_model.pkl", "wb") as f:
    pickle.dump(model, f)

with open("scaler.pkl", "wb") as f:
    pickle.dump(scaler, f)

