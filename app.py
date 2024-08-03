from flask import Flask, request, jsonify
import joblib
import pandas as pd

app = Flask(__name__)

@app.route('/predict', methods=['POST'])
def predict():
    data = request.json
    new_data = pd.DataFrame(data)
    model = joblib.load('models/aviator_predictor_model.pkl')
    scaler = joblib.load('models/scaler.pkl')
    le = joblib.load('models/label_encoder.pkl')
    new_data_scaled = scaler.transform(new_data)
    prediction = model.predict(new_data_scaled)
    result = le.inverse_transform(prediction)
    return jsonify({'prediction': result[0]})

if __name__ == "__main__":
    app.run(host='0.0.0.0', port=5000)
