import sys
import pandas as pd
import numpy as np
from sklearn.ensemble import RandomForestClassifier

data = pd.DataFrame({
    'previous_renewals': [5, 2, 8, 1, 4, 7],
    'lease_duration': [12, 6, 24, 3, 9, 18],
    'renewed': [1, 0, 1, 0, 0, 1]  
})

X = data[['previous_renewals', 'lease_duration']]
y = data['renewed']

model = RandomForestClassifier(n_estimators=10, random_state=42)
model.fit(X, y)

previous_renewals = int(sys.argv[1])
lease_duration = int(sys.argv[2])


prediction = model.predict([[previous_renewals, lease_duration]])

print("High chance of renewal" if prediction[0] == 1 else "Low chance of renewal")
