# Aviator Predictor

This project predicts the outcome of Aviator games on Betika using machine learning models. It includes automated data collection, data preprocessing, model training, and real-time predictions through a Flask web application.

## Project Structure

aviator_predictor/
│
├── data/
│   ├── aviator_game_data.csv  # The file where scraped data is saved
│
├── scripts/
│   ├── data_collection.py     # Script for scraping and saving data
│   ├── preprocess.py          # Script for data preprocessing and feature engineering
│   ├── train_model.py         # Script for model training and hyperparameter tuning
│   ├── scheduled_retraining.py# Script for periodic model retraining
│
├── app/
│   ├── app.py                 # Flask app for serving predictions
│
├── models/
│   ├── aviator_predictor_model.pkl  # Trained model
│   ├── scaler.pkl             # Scaler for preprocessing
│   ├── label_encoder.pkl      # Label encoder for target variable
│
├── requirements.txt           # Required Python packages
├── README.md                  # Project documentation


 # Project documentation


## Setup

1. Clone the repository and navigate to the project directory.

2. Install the required packages:
    ```bash
    pip install -r requirements.txt
    ```

3. Run the data collection script to start scraping data:
    ```bash
    python scripts/data_collection.py
    ```

4. Preprocess the data:
    ```bash
    python scripts/preprocess.py
    ```

5. Train the model:
    ```bash
    python scripts/train_model.py
    ```

6. Start the Flask app for predictions:
    ```bash
    python app/app.py
    ```

7. (Optional) Start the scheduled retraining script:
    ```bash
    python scripts/scheduled_retraining.py
    ```

## Usage

Send a POST request to the `/predict` endpoint with the necessary data to get a prediction.

Example:
```bash
curl -X POST -H "Content-Type: application/json" -d '{"hour": [12], "day_of_week": [3], "day_of_month": [15], "month": [7], "is_weekend": [0], "rolling_mean": [0.5], "rolling_std": [0.1], "rolling_max": [1], "rolling_min": [0], "prev_result_1": [1], "prev_result_2": [0], "prev_result_3": [1]}' http://localhost:5000/predict



This setup should provide a clear, organized structure for the project and enable you to easily manage the different components involved.


### Summary

1. **Run the data collection script** to gather and save game data.
2. **Preprocess the data** to prepare it for model training.
3. **Train the model** to generate the `.pkl` files needed for predictions.
4. **Run the Flask app** to serve real-time predictions.
5. **Optionally, start the scheduled retraining script** to keep the model updated.

Follow these steps to set up and run the project. If you have any further questions or need additional assistance, let me know!
