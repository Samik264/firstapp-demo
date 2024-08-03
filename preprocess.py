import pandas as pd
import numpy as np

def preprocess_data():
    # Load the scraped data
    data = pd.read_csv('data/aviator_game_data.csv')

    # Clean the data
    data.dropna(inplace=True)

    # Convert timestamp to datetime
    data['timestamp'] = pd.to_datetime(data['timestamp'])

    # Extract time-based features
    data['hour'] = data['timestamp'].dt.hour
    data['day_of_week'] = data['timestamp'].dt.dayofweek
    data['day_of_month'] = data['timestamp'].dt.day
    data['month'] = data['timestamp'].dt.month
    data['is_weekend'] = data['day_of_week'].apply(lambda x: 1 if x >= 5 else 0)

    # Create rolling statistics features
    data['result_encoded'] = pd.factorize(data['result'])[0]
    data['rolling_mean'] = data['result_encoded'].rolling(window=5).mean()
    data['rolling_std'] = data['result_encoded'].rolling(window=5).std()
    data['rolling_max'] = data['result_encoded'].rolling(window=5).max()
    data['rolling_min'] = data['result_encoded'].rolling(window=5).min()

    # Create lag features
    data['prev_result_1'] = data['result_encoded'].shift(1)
    data['prev_result_2'] = data['result_encoded'].shift(2)
    data['prev_result_3'] = data['result_encoded'].shift(3)

    # Drop rows with NaN values created by rolling and shifting
    data.dropna(inplace=True)

    # Prepare the feature matrix X and target variable y
    features = ['hour', 'day_of_week', 'day_of_month', 'month', 'is_weekend', 
                'rolling_mean', 'rolling_std', 'rolling_max', 'rolling_min', 
                'prev_result_1', 'prev_result_2', 'prev_result_3']
    X = data[features]
    y = data['result_encoded']

    # Save processed data
    X.to_csv('data/X.csv', index=False)
    y.to_csv('data/y.csv', index=False)

if __name__ == "__main__":
    preprocess_data()
