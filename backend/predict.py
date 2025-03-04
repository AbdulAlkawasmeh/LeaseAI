import pickle
import numpy as np
from flask import Flask, request, jsonify

app = Flask(__name__)

with open("lease_model.pkl", "rb") as f:
    model = pickle.load(f)

with open("scaler.pkl", "rb") as f:
    scaler = pickle.load(f)

@app.route("/predict", methods=["POST"])
def predict():
    try:
        data = request.json
        previous_renewals = data.get("previous_renewals")
        lease_duration = data.get("lease_duration")

        if previous_renewals is None or lease_duration is None:
            return jsonify({"error": "Missing input values"}), 400

        renewal_rate = previous_renewals / lease_duration

        input_data = np.array([[previous_renewals, lease_duration, renewal_rate]])
        input_data_scaled = scaler.transform(input_data)

        prediction = model.predict(input_data_scaled)[0]
        probability = model.predict_proba(input_data_scaled)[0][1]

        print(f"🔍 DEBUG: Previous Renewals={previous_renewals}, Lease Duration={lease_duration}, AI Prediction={prediction}, Probability={probability}")

        if previous_renewals >= 3:
            prediction_text = "Likely to Renew"
            probability = max(probability, 0.95) 
        else:
            prediction_text = "Likely to Renew" if prediction == 1 else "Unlikely to Renew"

        return jsonify({
            "prediction": prediction_text,
            "probability": round(probability, 2)
        })

    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    app.run(port=5000, debug=True)
